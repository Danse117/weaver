"use client";

/**
 * ProfileCard component
 * 
 * Displays basic profile information in a card format.
 * Shows avatar, username, bio, and link to social media account.
 * 
 * @param account - The connected account to display
 */

import { ConnectedAccount } from "@/app/actions/accounts";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, User } from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
	account: ConnectedAccount | null;
}

export function ProfileCard({ account }: ProfileCardProps) {
	if (!account) {
		return null;
	}

	// Get platform URL based on platform type
	const getPlatformUrl = (platform: string, username: string | null) => {
		if (!username) return null;
		
		const urls: Record<string, string> = {
			tiktok: `https://www.tiktok.com/@${username}`,
			instagram: `https://www.instagram.com/${username}`,
			facebook: `https://www.facebook.com/${username}`,
			x: `https://x.com/${username}`,
			youtube: `https://www.youtube.com/@${username}`,
			linkedin: `https://www.linkedin.com/in/${username}`,
			threads: `https://www.threads.net/@${username}`,
			tumblr: `https://${username}.tumblr.com`,
			twitch: `https://www.twitch.tv/${username}`,
			snapchat: `https://www.snapchat.com/add/${username}`,
			kick: `https://kick.com/${username}`,
			onlyfans: `https://onlyfans.com/${username}`,
		};

		return urls[platform.toLowerCase()] || null;
	};

	const profileUrl = getPlatformUrl(account.platform, account.platform_username);
	const bio = account.metadata?.bio || account.metadata?.description || null;

	return (
		<div className="px-4 pt-4 pb-2 w-[300px] shrink-0">
			<Card className="overflow-hidden">
				<CardContent className="p-3">
					<div className="flex flex-col items-center text-center gap-3">
					{/* Avatar */}
					<div className="relative h-20 w-20 shrink-0 rounded-full overflow-hidden bg-muted">
						{account.avatar_url ? (
							<Image
								src={account.avatar_url}
								alt={account.display_name || "Profile"}
								fill
								className="object-cover"
							/>
						) : (
							<div className="h-full w-full flex items-center justify-center">
								<User className="h-10 w-10 text-muted-foreground" />
							</div>
						)}
					</div>

					{/* Info */}
					<div className="flex-1 min-w-0 w-full">
						{/* Username */}
						<h3 className="font-semibold text-base truncate">
							{account.display_name || account.platform_username || "Unknown"}
						</h3>

						{/* Platform */}
						<p className="text-xs text-muted-foreground capitalize">
							{account.platform}
						</p>

						{/* Bio */}
						{bio && (
							<p className="mt-2 text-xs text-muted-foreground line-clamp-2">
								{bio}
							</p>
						)}

						{/* Profile Link */}
						{profileUrl && (
							<a
								href={profileUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
							>
								View Profile
								<ExternalLink className="h-3 w-3" />
							</a>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
		</div>
	);
}
