/**
 * TikTok Content Tab Component
 * 
 * Displays a paginated grid of TikTok videos with engagement metrics.
 * 
 * Features:
 * - Initial load of 20 videos
 * - "Load More" pagination
 * - Video thumbnails with hover effects
 * - Engagement stats (views, likes, comments, shares)
 * 
 * Future enhancements:
 * - Filtering by date range
 * - Sorting by performance metrics
 * - Search by caption/hashtags
 * - Bulk actions (delete, download stats)
 */

"use client";

import { useState, useEffect } from "react";
import { fetchTikTokVideos } from "@/app/actions/tiktok";
import { TikTokVideo } from "@/lib/connectors/tiktok/types";
import { TikTokVideoGrid } from "./TikTokVideoGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeaverLoaderWithText } from "@/components/ui/loader";
import { Loader2 } from "lucide-react";

interface TikTokContentTabProps {
	accountId: string;
}

export function TikTokContentTab({ accountId }: TikTokContentTabProps) {
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [videos, setVideos] = useState<TikTokVideo[]>([]);
	const [cursor, setCursor] = useState<number | undefined>(undefined);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		async function loadVideos() {
			setLoading(true);
			setError(null);
			try {
				const result = await fetchTikTokVideos(accountId);
				setVideos(result.videos);
				setCursor(result.cursor);
				setHasMore(result.hasMore);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load videos");
			} finally {
				setLoading(false);
			}
		}

		loadVideos();
	}, [accountId]);

	const loadMoreVideos = async () => {
		if (!hasMore || loadingMore) return;

		setLoadingMore(true);
		try {
			const result = await fetchTikTokVideos(accountId, cursor);
			setVideos([...videos, ...result.videos]);
			setCursor(result.cursor);
			setHasMore(result.hasMore);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load more videos");
		} finally {
			setLoadingMore(false);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<WeaverLoaderWithText size={48} text="Loading videos..." />
			</div>
		);
	}

	if (error && videos.length === 0) {
		return (
			<div className="flex items-center justify-center h-full p-6">
				<Card className="max-w-md w-full">
					<CardHeader>
						<CardTitle className="text-destructive">Error Loading Videos</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">{error}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (videos.length === 0) {
		return (
			<div className="flex items-center justify-center h-full p-6">
				<Card className="max-w-md w-full">
					<CardHeader>
						<CardTitle>No Videos Found</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							This TikTok account doesn't have any public videos yet.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full">
			<div>
				<h2 className="text-xl sm:text-2xl font-bold tracking-tight">TikTok Videos</h2>
				<p className="text-sm text-muted-foreground">
					Browse and analyze your TikTok video performance
				</p>
			</div>

			<TikTokVideoGrid videos={videos} />

			{hasMore && (
				<div className="flex justify-center pt-4">
					<Button
						onClick={loadMoreVideos}
						disabled={loadingMore}
						variant="outline"
					>
						{loadingMore ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Loading...
							</>
						) : (
							"Load More"
						)}
					</Button>
				</div>
			)}

			{error && (
				<p className="text-sm text-destructive text-center">{error}</p>
			)}
		</div>
	);
}
