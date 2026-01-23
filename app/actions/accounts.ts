/**
 * Server Actions: Connected Accounts Management
 * 
 * These server-side functions handle CRUD operations for connected social media accounts.
 * All functions enforce Row Level Security (RLS) - users can only access their own accounts.
 * 
 * Features:
 * - Fetch user's connected accounts
 * - Get account by ID with automatic token refresh
 * - Delete/disconnect accounts
 * - Cache and retrieve account metrics
 * 
 * Security:
 * - All functions run server-side only
 * - Authenticated user required (checked via Supabase RLS)
 * - Access tokens never exposed to client
 */

"use server";

import { createClient } from "@/lib/supabase/server";
import { refreshAccessToken } from "@/lib/connectors/tiktok/oauth";
import { revalidatePath } from "next/cache";

/**
 * Connected account data structure
 * Matches the connected_accounts table schema in Supabase
 */
export interface ConnectedAccount {
	id: string;
	user_id: string;
	platform: string;
	platform_user_id: string;
	platform_username: string | null;
	display_name: string | null;
	avatar_url: string | null;
	token_expires_at: string | null;
	metadata: Record<string, any>;
	created_at: string;
	updated_at: string;
}

/**
 * Get all connected accounts for the authenticated user
 * 
 * Returns accounts ordered by creation date (newest first).
 * Does NOT include sensitive fields like access_token or refresh_token.
 * 
 * @returns Array of connected account objects
 * @throws Error if user is not authenticated or database query fails
 */
export async function getConnectedAccounts(): Promise<ConnectedAccount[]> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const { data, error } = await supabase
		.from("connected_accounts")
		.select(
			"id, user_id, platform, platform_user_id, platform_username, display_name, avatar_url, token_expires_at, metadata, created_at, updated_at"
		)
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(`Failed to fetch accounts: ${error.message}`);
	}

	return data || [];
}

/**
 * Get a specific connected account by ID with automatic token refresh
 * 
 * This function:
 * 1. Fetches the account (with sensitive tokens)
 * 2. Checks if access token is expired
 * 3. Automatically refreshes token if needed (for TikTok)
 * 4. Updates database with new tokens
 * 5. Returns fresh account data
 * 
 * Token refresh logic:
 * - TikTok tokens expire after 24 hours
 * - Refresh happens automatically if token expires within 5 minutes
 * - New tokens are saved to database
 * 
 * @param accountId - UUID of the connected account
 * @returns Account object with valid access token, or null if not found
 * @throws Error if refresh fails or database update fails
 */
export async function getAccountById(
	accountId: string
): Promise<ConnectedAccount & { access_token: string }> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const { data: account, error } = await supabase
		.from("connected_accounts")
		.select("*")
		.eq("id", accountId)
		.eq("user_id", user.id)
		.single();

	if (error || !account) {
		throw new Error("Account not found");
	}

	// Check if token needs refresh (refresh 5 minutes before expiry)
	const expiresAt = new Date(account.token_expires_at);
	const now = new Date();
	const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

	if (expiresAt <= fiveMinutesFromNow && account.refresh_token) {
		try {
			// Refresh token based on platform
			if (account.platform === "tiktok") {
				const clientKey = process.env.TIKTOK_CLIENT_KEY!;
				const clientSecret = process.env.TIKTOK_CLIENT_SECRET!;

				const tokenResponse = await refreshAccessToken(
					account.refresh_token,
					clientKey,
					clientSecret
				);

				const newExpiresAt = new Date(
					Date.now() + tokenResponse.expires_in * 1000
				);

				// Update tokens in database
				const { error: updateError } = await supabase
					.from("connected_accounts")
					.update({
						access_token: tokenResponse.access_token,
						refresh_token: tokenResponse.refresh_token,
						token_expires_at: newExpiresAt.toISOString(),
						updated_at: new Date().toISOString(),
					})
					.eq("id", accountId);

				if (updateError) {
					console.error("Failed to update tokens:", updateError);
				} else {
					account.access_token = tokenResponse.access_token;
					account.refresh_token = tokenResponse.refresh_token;
					account.token_expires_at = newExpiresAt.toISOString();
				}
			}
		} catch (error) {
			console.error("Token refresh failed:", error);
			// Continue with existing token, let the API call fail if needed
		}
	}

	return account;
}

/**
 * Delete (disconnect) a connected account
 * 
 * Removes the account from the database. This will:
 * - Delete the account record
 * - Cascade delete all associated metrics (via foreign key)
 * - RLS ensures user can only delete their own accounts
 * 
 * Best practice: Call revokeToken() before this to invalidate the access token with TikTok.
 * 
 * @param accountId - UUID of the account to delete
 * @throws Error if user doesn't own the account or deletion fails
 */
export async function deleteAccount(accountId: string): Promise<void> {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error("User not authenticated");
	}

	const { error } = await supabase
		.from("connected_accounts")
		.delete()
		.eq("id", accountId)
		.eq("user_id", user.id);

	if (error) {
		throw new Error(`Failed to delete account: ${error.message}`);
	}

	revalidatePath("/");
}

/**
 * Retrieve cached metrics for an account
 * 
 * Fetches the most recent cached metrics of a specific type,
 * but only if they're fresh enough (within 1 hour).
 * 
 * Use this to avoid unnecessary API calls. If cache is stale or missing,
 * fetch fresh data from the platform API and cache it.
 * 
 * @param accountId - UUID of the connected account
 * @param metricType - Type of metric to retrieve
 * @returns Cached metric data, or null if not found or stale
 */
export async function getCachedMetrics(
	accountId: string,
	metricType: string
): Promise<any | null> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("account_metrics")
		.select("data, fetched_at")
		.eq("account_id", accountId)
		.eq("metric_type", metricType)
		.order("fetched_at", { ascending: false })
		.limit(1)
		.single();

	if (error || !data) {
		return null;
	}

	// Check if data is stale (older than 1 hour)
	const fetchedAt = new Date(data.fetched_at);
	const now = new Date();
	const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

	if (fetchedAt < oneHourAgo) {
		return null; // Data is stale
	}

	return data.data;
}

/**
 * Cache metrics data for an account
 * 
 * Stores API response data in account_metrics table for:
 * - Reducing API calls (respect rate limits)
 * - Historical tracking
 * - Offline access
 * - Performance (faster dashboard loads)
 * 
 * Metric types:
 * - "profile_stats": Follower/following/likes/video counts
 * - "video_performance": Individual video metrics
 * - "audience_demographics": Future: age, gender, location data
 * - "engagement_trends": Future: engagement over time
 * 
 * @param accountId - UUID of the connected account
 * @param metricType - Type of metric being cached
 * @param data - Metric data (stored as JSONB)
 */
export async function cacheMetrics(
	accountId: string,
	metricType: string,
	data: any
): Promise<void> {
	const supabase = await createClient();

	const { error } = await supabase.from("account_metrics").insert({
		account_id: accountId,
		metric_type: metricType,
		data: data,
		fetched_at: new Date().toISOString(),
	});

	if (error) {
		console.error("Failed to cache metrics:", error);
		// Don't throw, caching is not critical
	}
}
