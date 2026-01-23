/**
 * TikTok Overview Tab Component
 *
 * Displays Display API metrics (available to ALL TikTok users):
 * - Profile Growth: Followers, Total Likes, Video Count
 * - Calculated Metrics: Engagement Rate, Avg Engagement/Post, Performance Score
 *
 * All 6 charts are shown on a single scrollable page.
 */

"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useChartColors,
  getBaseChartOptions,
  getLineDatasetConfig,
  PLACEHOLDER_DATA,
  formatDateLabel,
  formatCompactNumber,
  formatPercentage,
} from "../../charts/chartConfig";
import { Users, Heart, Video, TrendingUp, BarChart, Zap } from "lucide-react";

interface TikTokOverviewTabProps {
  accountId: string;
  profileData?: any;
}

// ============================================================================
// Chart Components
// ============================================================================

interface ChartCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  currentValue?: string;
  change?: { value: number; isPositive: boolean };
}

function ChartCard({
  title,
  description,
  icon,
  children,
  currentValue,
  change,
}: ChartCardProps) {
  return (
    <Card className="overflow-hidden min-w-0">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              {icon}
            </div>
            <div className="min-w-0">
              <CardTitle className="text-sm sm:text-base font-semibold truncate">{title}</CardTitle>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{description}</p>
            </div>
          </div>
          {currentValue && (
            <div className="text-left sm:text-right shrink-0">
              <p className="text-xl sm:text-2xl font-bold">{currentValue}</p>
              {change && (
                <p
                  className={`text-[10px] sm:text-xs ${
                    change.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {change.isPositive ? "+" : ""}
                  {change.value.toFixed(1)}%
                </p>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-2 px-3 sm:px-6">
        <div className="h-40 sm:h-48">{children}</div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// Individual Chart Components
// ============================================================================

function FollowerGrowthChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.followers(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Followers"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || latestValue;
  const changePercent = ((latestValue - previousValue) / previousValue) * 100;

  return (
    <ChartCard
      title="Follower Growth"
      description="Total followers over time"
      icon={<Users className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
      change={{ value: changePercent, isPositive: changePercent >= 0 }}
    >
      <Line
        data={chartData}
        options={getBaseChartOptions(colors) as any}
      />
    </ChartCard>
  );
}

function TotalLikesChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      PLACEHOLDER_DATA.followers().map((d) => ({
        ...d,
        value: Math.round(d.value * 8.5), // Likes typically ~8-10x followers
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart5, "Total Likes"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || latestValue;
  const changePercent = ((latestValue - previousValue) / previousValue) * 100;

  return (
    <ChartCard
      title="Total Likes"
      description="Cumulative likes across all videos"
      icon={<Heart className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
      change={{ value: changePercent, isPositive: changePercent >= 0 }}
    >
      <Line
        data={chartData}
        options={getBaseChartOptions(colors) as any}
      />
    </ChartCard>
  );
}

function VideoCountChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      PLACEHOLDER_DATA.followers().map((d, i) => ({
        ...d,
        value: 45 + Math.floor(i / 3), // Gradual video count increase
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "Videos"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || latestValue;
  const changePercent = ((latestValue - previousValue) / previousValue) * 100;

  return (
    <ChartCard
      title="Video Count"
      description="Total published videos"
      icon={<Video className="h-4 w-4" />}
      currentValue={latestValue.toString()}
      change={{ value: changePercent, isPositive: changePercent >= 0 }}
    >
      <Line
        data={chartData}
        options={getBaseChartOptions(colors) as any}
      />
    </ChartCard>
  );
}

function EngagementRateChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.engagementRate(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "Engagement Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const options = {
    ...getBaseChartOptions(colors),
    scales: {
      ...getBaseChartOptions(colors).scales,
      y: {
        ...getBaseChartOptions(colors).scales?.y,
        ticks: {
          ...getBaseChartOptions(colors).scales?.y?.ticks,
          callback: (value: number | string) => `${value}%`,
        },
      },
    },
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || latestValue;
  const changePercent = ((latestValue - previousValue) / previousValue) * 100;

  return (
    <ChartCard
      title="Engagement Rate"
      description="(Likes + Comments + Shares) / Views × 100"
      icon={<TrendingUp className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
      change={{ value: changePercent, isPositive: changePercent >= 0 }}
    >
      <Line data={chartData} options={options as any} />
    </ChartCard>
  );
}

function AvgEngagementPerPostChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      PLACEHOLDER_DATA.likes().map((d) => ({
        ...d,
        value: Math.round(d.value / 45), // Average per video
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart3, "Avg Engagement"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || latestValue;
  const changePercent = ((latestValue - previousValue) / previousValue) * 100;

  return (
    <ChartCard
      title="Avg Engagement/Post"
      description="Average engagement per video"
      icon={<BarChart className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
      change={{ value: changePercent, isPositive: changePercent >= 0 }}
    >
      <Line
        data={chartData}
        options={getBaseChartOptions(colors) as any}
      />
    </ChartCard>
  );
}

function PerformanceScoreChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      PLACEHOLDER_DATA.engagementRate().map((d) => ({
        ...d,
        // Score: (engagement_rate * 0.5) + (views/followers * 0.3) + (share_rate * 0.2)
        value: Math.round(d.value * 10 + Math.random() * 15 + 30),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Performance Score"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const options = {
    ...getBaseChartOptions(colors),
    scales: {
      ...getBaseChartOptions(colors).scales,
      y: {
        ...getBaseChartOptions(colors).scales?.y,
        min: 0,
        max: 100,
      },
    },
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const previousValue = data[0]?.value || latestValue;
  const changePercent = ((latestValue - previousValue) / previousValue) * 100;

  return (
    <ChartCard
      title="Performance Score"
      description="Weighted performance metric (0-100)"
      icon={<Zap className="h-4 w-4" />}
      currentValue={latestValue.toString()}
      change={{ value: changePercent, isPositive: changePercent >= 0 }}
    >
      <Line data={chartData} options={options as any} />
    </ChartCard>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function TikTokOverviewTab({ accountId, profileData }: TikTokOverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Section: Profile Growth */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Profile Growth</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
          <FollowerGrowthChart />
          <TotalLikesChart />
          <VideoCountChart />
        </div>
      </div>

      {/* Section: Calculated Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Calculated Metrics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
          <EngagementRateChart />
          <AvgEngagementPerPostChart />
          <PerformanceScoreChart />
        </div>
      </div>
    </div>
  );
}
