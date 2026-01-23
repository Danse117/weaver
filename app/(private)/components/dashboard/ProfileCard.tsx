"use client";

/**
 * ProfileCard component
 *
 * Displays profile information in a compact card format.
 * Mobile: Ultra-compact horizontal layout
 * Desktop: Expanded horizontal layout with more details
 *
 * @param account - The connected account to display
 */

import { ConnectedAccount } from "@/app/actions/accounts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  User,
  BadgeCheck,
  TrendingUp,
  TrendingDown,
  Calendar,
  RefreshCw,
  Circle,
} from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  account: ConnectedAccount | null;
}

// ============================================================================
// Placeholder data - Replace with real API data when available
// ============================================================================

interface ProfileStats {
  followers: number;
  following: number;
  videos: number;
  likes: number;
  isVerified: boolean;
  isBusinessAccount: boolean;
  engagementRate: number;
  followerGrowth: number;
  lastSynced: Date;
  connectedAt: Date;
  tokenStatus: "valid" | "expiring" | "expired";
}

function getPlaceholderStats(): ProfileStats {
  return {
    followers: 128500,
    following: 892,
    videos: 47,
    likes: 1250000,
    isVerified: true,
    isBusinessAccount: true,
    engagementRate: 5.8,
    followerGrowth: 2.4,
    lastSynced: new Date(Date.now() - 5 * 60 * 1000),
    connectedAt: new Date("2024-11-15"),
    tokenStatus: "valid",
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TokenStatusIndicator({ status }: { status: ProfileStats["tokenStatus"] }) {
  const config = {
    valid: { color: "text-green-500", label: "Connected" },
    expiring: { color: "text-yellow-500", label: "Expiring" },
    expired: { color: "text-red-500", label: "Reconnect" },
  };
  const { color, label } = config[status];

  return (
    <div className="flex items-center gap-1">
      <Circle className={`h-1.5 w-1.5 sm:h-2 sm:w-2 fill-current ${color}`} />
      <span className="text-[10px] sm:text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function GrowthIndicator({ growth }: { growth: number }) {
  const isPositive = growth >= 0;
  return (
    <div
      className={`flex items-center gap-0.5 text-[10px] sm:text-xs ${
        isPositive ? "text-green-500" : "text-red-500"
      }`}
    >
      {isPositive ? (
        <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
      ) : (
        <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
      )}
      <span>{isPositive ? "+" : ""}{growth.toFixed(1)}%</span>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ProfileCard({ account }: ProfileCardProps) {
  if (!account) {
    return null;
  }

  const stats = getPlaceholderStats();

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
    <div className="px-2 sm:px-4 pt-2 sm:pt-4 pb-1 sm:pb-2 w-full md:max-w-none md:w-1/2 shrink-0">
      <Card className="overflow-hidden">
        <CardContent className="p-2 sm:p-4">
          {/* Mobile: Compact single row | MD+: Expanded layout */}
          <div className="flex flex-col md:flex-row md:gap-6">
            
            {/* Left Section: Avatar + Name */}
            <div className="flex items-center gap-2 sm:gap-3 md:shrink-0 md:w-48">
              {/* Avatar - smaller on mobile */}
              <div className="relative h-10 w-10 sm:h-14 md:h-16 sm:w-14 md:w-16 shrink-0 rounded-full overflow-hidden bg-muted">
                {account.avatar_url ? (
                  <Image
                    src={account.avatar_url}
                    alt={account.display_name || "Profile"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className="h-5 w-5 sm:h-7 sm:w-7 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Name + Badges */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold text-sm sm:text-base truncate">
                    {account.display_name || account.platform_username || "Unknown"}
                  </h3>
                  {stats.isVerified && (
                    <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                  )}
                </div>

                {/* Platform + Account Type */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-xs text-muted-foreground capitalize">
                    {account.platform}
                  </span>
                  {stats.isBusinessAccount && (
                    <Badge variant="secondary" className="text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0 h-4">
                      Business
                    </Badge>
                  )}
                </div>

                {/* Profile Link - hidden on mobile */}
                {profileUrl && (
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 mt-0.5 text-xs text-primary hover:underline"
                  >
                    View Profile
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Mobile: Inline stats */}
              <div className="flex sm:hidden items-center gap-3 text-center">
                <div>
                  <p className="text-xs font-semibold">{formatNumber(stats.followers)}</p>
                  <p className="text-[8px] text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">{stats.engagementRate}%</p>
                  <p className="text-[8px] text-muted-foreground">Engage</p>
                </div>
                <TokenStatusIndicator status={stats.tokenStatus} />
              </div>
            </div>

            {/* Bio - hidden on mobile, visible on sm+ */}
            {bio && (
              <p className="hidden sm:block md:hidden mt-2 text-xs text-muted-foreground line-clamp-1">
                {bio}
              </p>
            )}

            {/* Right Section: Stats (hidden on mobile, shown on sm+) */}
            <div className="hidden sm:flex flex-1 mt-3 md:mt-0 md:border-l md:border-border md:pl-6 flex-col">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-sm font-semibold">{formatNumber(stats.followers)}</p>
                    <GrowthIndicator growth={stats.followerGrowth} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">Followers</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{stats.videos}</p>
                  <p className="text-[10px] text-muted-foreground">Videos</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{formatNumber(stats.likes)}</p>
                  <p className="text-[10px] text-muted-foreground">Likes</p>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="mt-2 flex items-center justify-center gap-2 py-1.5 bg-muted/50 rounded-lg">
                <span className="text-[10px] sm:text-xs text-muted-foreground">Engagement</span>
                <span className="text-xs sm:text-sm font-semibold text-primary">
                  {stats.engagementRate.toFixed(1)}%
                </span>
              </div>

              {/* Connection Info */}
              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                <TokenStatusIndicator status={stats.tokenStatus} />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    <span>{formatTimeAgo(stats.lastSynced)}</span>
                  </div>
                  <div className="hidden md:flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(stats.connectedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
