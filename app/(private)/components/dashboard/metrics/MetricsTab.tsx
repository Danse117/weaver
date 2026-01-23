/**
 * Metrics Tab Router Component
 * 
 * Determines which platform-specific metrics tab to render based on the connected account.
 * This is the component imported by the main dashboard page.
 * 
 * Flow:
 * 1. Receives accountId from dashboard
 * 2. Fetches account details to determine platform
 * 3. Renders appropriate platform-specific metrics component
 * 
 * Supported platforms:
 * - TikTok: TikTokMetricsTab
 * - Instagram: Coming soon
 * - YouTube: Coming soon
 * - etc.
 */

"use client";

import { useState, useEffect } from "react";
import { getConnectedAccounts, ConnectedAccount } from "@/app/actions/accounts";
import { TikTokMetricsTab } from "./tiktok/TikTokMetricsTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeaverLoader } from "@/components/ui/loader";

interface MetricsTabProps {
	accountId: string;
}

export function MetricsTab({ accountId }: MetricsTabProps) {
	const [loading, setLoading] = useState(true);
	const [account, setAccount] = useState<ConnectedAccount | null>(null);

	useEffect(() => {
		async function loadAccount() {
			try {
				const accounts = await getConnectedAccounts();
				const foundAccount = accounts.find((a) => a.id === accountId);
				setAccount(foundAccount || null);
			} catch (err) {
				console.error("Failed to load account:", err);
			} finally {
				setLoading(false);
			}
		}

		loadAccount();
	}, [accountId]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-full">
				<WeaverLoader size={48} />
			</div>
		);
	}

	if (!account) {
		return (
			<div className="flex items-center justify-center h-full p-6">
				<Card className="max-w-md w-full">
					<CardHeader>
						<CardTitle className="text-destructive">Account Not Found</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							The selected account could not be found.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	// Route to platform-specific component
	switch (account.platform) {
		case "tiktok":
			return <TikTokMetricsTab accountId={accountId} />;
		
		// Future platforms
		case "instagram":
			return <PlatformComingSoon platform="Instagram" />;
		case "youtube":
			return <PlatformComingSoon platform="YouTube" />;
		case "facebook":
			return <PlatformComingSoon platform="Facebook" />;
		case "twitter":
		case "x":
			return <PlatformComingSoon platform="X (Twitter)" />;
		
		default:
			return <PlatformNotSupported platform={account.platform} />;
	}
}

// Placeholder for platforms not yet implemented
function PlatformComingSoon({ platform }: { platform: string }) {
	return (
		<div className="flex items-center justify-center h-full p-6">
			<Card className="max-w-md w-full">
				<CardHeader>
					<CardTitle>{platform} Analytics</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground">
						{platform} analytics integration is coming soon!
					</p>
					<p className="text-xs text-muted-foreground">
						We're working on adding comprehensive analytics for {platform}. Stay tuned!
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

// Error state for unsupported platforms
function PlatformNotSupported({ platform }: { platform: string }) {
	return (
		<div className="flex items-center justify-center h-full p-6">
			<Card className="max-w-md w-full">
				<CardHeader>
					<CardTitle className="text-destructive">Platform Not Supported</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						The platform "{platform}" is not currently supported for analytics.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
