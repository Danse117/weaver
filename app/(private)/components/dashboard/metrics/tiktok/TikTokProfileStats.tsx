/**
 * TikTok Profile Stats Component
 * 
 * Displays key TikTok account metrics in a grid of stat cards:
 * - Followers
 * - Following
 * - Total Likes (account-level, not per video)
 * - Total Videos
 * 
 * These are TikTok-specific metrics from the user.info.stats API scope.
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TikTokUser } from "@/lib/connectors/tiktok/types";
import { Users, UserPlus, Heart, Video } from "lucide-react";
import { formatNumber } from "../shared/formatNumber";

interface TikTokProfileStatsProps {
	user: TikTokUser;
	stats: {
		followers: number;
		following: number;
		likes: number;
		videos: number;
	};
}

export function TikTokProfileStats({ user, stats }: TikTokProfileStatsProps) {
	const statCards = [
		{
			title: "Followers",
			value: stats.followers,
			icon: Users,
			color: "text-blue-500",
		},
		{
			title: "Following",
			value: stats.following,
			icon: UserPlus,
			color: "text-green-500",
		},
		{
			title: "Total Likes",
			value: stats.likes,
			icon: Heart,
			color: "text-red-500",
		},
		{
			title: "Videos",
			value: stats.videos,
			icon: Video,
			color: "text-purple-500",
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{statCards.map((stat) => {
				const Icon = stat.icon;
				return (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{stat.title}
							</CardTitle>
							<Icon className={`h-4 w-4 ${stat.color}`} />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatNumber(stat.value)}
							</div>
							<p className="text-xs text-muted-foreground mt-1">
								{stat.value.toLocaleString()} total
							</p>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
