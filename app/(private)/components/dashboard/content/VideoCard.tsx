"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TikTokVideo } from "@/lib/connectors/tiktok/types";
import { Eye, Heart, MessageCircle, Share2, Play } from "lucide-react";
import Image from "next/image";

interface VideoCardProps {
	video: TikTokVideo;
}

function formatNumber(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + "K";
	}
	return num.toString();
}

function formatDate(timestamp: number): string {
	const date = new Date(timestamp * 1000);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export function VideoCard({ video }: VideoCardProps) {
	const stats = [
		{ icon: Eye, value: video.view_count || 0, label: "Views" },
		{ icon: Heart, value: video.like_count || 0, label: "Likes" },
		{ icon: MessageCircle, value: video.comment_count || 0, label: "Comments" },
		{ icon: Share2, value: video.share_count || 0, label: "Shares" },
	];

	return (
		<Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
			<div className="relative aspect-[9/16] bg-muted overflow-hidden">
				{video.cover_image_url ? (
					<Image
						src={video.cover_image_url}
						alt={video.title || video.video_description || "TikTok video"}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>
				) : (
					<div className="flex items-center justify-center h-full">
						<Play className="h-12 w-12 text-muted-foreground" />
					</div>
				)}
				<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
					<Play className="h-12 w-12 text-white" />
				</div>
				{video.duration && (
					<div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
						{Math.floor(video.duration / 60)}:
						{String(video.duration % 60).padStart(2, "0")}
					</div>
				)}
			</div>

			<CardContent className="p-3">
				<p className="text-sm line-clamp-2 mb-2">
					{video.title || video.video_description || "No description"}
				</p>
				<p className="text-xs text-muted-foreground">
					{formatDate(video.create_time)}
				</p>
			</CardContent>

			<CardFooter className="p-3 pt-0 grid grid-cols-2 gap-2">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.label}
							className="flex items-center gap-1 text-xs text-muted-foreground"
						>
							<Icon className="h-3 w-3" />
							<span>{formatNumber(stat.value)}</span>
						</div>
					);
				})}
			</CardFooter>
		</Card>
	);
}
