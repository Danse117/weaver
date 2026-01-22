import {
	TikTokUserInfoResponse,
	TikTokVideoListResponse,
	TikTokVideoQueryResponse,
	TikTokUser,
	TikTokVideo,
} from "./types";

const TIKTOK_API_BASE = "https://open.tiktokapis.com/v2";

// Rate limiting tracker (simple in-memory, consider Redis for production)
const rateLimitTracker = new Map<
	string,
	{ count: number; resetAt: number }
>();

/**
 * Check and update rate limit
 * TikTok allows 600 requests per minute per token
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
 * Get user information
 * Requires scopes: user.info.basic, user.info.profile, user.info.stats
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
 * List user's videos
 * Requires scope: video.list
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
 * Query specific videos by ID
 * Requires scope: video.list
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
 * Get aggregated stats for an account
 * This is a helper that combines getUserInfo for stats
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
