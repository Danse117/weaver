/**
 * Advertising Tab Router Component
 *
 * Routes to platform-specific advertising analytics tabs.
 * Currently supports:
 * - TikTok Marketing API
 *
 * Future platforms:
 * - Meta Ads (Facebook/Instagram)
 * - YouTube Ads
 * - Twitter/X Ads
 */

"use client";

import { TikTokAdvertisingTab } from "./tiktok/TikTokAdvertisingTab";

interface AdvertisingTabProps {
  accountId: string;
  platform: string;
}

export function AdvertisingTab({ accountId, platform }: AdvertisingTabProps) {
  // Route to platform-specific advertising tab
  switch (platform.toLowerCase()) {
    case "tiktok":
      return <TikTokAdvertisingTab accountId={accountId} />;

    // Future platforms
    // case "facebook":
    // case "instagram":
    //   return <MetaAdvertisingTab accountId={accountId} />;
    // case "youtube":
    //   return <YouTubeAdvertisingTab accountId={accountId} />;
    // case "twitter":
    // case "x":
    //   return <XAdvertisingTab accountId={accountId} />;

    default:
      return (
        <div className="flex items-center justify-center h-full p-6">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">
              Advertising analytics for {platform} coming soon
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              We&apos;re working on integrating {platform} advertising data.
            </p>
          </div>
        </div>
      );
  }
}
