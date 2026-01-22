"use client";

import { useState, useEffect } from "react";
import { fetchTikTokProfile } from "@/app/actions/tiktok";
import { ProfileStats } from "./ProfileStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MetricsTabProps {
	accountId: string;
}

export function MetricsTab({ accountId }: MetricsTabProps) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		async function loadMetrics() {
			setLoading(true);
			setError(null);
			try {
				const profileData = await fetchTikTokProfile(accountId);
				setData(profileData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load metrics");
			} finally {
				setLoading(false);
			}
		}

		loadMetrics();
	}, [accountId]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="flex flex-col items-center gap-2">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
					<p className="text-sm text-muted-foreground">Loading metrics...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center h-full p-6">
				<Card className="max-w-md w-full">
					<CardHeader>
						<CardTitle className="text-destructive">Error Loading Metrics</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">{error}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>
				<p className="text-muted-foreground">
					Track your TikTok performance and engagement
				</p>
			</div>

			{data && <ProfileStats user={data.user} stats={data.stats} />}

			{/* Placeholder for future charts */}
			<Card>
				<CardHeader>
					<CardTitle>Engagement Trends</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-64 text-muted-foreground">
						<p>Connect your account for 7+ days to see engagement trends</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
