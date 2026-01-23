/**
 * TikTok Video Grid Component
 * 
 * Responsive grid layout for displaying TikTok video cards.
 * Adjusts columns based on screen size:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 * - Large desktop: 4 columns
 */

"use client";

import { TikTokVideo } from "@/lib/connectors/tiktok/types";
import { TikTokVideoCard } from "./TikTokVideoCard";

interface TikTokVideoGridProps {
	videos: TikTokVideo[];
}

export function TikTokVideoGrid({ videos }: TikTokVideoGridProps) {
	return (
		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{videos.map((video) => (
				<TikTokVideoCard key={video.id} video={video} />
			))}
		</div>
	);
}
