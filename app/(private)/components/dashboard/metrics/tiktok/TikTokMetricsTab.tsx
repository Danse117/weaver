/**
 * TikTok Metrics Tab Component
 *
 * Container for TikTok analytics with sub-tab navigation:
 * - Overview: Display API metrics (available to all users)
 * - Business Insights: Organic API metrics (requires Business account)
 *
 * All charts are displayed on a single scrollable page per sub-tab.
 */

"use client";

import { useState, useEffect } from "react";
import { fetchTikTokProfile } from "@/app/actions/tiktok";
import { TikTokProfileStats } from "./TikTokProfileStats";
import { TikTokOverviewTab } from "./TikTokOverviewTab";
import { TikTokBusinessInsightsTab } from "./TikTokBusinessInsightsTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WeaverLoaderWithText } from "@/components/ui/loader";
import { BarChart3, TrendingUp } from "lucide-react";

interface TikTokMetricsTabProps {
  accountId: string;
}

export function TikTokMetricsTab({ accountId }: TikTokMetricsTabProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [activeSubTab, setActiveSubTab] = useState("overview");

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
        <WeaverLoaderWithText size={48} text="Loading metrics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">TikTok Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Track your TikTok performance and engagement
        </p>
      </div>

      {/* Profile Stats Summary */}
      {data && <TikTokProfileStats user={data.user} stats={data.stats} />}

      {/* Sub-tab Navigation */}
      <Tabs
        value={activeSubTab}
        onValueChange={setActiveSubTab}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center gap-2 text-xs sm:text-sm">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2 text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Business Insights</span>
            <span className="sm:hidden">Business</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <TikTokOverviewTab accountId={accountId} profileData={data} />
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <TikTokBusinessInsightsTab accountId={accountId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
