/**
 * TrendSparkline Component
 *
 * Mini line chart for displaying 7-day trend data.
 * Styled similar to CoinMarketCap's sparkline charts.
 *
 * Features:
 * - Green line if trending up, red if down
 * - Minimal UI (no axes, labels, or grid)
 * - Smooth line with area fill
 */

"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

interface TrendSparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

export function TrendSparkline({
  data,
  width = 100,
  height = 32,
  className,
}: TrendSparklineProps) {
  // Determine if trending up or down
  const isUp = data.length >= 2 && data[data.length - 1] >= data[0];

  // Colors based on trend direction
  const lineColor = isUp ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)";
  const fillColor = isUp ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)";

  const chartData = {
    labels: data.map((_, i) => i.toString()),
    datasets: [
      {
        data: data,
        borderColor: lineColor,
        backgroundColor: fillColor,
        borderWidth: 1.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: {
        borderCapStyle: "round" as const,
      },
    },
  };

  return (
    <div className={className} style={{ width, height }}>
      <Line data={chartData} options={options} width={width} height={height} />
    </div>
  );
}
