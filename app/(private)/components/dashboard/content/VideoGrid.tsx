"use client";

import { TikTokVideo } from "@/lib/connectors/tiktok/types";
import { VideoCard } from "./VideoCard";

interface VideoGridProps {
	videos: TikTokVideo[];
}

export function VideoGrid({ videos }: VideoGridProps) {
	return (
		<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{videos.map((video) => (
				<VideoCard key={video.id} video={video} />
			))}
		</div>
	);
}
