/**
 * TopItemsBarChart Component
 *
 * Horizontal bar chart showing top 10 trending items.
 * Used for hashtags, sounds, or effects rankings.
 */

"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useChartColors } from "@/app/(private)/components/dashboard/charts/chartConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUsageCount } from "../data/mockTrendData";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TopItemsBarChartProps {
  items: { name: string; value: number }[];
  title?: string;
  className?: string;
}

export function TopItemsBarChart({
  items,
  title = "Top 10",
  className,
}: TopItemsBarChartProps) {
  const colors = useChartColors();

  // Take top 10 and reverse for horizontal bar (top item at top)
  const top10 = items.slice(0, 10);
  const reversed = [...top10].reverse();

  const chartData = {
    labels: reversed.map((item) => item.name),
    datasets: [
      {
        label: "Usage",
        data: reversed.map((item) => item.value),
        backgroundColor: [
          colors.chart1,
          colors.chart2,
          colors.chart3,
          colors.chart4,
          colors.chart5,
          `${colors.chart1}CC`,
          `${colors.chart2}CC`,
          `${colors.chart3}CC`,
          `${colors.chart4}CC`,
          `${colors.chart5}CC`,
        ].reverse(),
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.border,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `Usage: ${formatUsageCount(context.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: `${colors.border}50`,
          drawBorder: false,
        },
        ticks: {
          color: colors.muted,
          font: { size: 11 },
          callback: (value: number | string) => {
            const num = typeof value === "number" ? value : parseFloat(value);
            return formatUsageCount(num);
          },
        },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: colors.foreground,
          font: { size: 11 },
        },
        border: { display: false },
      },
    },
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[350px]">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
