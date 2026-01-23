/**
 * TikTokTrendsTab Component
 *
 * Main TikTok trends page with sub-tabs for Hashtags, Sounds, and Effects.
 * Displays CoinMarketCap-style ranked tables with charts and regional filtering.
 *
 * Data source: TikTok Research API (mock data for now)
 * Note: Research API is separate from user data - it queries public TikTok content
 */

"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Hash,
  Music,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  AlertCircle,
} from "lucide-react";

// Components
import { TrendTable, TrendItem } from "../components/TrendTable";
import { TrendCard } from "../components/TrendCard";
import { RegionFilter } from "../components/RegionFilter";

// Charts
import { TrendVolumeChart } from "../charts/TrendVolumeChart";
import { TopItemsBarChart } from "../charts/TopItemsBarChart";
import { CategoryDistributionChart } from "../charts/CategoryDistributionChart";

// Mock Data
import {
  getMockHashtags,
  getMockSounds,
  getMockEffects,
  getMockTrendStats,
  getMockVolumeData,
  getMockCategoryDistribution,
  formatUsageCount,
  TrendingHashtag,
  TrendingSound,
  TrendingEffect,
} from "../data/mockTrendData";

// =============================================================================
// Types
// =============================================================================

type TrendSubTab = "hashtags" | "sounds" | "effects";

// =============================================================================
// Data Transformers
// =============================================================================

function hashtagsToTrendItems(hashtags: TrendingHashtag[]): TrendItem[] {
  return hashtags.map((h) => ({
    rank: h.rank,
    id: `hashtag-${h.name}`,
    name: h.name,
    usageCount: h.usageCount,
    change24h: h.change24h,
    change7d: h.change7d,
    sparklineData: h.sparklineData,
    category: h.category,
  }));
}

function soundsToTrendItems(sounds: TrendingSound[]): TrendItem[] {
  return sounds.map((s) => ({
    rank: s.rank,
    id: `sound-${s.musicId}`,
    name: s.title,
    subtitle: s.artist,
    usageCount: s.usageCount,
    change24h: s.change24h,
    change7d: s.change7d,
    sparklineData: s.sparklineData,
    category: s.genre,
  }));
}

function effectsToTrendItems(effects: TrendingEffect[]): TrendItem[] {
  return effects.map((e) => ({
    rank: e.rank,
    id: `effect-${e.effectId}`,
    name: e.name,
    usageCount: e.usageCount,
    change24h: e.change24h,
    change7d: e.change7d,
    sparklineData: e.sparklineData,
    category: e.category,
  }));
}

// =============================================================================
// Sub-Components
// =============================================================================

function ResearchApiNotice() {
  return (
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardContent className="py-3 px-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-600 dark:text-amber-400">
              Research API Data (Mock)
            </p>
            <p className="text-muted-foreground mt-0.5">
              This tab displays trending data from TikTok's Research API, which is separate
              from your personal account data. Currently showing mock data for demonstration.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LastUpdated({ timestamp }: { timestamp: string }) {
  const date = new Date(timestamp);
  const timeAgo = getTimeAgo(date);

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Clock className="h-3.5 w-3.5" />
      <span>Updated {timeAgo}</span>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// =============================================================================
// Main Component
// =============================================================================

export function TikTokTrendsTab() {
  const [activeSubTab, setActiveSubTab] = useState<TrendSubTab>("hashtags");
  const [selectedRegion, setSelectedRegion] = useState("GLOBAL");

  // Get mock data based on region
  const hashtags = useMemo(
    () => getMockHashtags(selectedRegion),
    [selectedRegion]
  );
  const sounds = useMemo(() => getMockSounds(selectedRegion), [selectedRegion]);
  const effects = useMemo(
    () => getMockEffects(selectedRegion),
    [selectedRegion]
  );
  const stats = useMemo(
    () => getMockTrendStats(selectedRegion),
    [selectedRegion]
  );
  const volumeData = useMemo(() => getMockVolumeData(30), []);

  // Get current tab data
  const currentData = useMemo(() => {
    switch (activeSubTab) {
      case "hashtags":
        return {
          items: hashtagsToTrendItems(hashtags),
          type: "hashtag" as const,
          categoryData: getMockCategoryDistribution("hashtag"),
          topItems: hashtags.slice(0, 10).map((h) => ({
            name: `#${h.name}`,
            value: h.usageCount,
          })),
        };
      case "sounds":
        return {
          items: soundsToTrendItems(sounds),
          type: "sound" as const,
          categoryData: getMockCategoryDistribution("sound"),
          topItems: sounds.slice(0, 10).map((s) => ({
            name: s.title,
            value: s.usageCount,
          })),
        };
      case "effects":
        return {
          items: effectsToTrendItems(effects),
          type: "effect" as const,
          categoryData: getMockCategoryDistribution("effect"),
          topItems: effects.slice(0, 10).map((e) => ({
            name: e.name,
            value: e.usageCount,
          })),
        };
    }
  }, [activeSubTab, hashtags, sounds, effects]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            TikTok Trends
          </h2>
          <p className="text-sm text-muted-foreground">
            Discover what's trending on TikTok right now
          </p>
        </div>
        <div className="flex items-center gap-3">
          <LastUpdated timestamp={stats.lastUpdated} />
          <RegionFilter
            value={selectedRegion}
            onChange={setSelectedRegion}
            className="w-[160px] sm:w-[200px]"
          />
        </div>
      </div>

      {/* Research API Notice */}
      <ResearchApiNotice />

      {/* Stats Cards - CoinMarketCap style top bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <TrendCard
          title="Hashtags Tracked"
          value={formatUsageCount(stats.totalHashtags)}
          icon={Hash}
        />
        <TrendCard
          title="Sounds Tracked"
          value={formatUsageCount(stats.totalSounds)}
          icon={Music}
        />
        <TrendCard
          title="Top Gainer (24h)"
          value={stats.topGainer.name}
          trend={{ value: stats.topGainer.change, label: "24h" }}
          icon={TrendingUp}
        />
        <TrendCard
          title="Top Loser (24h)"
          value={stats.topLoser.name}
          trend={{ value: stats.topLoser.change, label: "24h" }}
          icon={TrendingDown}
        />
      </div>

      {/* Sub-tab Navigation */}
      <Tabs
        value={activeSubTab}
        onValueChange={(v) => setActiveSubTab(v as TrendSubTab)}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger
            value="hashtags"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Hash className="h-4 w-4" />
            <span className="hidden sm:inline">Hashtags</span>
            <span className="sm:hidden">Tags</span>
          </TabsTrigger>
          <TabsTrigger
            value="sounds"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Music className="h-4 w-4" />
            <span>Sounds</span>
          </TabsTrigger>
          <TabsTrigger
            value="effects"
            className="flex items-center gap-2 text-xs sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>Effects</span>
          </TabsTrigger>
        </TabsList>

        {/* Hashtags Tab */}
        <TabsContent value="hashtags" className="mt-6 space-y-6">
          <HashtagsContent
            items={currentData.items}
            volumeData={volumeData}
            categoryData={currentData.categoryData}
            topItems={currentData.topItems}
          />
        </TabsContent>

        {/* Sounds Tab */}
        <TabsContent value="sounds" className="mt-6 space-y-6">
          <SoundsContent
            items={currentData.items}
            volumeData={volumeData}
            categoryData={currentData.categoryData}
            topItems={currentData.topItems}
          />
        </TabsContent>

        {/* Effects Tab */}
        <TabsContent value="effects" className="mt-6 space-y-6">
          <EffectsContent
            items={currentData.items}
            volumeData={volumeData}
            categoryData={currentData.categoryData}
            topItems={currentData.topItems}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// =============================================================================
// Tab Content Components
// =============================================================================

interface TabContentProps {
  items: TrendItem[];
  volumeData: { labels: string[]; data: number[] };
  categoryData: { labels: string[]; data: number[] };
  topItems: { name: string; value: number }[];
}

function HashtagsContent({
  items,
  volumeData,
  categoryData,
  topItems,
}: TabContentProps) {
  return (
    <>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <TrendVolumeChart
          labels={volumeData.labels}
          data={volumeData.data}
          title="Hashtag Volume (30 Days)"
          className="lg:col-span-2"
        />
        <CategoryDistributionChart
          labels={categoryData.labels}
          data={categoryData.data}
          title="Categories"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0 sm:p-2">
          <TrendTable items={items} type="hashtag" />
        </CardContent>
      </Card>

      {/* Top 10 Bar Chart */}
      <TopItemsBarChart items={topItems} title="Top 10 Hashtags by Usage" />
    </>
  );
}

function SoundsContent({
  items,
  volumeData,
  categoryData,
  topItems,
}: TabContentProps) {
  return (
    <>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <TrendVolumeChart
          labels={volumeData.labels}
          data={volumeData.data}
          title="Sound Usage (30 Days)"
          className="lg:col-span-2"
        />
        <CategoryDistributionChart
          labels={categoryData.labels}
          data={categoryData.data}
          title="Genres"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0 sm:p-2">
          <TrendTable items={items} type="sound" />
        </CardContent>
      </Card>

      {/* Top 10 Bar Chart */}
      <TopItemsBarChart items={topItems} title="Top 10 Sounds by Usage" />
    </>
  );
}

function EffectsContent({
  items,
  volumeData,
  categoryData,
  topItems,
}: TabContentProps) {
  return (
    <>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <TrendVolumeChart
          labels={volumeData.labels}
          data={volumeData.data}
          title="Effect Usage (30 Days)"
          className="lg:col-span-2"
        />
        <CategoryDistributionChart
          labels={categoryData.labels}
          data={categoryData.data}
          title="Categories"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0 sm:p-2">
          <TrendTable items={items} type="effect" />
        </CardContent>
      </Card>

      {/* Top 10 Bar Chart */}
      <TopItemsBarChart items={topItems} title="Top 10 Effects by Usage" />
    </>
  );
}
