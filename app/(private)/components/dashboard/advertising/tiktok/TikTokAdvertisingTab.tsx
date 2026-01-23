/**
 * TikTok Advertising Tab Component
 *
 * Displays Marketing API metrics for TikTok Ads:
 * - Spend and Revenue (4 charts)
 * - Traffic and Clicks (4 charts)
 * - Conversions (3 charts)
 * - Cost Metrics (4 charts)
 * - Video Ad Performance (3 charts)
 *
 * All 18 charts are shown on a single scrollable page.
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  Eye,
  Target,
  Percent,
  CreditCard,
  BarChart3,
  Play,
  CheckCircle,
  Zap,
  ArrowUpRight,
  Activity,
  PieChart,
} from "lucide-react";

interface TikTokAdvertisingTabProps {
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
  targetLine?: number;
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
// Spend and Revenue (4 Charts)
// ============================================================================

function AdSpendChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.adSpend(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart5, "Ad Spend"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const totalSpend = data.reduce((sum, d) => sum + d.value, 0);
  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Ad Spend"
      description="Daily advertising spend"
      icon={<DollarSign className="h-4 w-4" />}
      currentValue={`$${formatCompactNumber(latestValue)}`}
      badge={`$${formatCompactNumber(totalSpend)} total`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function RevenueChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      PLACEHOLDER_DATA.adSpend().map((d) => ({
        ...d,
        value: Math.round(d.value * 2.8), // ~2.8x ROAS average
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "Revenue"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const totalRevenue = data.reduce((sum, d) => sum + d.value, 0);
  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Revenue"
      description="Revenue attributed to ads"
      icon={<TrendingUp className="h-4 w-4" />}
      currentValue={`$${formatCompactNumber(latestValue)}`}
      badge={`$${formatCompactNumber(totalRevenue)} total`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ROASChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.roas(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "ROAS"),
        data: data.map((d) => d.value),
      },
      // Target line at 3.0
      {
        label: "Target (3.0x)",
        data: data.map(() => 3.0),
        borderColor: colors.muted,
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgROAS =
    data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="ROAS"
      description="Return on Ad Spend (Revenue / Spend)"
      icon={<Zap className="h-4 w-4" />}
      currentValue={`${latestValue.toFixed(2)}x`}
      change={{
        value: ((latestValue - 3) / 3) * 100,
        isPositive: latestValue >= 3,
      }}
      badge={`Avg: ${avgROAS.toFixed(2)}x`}
    >
      <Line
        data={chartData}
        options={{ ...getBaseChartOptions(colors, true) } as any}
      />
    </ChartCard>
  );
}

function SpendVsRevenueChart() {
  const colors = useChartColors();
  const multiColors = getMultiLineColors(colors);

  const spendData = useMemo(() => PLACEHOLDER_DATA.adSpend(), []);
  const revenueData = useMemo(
    () =>
      spendData.map((d) => ({
        ...d,
        value: Math.round(d.value * 2.8),
      })),
    [spendData]
  );

  const chartData = {
    labels: spendData.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(multiColors[4], "Spend", false),
        data: spendData.map((d) => d.value),
      },
      {
        ...getLineDatasetConfig(multiColors[1], "Revenue", false),
        data: revenueData.map((d) => d.value),
      },
    ],
  };

  return (
    <ChartCard
      title="Spend vs Revenue"
      description="Side-by-side comparison"
      icon={<BarChart3 className="h-4 w-4" />}
    >
      <Line
        data={chartData}
        options={{ ...getBaseChartOptions(colors, true) } as any}
      />
    </ChartCard>
  );
}

// ============================================================================
// Traffic and Clicks (4 Charts)
// ============================================================================

function AdImpressionsChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 450000, 0.25, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Impressions"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const totalImpressions = data.reduce((sum, d) => sum + d.value, 0);
  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Ad Impressions"
      description="Times your ads were shown"
      icon={<Eye className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
      badge={`${formatCompactNumber(totalImpressions)} total`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ClicksChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 12000, 0.3, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "Clicks"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const totalClicks = data.reduce((sum, d) => sum + d.value, 0);
  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Clicks"
      description="Ad clicks daily"
      icon={<MousePointerClick className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
      badge={`${formatCompactNumber(totalClicks)} total`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function CTRChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.ctr(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart3, "CTR"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgCTR = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="CTR"
      description="Click-Through Rate (Clicks / Impressions × 100)"
      icon={<Percent className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
      badge={`Avg: ${avgCTR.toFixed(2)}%`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ViewToClickRateChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 3.2, 0.2).map((d) => ({
        ...d,
        value: Math.min(8, Math.max(1, d.value)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "View-to-Click"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="View-to-Click Rate"
      description="% of ad viewers who clicked"
      icon={<ArrowUpRight className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

// ============================================================================
// Conversions (3 Charts)
// ============================================================================

function ConversionsChart() {
  const colors = useChartColors();
  const data = useMemo(
    () => generateTimeSeriesData(30, 380, 0.35, "up", true),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "Conversions"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const totalConversions = data.reduce((sum, d) => sum + d.value, 0);
  const latestValue = data[data.length - 1]?.value || 0;

  return (
    <ChartCard
      title="Conversions"
      description="Total attributed conversions"
      icon={<CheckCircle className="h-4 w-4" />}
      currentValue={formatCompactNumber(latestValue)}
      badge={`${formatCompactNumber(totalConversions)} total`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function ConversionRateChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 3.2, 0.2).map((d) => ({
        ...d,
        value: Math.min(8, Math.max(1, d.value)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "Conversion Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgRate = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="Conversion Rate"
      description="Conversions / Clicks × 100"
      icon={<Target className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
      badge={`Avg: ${avgRate.toFixed(2)}%`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function AttributionBreakdownChart() {
  const colors = useChartColors();

  const data = useMemo(
    () => [
      { label: "Click-Through", value: 68 },
      { label: "View-Through", value: 32 },
    ],
    []
  );

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: [`${colors.chart1}cc`, `${colors.chart4}cc`],
        borderColor: [colors.chart1, colors.chart4],
        borderWidth: 2,
      },
    ],
  };

  return (
    <ChartCard
      title="Attribution Breakdown"
      description="CTA vs VTA conversions"
      icon={<PieChart className="h-4 w-4" />}
    >
      <Doughnut data={chartData} options={getDoughnutOptions(colors) as any} />
    </ChartCard>
  );
}

// ============================================================================
// Cost Metrics (4 Charts)
// ============================================================================

function CPCChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 0.72, 0.15).map((d) => ({
        ...d,
        value: parseFloat((d.value / 10).toFixed(2)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart5, "CPC"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgCPC = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="CPC"
      description="Cost Per Click"
      icon={<CreditCard className="h-4 w-4" />}
      currentValue={`$${latestValue.toFixed(2)}`}
      badge={`Avg: $${avgCPC.toFixed(2)}`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function CPMChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 8.5, 0.2).map((d) => ({
        ...d,
        value: parseFloat((d.value / 2).toFixed(2)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart3, "CPM"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgCPM = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="CPM"
      description="Cost Per 1,000 Impressions"
      icon={<DollarSign className="h-4 w-4" />}
      currentValue={`$${latestValue.toFixed(2)}`}
      badge={`Avg: $${avgCPM.toFixed(2)}`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function CPAChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 22, 0.2).map((d) => ({
        ...d,
        value: Math.max(8, d.value),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart1, "CPA"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgCPA = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="CPA"
      description="Cost Per Acquisition"
      icon={<Target className="h-4 w-4" />}
      currentValue={`$${latestValue.toFixed(2)}`}
      badge={`Avg: $${avgCPA.toFixed(2)}`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function CostPerEngagementChart() {
  const colors = useChartColors();
  const data = useMemo(
    () =>
      generateTimeSeriesData(30, 0.035, 0.2).map((d) => ({
        ...d,
        value: parseFloat((d.value / 10).toFixed(3)),
      })),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart2, "CPE"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgCPE = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="Cost Per Engagement"
      description="Spend / Engagements"
      icon={<Activity className="h-4 w-4" />}
      currentValue={`$${latestValue.toFixed(3)}`}
      badge={`Avg: $${avgCPE.toFixed(3)}`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

// ============================================================================
// Video Ad Performance (3 Charts)
// ============================================================================

function VideoCompletionRateChart() {
  const colors = useChartColors();
  const data = useMemo(() => PLACEHOLDER_DATA.completionRate(), []);

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(colors.chart4, "Completion Rate"),
        data: data.map((d) => d.value),
      },
    ],
  };

  const latestValue = data[data.length - 1]?.value || 0;
  const avgRate = data.reduce((sum, d) => sum + d.value, 0) / data.length;

  return (
    <ChartCard
      title="Video Completion Rate"
      description="% who watched to 100%"
      icon={<Play className="h-4 w-4" />}
      currentValue={formatPercentage(latestValue)}
      badge={`Avg: ${avgRate.toFixed(1)}%`}
    >
      <Line data={chartData} options={getBaseChartOptions(colors) as any} />
    </ChartCard>
  );
}

function VideoWatchMilestonesChart() {
  const colors = useChartColors();
  const multiColors = getMultiLineColors(colors);
  const data = useMemo(() => PLACEHOLDER_DATA.videoMilestones(), []);

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: "Watch %",
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
      title="Video Watch Milestones"
      description="% of viewers at each milestone"
      icon={<BarChart3 className="h-4 w-4" />}
    >
      <Bar
        data={chartData}
        options={getHorizontalBarOptions(colors) as any}
      />
    </ChartCard>
  );
}

function AdEngagementChart() {
  const colors = useChartColors();
  const multiColors = getMultiLineColors(colors);

  const data = useMemo(
    () =>
      generateMultiSeriesData(30, [
        { key: "likes", base: 4500, variance: 0.3 },
        { key: "comments", base: 320, variance: 0.4 },
        { key: "shares", base: 180, variance: 0.45 },
      ]),
    []
  );

  const chartData = {
    labels: data.map((d) => formatDateLabel(d.date)),
    datasets: [
      {
        ...getLineDatasetConfig(multiColors[0], "Likes", false),
        data: data.map((d) => d.likes as number),
      },
      {
        ...getLineDatasetConfig(multiColors[1], "Comments", false),
        data: data.map((d) => d.comments as number),
      },
      {
        ...getLineDatasetConfig(multiColors[2], "Shares", false),
        data: data.map((d) => d.shares as number),
      },
    ],
  };

  return (
    <ChartCard
      title="Ad Engagement"
      description="Likes, comments, shares on ads"
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
// Main Component
// ============================================================================

export function TikTokAdvertisingTab({ accountId }: TikTokAdvertisingTabProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          TikTok Advertising
        </h2>
        <p className="text-sm text-muted-foreground">
          Track your TikTok ad campaigns performance
        </p>
      </div>

      {/* Marketing API Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">TikTok Ads Manager Required</p>
              <p className="text-sm text-muted-foreground">
                Connect your TikTok Ads Manager account to see real advertising
                data. Currently showing placeholder data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section: Spend and Revenue */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Spend & Revenue</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4">
          <AdSpendChart />
          <RevenueChart />
          <ROASChart />
          <SpendVsRevenueChart />
        </div>
      </div>

      {/* Section: Traffic and Clicks */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Traffic & Clicks</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4">
          <AdImpressionsChart />
          <ClicksChart />
          <CTRChart />
          <ViewToClickRateChart />
        </div>
      </div>

      {/* Section: Conversions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Conversions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
          <ConversionsChart />
          <ConversionRateChart />
          <AttributionBreakdownChart />
        </div>
      </div>

      {/* Section: Cost Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Cost Metrics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4">
          <CPCChart />
          <CPMChart />
          <CPAChart />
          <CostPerEngagementChart />
        </div>
      </div>

      {/* Section: Video Ad Performance */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Video Ad Performance</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
          <VideoCompletionRateChart />
          <VideoWatchMilestonesChart />
          <AdEngagementChart />
        </div>
      </div>
    </div>
  );
}
