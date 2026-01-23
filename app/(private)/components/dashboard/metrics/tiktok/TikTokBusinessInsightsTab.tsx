/**
 * TikTok Business Insights Tab Component
 *
 * Displays Organic API metrics (requires TikTok Business Account):
 * - Daily Profile Metrics (7 charts)
 * - Watch Time and Retention (5 charts)
 * - Reach and Impressions (5 charts)
 * - Conversion and Growth (5 charts)
 * - Demographics (2 charts)
 *
 * All 24 charts are shown on a single scrollable page.
 */

"use client";

import { useMemo } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useChartColors,
  getBaseChartOptions,
  getLineDatasetConfig,
  getMultiLineColors,
  getDoughnutOptions,
  getHorizontalBarOptions,
  PLACEHOLDER_DATA,
  generateTimeSeriesData,
  generateMultiSeriesData,
  formatDateLabel,
  formatCompactNumber,
  formatPercentage,
} from "../../charts/chartConfig";
import {
  Users,
  UserPlus,
  Eye,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Timer,
  Target,
  TrendingUp,
  BarChart3,
  Globe,
  Sparkles,
  Zap,
  ArrowUpRight,
  Activity,
} from "lucide-react";

interface TikTokBusinessInsightsTabProps {
  accountId: string;
}

// ============================================================================
// Shared Chart Card Component
// ============================================================================

interface ChartCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  currentValue?: string;
  change?: { value: number; isPositive: boolean };
  badge?: string;
}

function ChartCard({
  title,
  description,
  icon,
  children,
  currentValue,
  change,
  badge,
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
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm sm:text-base font-semibold truncate">
                  {title}
                </CardTitle>
                {badge && (
                  <Badge variant="secondary" className="text-[10px] sm:text-xs shrink-0">
                    {badge}
                  </Badge>
                )}
              </div>
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
// Daily Profile Metrics (7 Charts)
// ============================================================================

function DailyFollowersChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.followers(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Daily Followers"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Daily Followers"
      description="Total follower count each day"
      icon={<Users className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function NewFollowersChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 450, 0.4, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "New Followers"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const totalNew = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ChartCard
      title="New Followers"
      description="New followers gained daily"
      icon={<UserPlus className="h-4 w-4" />}
      currentValue={formatCompactNumber(totalNew)}
      badge="30d total"
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ProfileViewsChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 12000, 0.3, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart3, "Profile Views"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Profile Views"
      description="Daily profile page visits"
      icon={<Eye className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function VideoViewsChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.videoViews(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "Video Views"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Video Views"
      description="Daily video views across all content"
      icon={<Play className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function TotalEngagementChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      PLACEHOLDER_DATA.likes().map((d) => ({
        ...d,
        value: Math.round(d.value * 1.3), // Total engagement > just likes
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart5, "Total Engagement"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Total Engagement"
      description="Combined likes, comments, shares"
      icon={<Heart className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function EngagementBreakdownChart() {
  const colors = useChartColors();
  const multiColors = getMultiLineColors(colors);

  const data = useMemo(
    () =>
      generateMultiSeriesData(30, [
        { key: "likes", base: 20000, variance: 0.25 },
        { key: "comments", base: 1500, variance: 0.35 },
        { key: "shares", base: 600, variance: 0.4 },
      ]),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(multiColors[0], "Likes"),
        data: data.map((d) => d.likes as number),
        fill: true,
      },
      {
        ...getLineDatasetConfig(multiColors[1], "Comments"),
        data: data.map((d) => d.comments as number),
        fill: true,
      },
      {
        ...getLineDatasetConfig(multiColors[2], "Shares"),
        data: data.map((d) => d.shares as number),
        fill: true,
      },
    ],
  };

  return (
    <ChartCard
      title="Engagement Breakdown"
      description="Stacked view of engagement types"
      icon={<BarChart3 className="h-4 w-4" />}
      badge="Stacked"
    >
      <Line
        data={chartData}
        options={{ ...getBaseChartOptions(colors, true), ...(({ plugins: { ...getBaseChartOptions(colors, true).plugins, legend: { ...getBaseChartOptions(colors, true).plugins?.legend, display: true } } }) as any) }}
      />
    </ChartCard>
  );
}

function EngagementRatesChart() {
  const colors = useChartColors();
  const multiColors = getMultiLineColors(colors);

  const data = useMemo(
    () =>
      generateMultiSeriesData(30, [
        { key: "likeRate", base: 5, variance: 0.15 },
        { key: "commentRate", base: 0.4, variance: 0.2 },
        { key: "shareRate", base: 0.15, variance: 0.25 },
      ]),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(multiColors[0], "Like Rate", false),
        data: data.map((d) => d.likeRate as number),
      },
      {
        ...getLineDatasetConfig(multiColors[1], "Comment Rate", false),
        data: data.map((d) => d.commentRate as number),
      },
      {
        ...getLineDatasetConfig(multiColors[2], "Share Rate", false),
        data: data.map((d) => d.shareRate as number),
      },
    ],
  };

  return (
    <ChartCard
      title="Engagement Rates"
      description="Like, comment, and share rates (%)"
      icon={<Activity className="h-4 w-4" />}
    >
      <Line
        data={chartData}
        options={{ ...getBaseChartOptions(colors, true) } as any}
      />
    </ChartCard>
  );
}

// ============================================================================
// Watch Time and Retention (5 Charts)
// ============================================================================

function AverageWatchTimeChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.watchTime(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart3, "Avg Watch Time"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Average Watch Time"
      description="Mean seconds watched per view"
      icon={<Clock className="h-4 w-4" />}
      currentValue={`${latestValue}s`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function TotalWatchHoursChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 850, 0.2, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Watch Hours"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const totalHours = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ChartCard
      title="Total Watch Hours"
      description="Cumulative watch time in hours"
      icon={<Timer className="h-4 w-4" />}
      currentValue={formatCompactNumber(totalHours)}
      badge="30d total"
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function CompletionRateChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.completionRate(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "Completion Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Completion Rate"
      description="% of viewers who watch full video"
      icon={<Target className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function RetentionScoreChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      PLACEHOLDER_DATA.completionRate().map((d) => ({
        ...d,
        value: Math.round(d.value * 1.2 + 15), // Retention score formula
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "Retention Score"),
        data: data.map((d) => Math.min(100, d.value)),
      },
    ],
  };

  const latestValue = Math.min(100, data[data.length - 1]?.value || 0);

  return (
    <ChartCard
      title="Retention Score"
      description="Weighted retention metric (0-100)"
      icon={<Sparkles className="h-4 w-4" />}
      currentValue={latestValue.toString()}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function AvgWatchPercentageChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 62, 0.1).map((d) => ({
        ...d,
        value: Math.min(100, d.value),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart5, "Watch %"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Avg Watch Percentage"
      description="Average % of video watched"
      icon={<BarChart3 className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

// ============================================================================
// Reach and Impressions (5 Charts)
// ============================================================================

function ReachChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 95000, 0.25, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Reach"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Reach"
      description="Unique viewers daily"
      icon={<Users className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ImpressionsChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 250000, 0.3, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "Impressions"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Impressions"
      description="Total times content was shown"
      icon={<Eye className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function AccountsEngagedChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 8500, 0.25, "stable", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart3, "Accounts Engaged"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Accounts Engaged"
      description="Unique accounts that engaged daily"
      icon={<Heart className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ReachRateChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 75, 0.1).map((d) => ({
        ...d,
        value: Math.min(100, d.value),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "Reach Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Reach Rate"
      description="Reach / Followers × 100"
      icon={<TrendingUp className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ImpressionsToViewsChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 68, 0.12).map((d) => ({
        ...d,
        value: Math.min(100, d.value),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart5, "View Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Impressions to Views"
      description="Views / Impressions × 100"
      icon={<ArrowUpRight className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

// ============================================================================
// Conversion and Growth (5 Charts)
// ============================================================================

function ProfileVisitRateChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.profileVisitRate(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Profile Visit Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Profile Visit Rate"
      description="Profile Views / Video Views × 100"
      icon={<Eye className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function FollowerConversionChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 3.5, 0.2).map((d) => ({
        ...d,
        value: Math.min(15, Math.max(1, d.value)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "Conversion Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Follower Conversion"
      description="New Followers / Profile Views × 100"
      icon={<UserPlus className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function EngagementPerFollowerChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 0.18, 0.15).map((d) => ({
        ...d,
        value: parseFloat((d.value / 10).toFixed(3)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart3, "Engagement/Follower"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Engagement/Follower"
      description="Total Engagement / Followers"
      icon={<Zap className="h-4 w-4" />}
      currentValue={latestValue.toFixed(3)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ViralityCoefficientChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 28, 0.2).map((d) => ({
        ...d,
        value: Math.min(80, Math.max(5, d.value)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "Virality"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Virality Coefficient"
      description="Non-follower views as % of total"
      icon={<Sparkles className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function FollowerGrowthVelocityChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 2.5, 0.4, "stable").map((d) => ({
        ...d,
        value: Math.max(-5, Math.min(10, d.value - 2)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart5, "Growth Velocity"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Growth Velocity"
      description="Change in growth rate (%)"
      icon={<TrendingUp className="h-4 w-4" />}
      currentValue={`${latestValue >= 0 ? "+" : ""}${latestValue.toFixed(1)}%`}
      change={{ value: latestValue, isPositive: latestValue >= 0 }}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

// ============================================================================
// Demographics (2 Charts)
// ============================================================================

function AudienceByCountryChart() {
  const colors = useChartColors();
  const multiColors = getMultiLineColors(colors);
  const data = useMemo(() => PLACEHOLDER_DATA.countries(), []);

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: "Audience %",
        data: data.map((d) => d.value),
        backgroundColor: multiColors.map((c) => `${c}cc`),
        borderColor: multiColors,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <ChartCard
      title="Audience by Country"
      description="Top countries by follower %"
      icon={<Globe className="h-4 w-4" />}
      badge="Top 10"
    >
      <Bar
        data={chartData}
        options={getHorizontalBarOptions(colors) as any}
      />
    </ChartCard>
  );
}

function AudienceByGenderChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.gender(), []);

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: [
          `${colors.chart4}cc`,
          `${colors.chart1}cc`,
          `${colors.chart3}cc`,
        ],
        borderColor: [colors.chart4, colors.chart1, colors.chart3],
        borderWidth: 2,
      },
    ],
  };

  return (
    <ChartCard
      title="Audience by Gender"
      description="Gender distribution of followers"
      icon={<Users className="h-4 w-4" />}
    >
      <Doughnut data={chartData} options={getDoughnutOptions(colors) as any} />
    </ChartCard>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function TikTokBusinessInsightsTab({
  accountId,
}: TikTokBusinessInsightsTabProps) {
  return (
    <div className="space-y-8">
      {/* Business Account Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Business Account Required</p>
              <p className="text-sm text-muted-foreground">
                These advanced insights are available for TikTok Business
                accounts. Connect a Business account to see real data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section: Daily Profile Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Daily Profile Metrics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          <DailyFollowersChart />
          <NewFollowersChart />
          <ProfileViewsChart />
          <VideoViewsChart />
          <TotalEngagementChart />
          <EngagementBreakdownChart />
          <EngagementRatesChart />
        </div>
      </div>

      {/* Section: Watch Time and Retention */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Watch Time & Retention</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
          <AverageWatchTimeChart />
          <TotalWatchHoursChart />
          <CompletionRateChart />
          <RetentionScoreChart />
          <AvgWatchPercentageChart />
        </div>
      </div>

      {/* Section: Reach and Impressions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Reach & Impressions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
          <ReachChart />
          <ImpressionsChart />
          <AccountsEngagedChart />
          <ReachRateChart />
          <ImpressionsToViewsChart />
        </div>
      </div>

      {/* Section: Conversion and Growth */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Conversion & Growth</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5">
          <ProfileVisitRateChart />
          <FollowerConversionChart />
          <EngagementPerFollowerChart />
          <ViralityCoefficientChart />
          <FollowerGrowthVelocityChart />
        </div>
      </div>

      {/* Section: Demographics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Demographics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-2">
          <AudienceByCountryChart />
          <AudienceByGenderChart />
        </div>
      </div>
    </div>
  );
}
