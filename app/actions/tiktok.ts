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
 * Fetch TikTok profile information and stats
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
 * Fetch TikTok videos for an account
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
 * Fetch specific TikTok videos by IDs
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
 * Refresh account data (force refresh bypassing cache)
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
