/**
 * TrendVolumeChart Component
 *
 * Line chart showing trend volume over 30 days.
 * Used to visualize overall trending activity.
 */

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useChartColors } from "@/app/(private)/components/dashboard/charts/chartConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TrendVolumeChartProps {
  labels: string[];
  data: number[];
  title?: string;
  className?: string;
}

export function TrendVolumeChart({
  labels,
  data,
  title = "Trending Volume (30 Days)",
  className,
}: TrendVolumeChartProps) {
  const colors = useChartColors();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Volume",
        data,
        borderColor: colors.chart1,
        backgroundColor: `${colors.chart1}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: colors.chart1,
        pointHoverBorderColor: colors.background,
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
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
            const value = context.raw as number;
            return `Volume: ${(value / 1_000_000).toFixed(1)}M`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: colors.muted,
          maxTicksLimit: 7,
          font: { size: 11 },
        },
        border: { display: false },
      },
      y: {
        grid: {
          color: `${colors.border}50`,
          drawBorder: false,
        },
        ticks: {
          color: colors.muted,
          font: { size: 11 },
          callback: (value: number | string) => {
            const num = typeof value === "number" ? value : parseFloat(value);
            return `${(num / 1_000_000).toFixed(0)}M`;
          },
        },
        border: { display: false },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[250px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
