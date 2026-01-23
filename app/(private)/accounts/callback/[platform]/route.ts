/**
 * OAuth Callback Route Handler
 * 
 * Handles OAuth callbacks after users authorize Weaver to access their social media accounts.
 * 
 * Flow:
 * 1. User clicks "Connect Account" -> Redirected to platform (e.g., TikTok)
 * 2. User authorizes Weaver
 * 3. Platform redirects here with authorization code
 * 4. Exchange code for access/refresh tokens (PKCE verification)
 * 5. Fetch user profile info from platform
 * 6. Store or update account in Supabase
 * 7. Redirect to dashboard or send message to popup opener
 * 
 * Security:
 * - Validates OAuth state parameter (CSRF protection)
 * - Retrieves code_verifier from secure HTTP-only cookie
 * - Cleans up cookies after use
 * - All tokens stored server-side only
 * 
 * Supported platforms: tiktok (more platforms coming soon)
 */

import { createClient } from "@/lib/supabase/server";
import { exchangeCodeForToken } from "@/lib/connectors/tiktok/oauth";
import { getUserInfo } from "@/lib/connectors/tiktok/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handle OAuth callback GET request
 * 
 * Query parameters:
 * - code: Authorization code from OAuth provider
 * - state: CSRF protection token (must match cookie)
 * - error: Error message if authorization was denied
 * 
 * @param request - Next.js request object
 * @param params - Route parameters with platform name
 * @returns HTML with postMessage to close popup, or redirect to dashboard
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ platform: string }> }
) {
	const { platform } = await params;
	const searchParams = request.nextUrl.searchParams;
	const code = searchParams.get("code");
	const state = searchParams.get("state");
	const error = searchParams.get("error");

	// Remove trailing slash from base URL
	const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || request.url).replace(/\/$/, '');

	// Handle OAuth errors
	if (error) {
		const errorDescription = searchParams.get("error_description");
		console.error("OAuth error:", error, errorDescription);
		return NextResponse.redirect(
			new URL(
				`/?error=${encodeURIComponent(errorDescription || error)}`,
				baseUrl
			)
		);
	}

	// Validate required params
	if (!code || !state) {
		return NextResponse.redirect(
			new URL("/?error=Missing authorization code or state", baseUrl)
		);
	}

	// Only TikTok supported for now
	if (platform !== "tiktok") {
		return NextResponse.redirect(
			new URL(
				`/?error=Platform ${platform} not supported yet`,
				baseUrl
			)
		);
	}

	try {
		const supabase = await createClient();

		// Get current user
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError || !user) {
			return NextResponse.redirect(
				new URL("/?error=User not authenticated", baseUrl)
			);
		}

		// Get OAuth state from cookies to retrieve code_verifier
		const stateData = request.cookies.get(`oauth_state_${state}`);
		if (!stateData) {
			return NextResponse.redirect(
				new URL("/?error=Invalid or expired OAuth state", baseUrl)
			);
		}

		const { code_verifier } = JSON.parse(stateData.value);

		// Exchange code for tokens
		const clientKey = process.env.TIKTOK_CLIENT_KEY!;
		const clientSecret = process.env.TIKTOK_CLIENT_SECRET!;
		const redirectUri = `${baseUrl}/accounts/callback/tiktok`;

		const tokenResponse = await exchangeCodeForToken(
			code,
			code_verifier,
			clientKey,
			clientSecret,
			redirectUri
		);

		// Fetch user info from TikTok
		const tiktokUser = await getUserInfo(tokenResponse.access_token);

		// Calculate token expiry
		const tokenExpiresAt = new Date(
			Date.now() + tokenResponse.expires_in * 1000
		);

		// Check if account already exists
		const { data: existingAccount } = await supabase
			.from("connected_accounts")
			.select("id")
			.eq("user_id", user.id)
			.eq("platform", "tiktok")
			.eq("platform_user_id", tiktokUser.open_id)
			.single();

		let accountId: string;

		if (existingAccount) {
			// Update existing account
			const { data, error } = await supabase
				.from("connected_accounts")
				.update({
					access_token: tokenResponse.access_token,
					refresh_token: tokenResponse.refresh_token,
					token_expires_at: tokenExpiresAt.toISOString(),
					platform_username: tiktokUser.username,
					display_name: tiktokUser.display_name,
					avatar_url: tiktokUser.avatar_url,
					scopes: tokenResponse.scope.split(","),
					metadata: {
						is_verified: tiktokUser.is_verified,
						profile_deep_link: tiktokUser.profile_deep_link,
					},
					updated_at: new Date().toISOString(),
				})
				.eq("id", existingAccount.id)
				.select("id")
				.single();

			if (error) throw error;
			accountId = data.id;
		} else {
			// Insert new account
			const { data, error } = await supabase
				.from("connected_accounts")
				.insert({
					user_id: user.id,
					platform: "tiktok",
					platform_user_id: tiktokUser.open_id,
					platform_username: tiktokUser.username,
					display_name: tiktokUser.display_name,
					avatar_url: tiktokUser.avatar_url,
					access_token: tokenResponse.access_token,
					refresh_token: tokenResponse.refresh_token,
					token_expires_at: tokenExpiresAt.toISOString(),
					scopes: tokenResponse.scope.split(","),
					metadata: {
						is_verified: tiktokUser.is_verified,
						profile_deep_link: tiktokUser.profile_deep_link,
					},
				})
				.select("id")
				.single();

			if (error) throw error;
			accountId = data.id;
		}

		// Clear OAuth state cookie
		const response = NextResponse.redirect(
			new URL(`/dashboard?account=${accountId}&tab=metrics`, baseUrl)
		);
		response.cookies.delete(`oauth_state_${state}`);

		// If this is a popup, send message to opener
		const html = `
			<!DOCTYPE html>
			<html>
			<head>
				<title>Authentication Successful</title>
			</head>
			<body>
				<script>
					if (window.opener) {
						window.opener.postMessage({ type: 'tiktok-auth-success', accountId: '${accountId}' }, '*');
						window.close();
					} else {
						window.location.href = '/dashboard?account=${accountId}&tab=metrics';
					}
				</script>
				<p>Redirecting...</p>
			</body>
			</html>
		`;

		return new NextResponse(html, {
			headers: {
				"Content-Type": "text/html",
			},
		});
	} catch (error) {
		console.error("OAuth callback error:", error);
		return NextResponse.redirect(
			new URL(
				`/?error=${encodeURIComponent(error instanceof Error ? error.message : "Authentication failed")}`,
				baseUrl
			)
		);
	}
}
