"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TikTokUser } from "@/lib/connectors/tiktok/types";
import { Users, UserPlus, Heart, Video } from "lucide-react";

interface ProfileStatsProps {
	user: TikTokUser;
	stats: {
		followers: number;
		following: number;
		likes: number;
		videos: number;
	};
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

export function ProfileStats({ user, stats }: ProfileStatsProps) {
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
