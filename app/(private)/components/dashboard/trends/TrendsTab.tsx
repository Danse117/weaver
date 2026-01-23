/**
 * TrendsTab Router Component
 *
 * Routes to the appropriate platform-specific trends component.
 * Unlike other tabs, Trends doesn't depend on a connected account -
 * it shows global trending data from platform Research APIs.
 *
 * Currently supported:
 * - TikTok: TikTokTrendsTab (Research API)
 *
 * Future platforms:
 * - Instagram: Coming soon
 * - YouTube: Coming soon
 */

"use client";

import { useState } from "react";
import { TikTokTrendsTab } from "./tiktok/TikTokTrendsTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";

// =============================================================================
// Types
// =============================================================================

type TrendPlatform = "tiktok" | "instagram" | "youtube";

interface PlatformOption {
  value: TrendPlatform;
  label: string;
  icon: string;
  available: boolean;
}

// =============================================================================
// Constants
// =============================================================================

const PLATFORMS: PlatformOption[] = [
  { value: "tiktok", label: "TikTok", icon: "🎵", available: true },
  { value: "instagram", label: "Instagram", icon: "📸", available: false },
  { value: "youtube", label: "YouTube", icon: "▶️", available: false },
];

// =============================================================================
// Main Component
// =============================================================================

export function TrendsTab() {
  const [platform, setPlatform] = useState<TrendPlatform>("tiktok");

  // For now, only TikTok is available
  // In the future, this will route to different platform components

  return (
    <div className="h-full">
      {/* Platform Selector - shown when multiple platforms are available */}
      {/* Currently hidden since only TikTok is implemented */}
      {/* 
      <div className="p-4 border-b border-border">
        <Select value={platform} onValueChange={(v) => setPlatform(v as TrendPlatform)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((p) => (
              <SelectItem key={p.value} value={p.value} disabled={!p.available}>
                <span className="flex items-center gap-2">
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                  {!p.available && (
                    <span className="text-xs text-muted-foreground">(Soon)</span>
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      */}

      {/* Platform-specific content */}
      {platform === "tiktok" && <TikTokTrendsTab />}

      {platform === "instagram" && (
        <PlatformComingSoon platform="Instagram" />
      )}

      {platform === "youtube" && (
        <PlatformComingSoon platform="YouTube" />
      )}
    </div>
  );
}

// =============================================================================
// Placeholder Components
// =============================================================================

function PlatformComingSoon({ platform }: { platform: string }) {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <CardTitle>{platform} Trends</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {platform} trends integration is coming soon!
          </p>
          <p className="text-xs text-muted-foreground">
            We're working on adding trending data for {platform}. 
            Stay tuned for updates on hashtags, sounds, and more.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
