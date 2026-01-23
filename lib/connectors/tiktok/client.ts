/**
 * TikTok API v2 Client
 * 
 * This module provides functions to interact with TikTok's official API v2.
 * All functions require a valid access token obtained through OAuth.
 * 
 * Rate Limits:
 * - 600 requests per minute per access token
 * - Rate limiting is tracked in-memory (use Redis for multi-server deployments)
 * 
 * @see https://developers.tiktok.com/doc/content-posting-api-reference
 */

import {
	TikTokUserInfoResponse,
	TikTokVideoListResponse,
	TikTokVideoQueryResponse,
	TikTokUser,
	TikTokVideo,
} from "./types";

const TIKTOK_API_BASE = "https://open.tiktokapis.com/v2";

/**
 * In-memory rate limit tracker
 * Maps access token -> { request count, reset timestamp }
 * 
 * NOTE: For production with multiple servers, use Redis or similar
 * to share rate limit state across instances.
 */
const rateLimitTracker = new Map<
	string,
	{ count: number; resetAt: number }
>();

/**
 * Check and enforce rate limiting for TikTok API requests
 * 
 * TikTok's rate limit: 600 requests per minute per access token
 * Counter resets every 60 seconds.
 * 
 * @param accessToken - The access token to check rate limit for
 * @returns true if request is allowed, false if rate limit exceeded
 */
function checkRateLimit(accessToken: string): boolean {
	const now = Date.now();
	const tracker = rateLimitTracker.get(accessToken);

	if (!tracker || now > tracker.resetAt) {
		// Reset counter
		rateLimitTracker.set(accessToken, {
			count: 1,
			resetAt: now + 60000, // 1 minute from now
		});
		return true;
	}

	if (tracker.count >= 600) {
		return false; // Rate limit exceeded
	}

	tracker.count++;
	return true;
}

/**
 * Make authenticated request to TikTok API
 * 
 * Handles:
 * - Rate limiting (600 requests/minute)
 * - Authentication (Bearer token)
 * - Error handling and parsing
 * - API-level error detection
 * 
 * @param endpoint - API endpoint path (e.g., "/user/info/")
 * @param accessToken - Valid TikTok access token
 * @param options - Additional fetch options (method, body, headers)
 * @returns Parsed JSON response
 * @throws Error if rate limited, unauthorized, or API returns error
 */
async function tiktokFetch<T>(
	endpoint: string,
	accessToken: string,
	options: RequestInit = {}
): Promise<T> {
	if (!checkRateLimit(accessToken)) {
		throw new Error("Rate limit exceeded. Please wait before retrying.");
	}

	const response = await fetch(`${TIKTOK_API_BASE}${endpoint}`, {
		...options,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(
			errorData.error?.message ||
				`TikTok API error: ${response.statusText}`
		);
	}

	const data = await response.json();

	// Check for API-level errors
	if (data.error && data.error.code !== "ok") {
		throw new Error(`TikTok API error: ${data.error.message}`);
	}

	return data;
}

/**
 * Get TikTok user profile information and statistics
 * 
 * Fetches comprehensive user data including profile info and account metrics.
 * This is the primary endpoint for dashboard profile stats.
 * 
 * Required OAuth scopes:
 * - user.info.basic: open_id, union_id
 * - user.info.profile: username, display_name, avatar_url, bio, verification status
 * - user.info.stats: follower_count, following_count, likes_count, video_count
 * 
 * @param accessToken - Valid TikTok access token
 * @param fields - Array of field names to retrieve (defaults to all available)
 * @returns User object with profile data and stats
 * @throws Error if token is invalid or scopes are insufficient
 */
export async function getUserInfo(
	accessToken: string,
	fields: string[] = [
		"open_id",
		"union_id",
		"avatar_url",
		"avatar_url_100",
		"avatar_large_url",
		"display_name",
		"username",
		"bio_description",
		"is_verified",
		"profile_deep_link",
		"follower_count",
		"following_count",
		"likes_count",
		"video_count",
	]
): Promise<TikTokUser> {
	const params = new URLSearchParams({
		fields: fields.join(","),
	});

	const response = await tiktokFetch<TikTokUserInfoResponse>(
		`/user/info/?${params}`,
		accessToken
	);

	return response.data.user;
}

/**
 * List user's videos with pagination
 * 
 * Retrieves a paginated list of the user's TikTok videos, ordered by creation time (newest first).
 * Use the returned cursor to fetch the next page.
 * 
 * Required OAuth scope: video.list
 * 
 * API Limits:
 * - Max 20 videos per request
 * - Videos include engagement metrics (views, likes, comments, shares)
 * 
 * @param accessToken - Valid TikTok access token
 * @param cursor - Pagination cursor from previous response (omit for first page)
 * @param maxCount - Number of videos to retrieve (1-20, default 20)
 * @param fields - Array of video field names to retrieve
 * @returns Object with videos array, next cursor, and hasMore flag
 * @throws Error if token is invalid or scope is missing
 */
export async function listVideos(
	accessToken: string,
	cursor?: number,
	maxCount: number = 20,
	fields: string[] = [
		"id",
		"create_time",
		"cover_image_url",
		"share_url",
		"video_description",
		"title",
		"duration",
		"height",
		"width",
		"view_count",
		"like_count",
		"comment_count",
		"share_count",
	]
): Promise<{
	videos: TikTokVideo[];
	cursor: number;
	hasMore: boolean;
}> {
	const params = new URLSearchParams({
		fields: fields.join(","),
	});

	const body: { max_count: number; cursor?: number } = {
		max_count: Math.min(maxCount, 20), // API max is 20
	};

	if (cursor) {
		body.cursor = cursor;
	}

	const response = await tiktokFetch<TikTokVideoListResponse>(
		`/video/list/?${params}`,
		accessToken,
		{
			method: "POST",
			body: JSON.stringify(body),
		}
	);

	return {
		videos: response.data.videos,
		cursor: response.data.cursor,
		hasMore: response.data.has_more,
	};
}

/**
 * Query specific videos by their IDs
 * 
 * Fetch detailed information for specific videos when you know their IDs.
 * Useful for refreshing stats on specific videos or deep-linking to video details.
 * 
 * Required OAuth scope: video.list
 * 
 * API Limits:
 * - Maximum 20 video IDs per request
 * - Returns only videos that belong to the authenticated user
 * 
 * @param accessToken - Valid TikTok access token
 * @param videoIds - Array of video IDs to query (max 20)
 * @param fields - Array of video field names to retrieve
 * @returns Array of video objects (may be less than requested if some IDs are invalid)
 * @throws Error if more than 20 IDs provided or token is invalid
 */
export async function queryVideos(
	accessToken: string,
	videoIds: string[],
	fields: string[] = [
		"id",
		"create_time",
		"cover_image_url",
		"share_url",
		"video_description",
		"title",
		"duration",
		"height",
		"width",
		"view_count",
		"like_count",
		"comment_count",
		"share_count",
	]
): Promise<TikTokVideo[]> {
	if (videoIds.length === 0) {
		return [];
	}

	if (videoIds.length > 20) {
		throw new Error("Maximum 20 video IDs allowed per request");
	}

	const params = new URLSearchParams({
		fields: fields.join(","),
	});

	const response = await tiktokFetch<TikTokVideoQueryResponse>(
		`/video/query/?${params}`,
		accessToken,
		{
			method: "POST",
			body: JSON.stringify({
				filters: {
					video_ids: videoIds,
				},
			}),
		}
	);

	return response.data.videos;
}

/**
 * Get aggregated account statistics
 * 
 * Helper function that fetches just the key metrics for dashboard display.
 * This is more efficient than fetching full user info when you only need stats.
 * 
 * Required OAuth scopes: user.info.basic, user.info.stats
 * 
 * @param accessToken - Valid TikTok access token
 * @returns Object with followers, following, likes, and video counts
 */
export async function getAccountStats(accessToken: string) {
	const user = await getUserInfo(accessToken, [
		"open_id",
		"follower_count",
		"following_count",
		"likes_count",
		"video_count",
	]);

	return {
		followers: user.follower_count || 0,
		following: user.following_count || 0,
		likes: user.likes_count || 0,
		videos: user.video_count || 0,
	};
}
