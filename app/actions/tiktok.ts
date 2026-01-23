/**
 * Server Actions: TikTok Data Fetching
 * 
 * These server-side functions fetch data from TikTok's API for connected accounts.
 * All functions include caching to minimize API calls and respect rate limits.
 * 
 * Features:
 * - Fetch profile stats (followers, likes, videos)
 * - List user videos with pagination
 * - Query specific videos by ID
 * - Force refresh data bypassing cache
 * - Automatic token refresh (handled by getAccountById)
 * 
 * Rate Limits:
 * - TikTok allows 600 requests per minute per access token
 * - Client enforces rate limiting automatically
 * - Cache reduces API calls (1 hour default)
 */

"use server";

import { getAccountById, getCachedMetrics, cacheMetrics } from "./accounts";
import {
	getUserInfo,
	listVideos,
	queryVideos,
	getAccountStats,
} from "@/lib/connectors/tiktok/client";
import { TikTokUser, TikTokVideo } from "@/lib/connectors/tiktok/types";

/**
 * Fetch TikTok profile information and statistics
 * 
 * Retrieves comprehensive profile data including:
 * - User info (display name, username, avatar, bio, verification)
 * - Account stats (follower count, following count, total likes, video count)
 * 
 * Results are cached for 1 hour to minimize API calls.
 * 
 * @param accountId - UUID of the connected TikTok account
 * @returns Object with user profile and stats
 * @throws Error if account not found, not a TikTok account, or API fails
 */
export async function fetchTikTokProfile(accountId: string): Promise<{
	user: TikTokUser;
	stats: {
		followers: number;
		following: number;
		likes: number;
		videos: number;
	};
}> {
	// Check cache first
	const cached = await getCachedMetrics(accountId, "profile_stats");
	if (cached) {
		return cached;
	}

	// Fetch fresh data
	const account = await getAccountById(accountId);

	if (account.platform !== "tiktok") {
		throw new Error("Account is not a TikTok account");
	}

	const [user, stats] = await Promise.all([
		getUserInfo(account.access_token),
		getAccountStats(account.access_token),
	]);

	const result = { user, stats };

	// Cache the result
	await cacheMetrics(accountId, "profile_stats", result);

	return result;
}

/**
 * Fetch TikTok videos for an account with pagination
 * 
 * Retrieves a paginated list of user's videos with:
 * - Video metadata (title, description, duration, dimensions)
 * - Cover image URL and share URL
 * - Engagement metrics (views, likes, comments, shares)
 * - Creation timestamp
 * 
 * Pagination:
 * - Returns up to 20 videos per request (TikTok API limit)
 * - Use returned cursor for subsequent requests
 * - hasMore flag indicates if more videos are available
 * 
 * Note: Videos are NOT cached to ensure fresh engagement metrics.
 * 
 * @param accountId - UUID of the connected TikTok account
 * @param cursor - Pagination cursor from previous response (optional)
 * @returns Object with videos array, next cursor, and hasMore flag
 * @throws Error if account not found, not a TikTok account, or API fails
 */
export async function fetchTikTokVideos(
	accountId: string,
	cursor?: number
): Promise<{
	videos: TikTokVideo[];
	cursor: number;
	hasMore: boolean;
}> {
	const account = await getAccountById(accountId);

	if (account.platform !== "tiktok") {
		throw new Error("Account is not a TikTok account");
	}

	const result = await listVideos(account.access_token, cursor, 20);

	return result;
}

/**
 * Fetch specific TikTok videos by their IDs
 * 
 * Query detailed information for specific videos when you have their IDs.
 * Useful for:
 * - Refreshing stats for individual videos
 * - Deep-linking to video detail views
 * - Tracking performance of specific content
 * 
 * Limits:
 * - Max 20 video IDs per request (enforced by TikTok API)
 * - Only returns videos owned by the authenticated user
 * 
 * @param accountId - UUID of the connected TikTok account
 * @param videoIds - Array of TikTok video IDs to query (max 20)
 * @returns Array of video objects with full metadata and metrics
 * @throws Error if more than 20 IDs, account not found, or API fails
 */
export async function fetchTikTokVideoStats(
	accountId: string,
	videoIds: string[]
): Promise<TikTokVideo[]> {
	const account = await getAccountById(accountId);

	if (account.platform !== "tiktok") {
		throw new Error("Account is not a TikTok account");
	}

	return await queryVideos(account.access_token, videoIds);
}

/**
 * Force refresh all TikTok data for an account (bypass cache)
 * 
 * Fetches fresh data from TikTok and updates the cache.
 * Use this when user explicitly requests a data refresh.
 * 
 * Refreshes:
 * - Profile stats (followers, likes, video count)
 * - First page of videos (up to 20)
 * 
 * Note: This counts against your rate limit. Don't call this automatically
 * on every page load - only when user clicks a "refresh" button.
 * 
 * @param accountId - UUID of the connected TikTok account
 * @throws Error if account not found, not a TikTok account, or API fails
 */
export async function refreshTikTokData(accountId: string): Promise<void> {
	const account = await getAccountById(accountId);

	if (account.platform !== "tiktok") {
		throw new Error("Account is not a TikTok account");
	}

	// Fetch and cache profile stats
	const [user, stats] = await Promise.all([
		getUserInfo(account.access_token),
		getAccountStats(account.access_token),
	]);

	await cacheMetrics(accountId, "profile_stats", { user, stats });

	// Fetch and cache first page of videos
	const videos = await listVideos(account.access_token, undefined, 20);
	await cacheMetrics(accountId, "video_performance", videos);
}
