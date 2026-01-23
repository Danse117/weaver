/**
 * CategoryDistributionChart Component
 *
 * Doughnut chart showing category/genre breakdown.
 * Used for visualizing distribution of trending items.
 */

"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useChartColors } from "@/app/(private)/components/dashboard/charts/chartConfig";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Register Chart.js components
ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface CategoryDistributionChartProps {
  labels: string[];
  data: number[];
  title?: string;
  className?: string;
}

export function CategoryDistributionChart({
  labels,
  data,
  title = "Category Distribution",
  className,
}: CategoryDistributionChartProps) {
  const colors = useChartColors();

  const chartColors = [
    colors.chart1,
    colors.chart2,
    colors.chart3,
    colors.chart4,
    colors.chart5,
    `${colors.chart1}99`,
    `${colors.chart2}99`,
    `${colors.chart3}99`,
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: chartColors,
        borderColor: colors.background,
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: colors.foreground,
          font: { size: 11 },
          padding: 12,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.border,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const value = context.raw as number;
            const total = context.dataset.data.reduce(
              (sum: number, val: number) => sum + val,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return ` ${context.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[250px]">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
