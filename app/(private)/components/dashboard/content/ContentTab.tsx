/**
 * Content Tab Router Component
 * 
 * Determines which platform-specific content tab to render based on the connected account.
 * This is the component imported by the main dashboard page.
 * 
 * Flow:
 * 1. Receives accountId from dashboard
 * 2. Fetches account details to determine platform
 * 3. Renders appropriate platform-specific content component
 * 
 * Supported platforms:
 * - TikTok: TikTokContentTab (videos)
 * - Instagram: Coming soon (posts, reels, stories)
 * - YouTube: Coming soon (videos, shorts)
 * - etc.
 */

"use client";

import { useState, useEffect } from "react";
import { getConnectedAccounts, ConnectedAccount } from "@/app/actions/accounts";
import { TikTokContentTab } from "./tiktok/TikTokContentTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeaverLoader } from "@/components/ui/loader";

interface ContentTabProps {
	accountId: string;
}

export function ContentTab({ accountId }: ContentTabProps) {
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
			return <TikTokContentTab accountId={accountId} />;
		
		// Future platforms
		case "instagram":
			return <PlatformComingSoon platform="Instagram" type="posts, reels, and stories" />;
		case "youtube":
			return <PlatformComingSoon platform="YouTube" type="videos and shorts" />;
		case "facebook":
			return <PlatformComingSoon platform="Facebook" type="posts and videos" />;
		case "twitter":
		case "x":
			return <PlatformComingSoon platform="X (Twitter)" type="tweets" />;
		
		default:
			return <PlatformNotSupported platform={account.platform} />;
	}
}

// Placeholder for platforms not yet implemented
function PlatformComingSoon({ platform, type }: { platform: string; type: string }) {
	return (
		<div className="flex items-center justify-center h-full p-6">
			<Card className="max-w-md w-full">
				<CardHeader>
					<CardTitle>{platform} Content</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground">
						{platform} content library is coming soon!
					</p>
					<p className="text-xs text-muted-foreground">
						We're working on adding support for browsing and analyzing your {type}. Stay tuned!
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
						The platform "{platform}" is not currently supported for content management.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
