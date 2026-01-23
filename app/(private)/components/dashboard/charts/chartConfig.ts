/**
 * Chart.js Configuration and Utilities
 *
 * Provides centralized Chart.js setup including:
 * - Component registration for all chart types
 * - Theme-aware color hooks (light/dark mode)
 * - Placeholder data generators for development
 * - Common chart options presets
 */

"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { useState, useEffect, useCallback } from "react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ============================================================================
// Types
// ============================================================================

export interface ChartColors {
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  foreground: string;
  muted: string;
  border: string;
  background: string;
  gridOpacity: number;
  tooltipBg: string;
  tooltipText: string;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

export interface MultiSeriesDataPoint {
  date: string;
  [key: string]: string | number;
}

// ============================================================================
// Color Palette
// ============================================================================

/**
 * Semantic color mapping for different metric types
 */
export const CHART_SEMANTIC_COLORS = {
  followers: "chart1",
  engagement: "chart2",
  watchTime: "chart3",
  revenue: "chart4",
  alerts: "chart5",
} as const;

/**
 * Pre-defined gradients for area fills
 */
export const createGradient = (
  ctx: CanvasRenderingContext2D,
  color: string,
  height: number
) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `${color}80`); // 50% opacity
  gradient.addColorStop(1, `${color}00`); // 0% opacity
  return gradient;
};

// ============================================================================
// Theme Hook
// ============================================================================

/**
 * Hook to get theme-aware chart colors
 * Reads CSS variables and updates on theme change
 */
export function useChartColors(): ChartColors {
  const [colors, setColors] = useState<ChartColors>({
    chart1: "#3b82f6",
    chart2: "#22c55e",
    chart3: "#6366f1",
    chart4: "#f59e0b",
    chart5: "#ef4444",
    foreground: "#111827",
    muted: "#6b7280",
    border: "#e5e7eb",
    background: "#ffffff",
    gridOpacity: 0.1,
    tooltipBg: "#ffffff",
    tooltipText: "#111827",
  });

  const updateColors = useCallback(() => {
    if (typeof window === "undefined") return;

    const style = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.classList.contains("dark");

    // Helper to convert oklch to usable color (CSS handles this)
    const getColor = (varName: string, fallback: string) => {
      const value = style.getPropertyValue(varName).trim();
      return value || fallback;
    };

    setColors({
      chart1: getColor("--chart-1", isDark ? "#818cf8" : "#3b82f6"),
      chart2: getColor("--chart-2", isDark ? "#34d399" : "#22c55e"),
      chart3: getColor("--chart-3", isDark ? "#fbbf24" : "#6366f1"),
      chart4: getColor("--chart-4", isDark ? "#a78bfa" : "#f59e0b"),
      chart5: getColor("--chart-5", isDark ? "#f87171" : "#ef4444"),
      foreground: getColor("--foreground", isDark ? "#f9fafb" : "#111827"),
      muted: getColor("--muted-foreground", isDark ? "#9ca3af" : "#6b7280"),
      border: getColor("--border", isDark ? "#374151" : "#e5e7eb"),
      background: getColor("--background", isDark ? "#111827" : "#ffffff"),
      gridOpacity: isDark ? 0.15 : 0.1,
      tooltipBg: isDark ? "#1f2937" : "#ffffff",
      tooltipText: isDark ? "#f9fafb" : "#111827",
    });
  }, []);

  useEffect(() => {
    updateColors();

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [updateColors]);

  return colors;
}

// ============================================================================
// Placeholder Data Generators
// ============================================================================

/**
 * Generate time series data with realistic patterns
 */
export function generateTimeSeriesData(
  days: number,
  baseValue: number,
  variance: number,
  trend: "up" | "down" | "stable" = "stable",
  seasonality: boolean = false
): TimeSeriesDataPoint[] {
  const data: TimeSeriesDataPoint[] = [];
  const today = new Date();

  let currentValue = baseValue;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Apply trend
    const trendFactor =
      trend === "up" ? 1.002 : trend === "down" ? 0.998 : 1;
    currentValue *= trendFactor;

    // Add random variance
    const randomVariance = (Math.random() - 0.5) * 2 * variance * baseValue;

    // Add weekly seasonality (weekends slightly different)
    let seasonalFactor = 1;
    if (seasonality) {
      const dayOfWeek = date.getDay();
      seasonalFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 1.15 : 1;
    }

    const value = Math.max(
      0,
      Math.round((currentValue + randomVariance) * seasonalFactor)
    );

    data.push({
      date: date.toISOString().split("T")[0],
      value,
    });
  }

  return data;
}

/**
 * Generate percentage-based time series (0-100)
 */
export function generatePercentageData(
  days: number,
  basePercent: number,
  variance: number
): TimeSeriesDataPoint[] {
  return generateTimeSeriesData(days, basePercent, variance).map((d) => ({
    ...d,
    value: Math.min(100, Math.max(0, d.value)),
  }));
}

/**
 * Generate multi-series data for stacked/multi-line charts
 */
export function generateMultiSeriesData(
  days: number,
  series: { key: string; base: number; variance: number }[]
): MultiSeriesDataPoint[] {
  const data: MultiSeriesDataPoint[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const point: MultiSeriesDataPoint = {
      date: date.toISOString().split("T")[0],
    };

    series.forEach((s) => {
      const randomVariance = (Math.random() - 0.5) * 2 * s.variance * s.base;
      point[s.key] = Math.max(0, Math.round(s.base + randomVariance));
    });

    data.push(point);
  }

  return data;
}

/**
 * Generate demographic distribution data
 */
export function generateDemographicData(
  categories: string[],
  distribution: "power" | "even" | "normal" = "power"
): { category: string; value: number }[] {
  let values: number[];

  switch (distribution) {
    case "power":
      // Power law distribution (first few items dominate)
      values = categories.map((_, i) =>
        Math.round(1000 / Math.pow(i + 1, 1.5))
      );
      break;
    case "even":
      // Roughly even distribution
      const base = 100 / categories.length;
      values = categories.map(() =>
        Math.round(base + (Math.random() - 0.5) * base * 0.4)
      );
      break;
    case "normal":
      // Normal distribution centered in middle
      const mid = categories.length / 2;
      values = categories.map((_, i) => {
        const distance = Math.abs(i - mid);
        return Math.round(100 * Math.exp(-(distance * distance) / 4));
      });
      break;
  }

  // Normalize to percentages
  const total = values.reduce((a, b) => a + b, 0);
  return categories.map((category, i) => ({
    category,
    value: Math.round((values[i] / total) * 100),
  }));
}

// ============================================================================
// Preset Placeholder Data
// ============================================================================

export const PLACEHOLDER_DATA = {
  // Followers: 10K-500K range with growth
  followers: () =>
    generateTimeSeriesData(30, 125000, 0.01, "up", true),

  // Engagement rate: 3-9%
  engagementRate: () =>
    generatePercentageData(30, 5.5, 0.15),

  // Watch time: 8-25 seconds
  watchTime: () =>
    generateTimeSeriesData(30, 15, 0.2),

  // Completion rate: 25-55%
  completionRate: () =>
    generatePercentageData(30, 38, 0.12),

  // Profile visit rate: 5-15%
  profileVisitRate: () =>
    generatePercentageData(30, 9, 0.2),

  // Daily video views: 50K-500K
  videoViews: () =>
    generateTimeSeriesData(30, 180000, 0.25, "up", true),

  // Likes per day: 5K-50K
  likes: () =>
    generateTimeSeriesData(30, 22000, 0.3, "stable", true),

  // Comments per day: 500-5000
  comments: () =>
    generateTimeSeriesData(30, 1800, 0.35, "stable", true),

  // Shares per day: 200-2000
  shares: () =>
    generateTimeSeriesData(30, 650, 0.4, "stable", true),

  // Ad ROAS: 1.5-4.5
  roas: () =>
    generateTimeSeriesData(30, 2.8, 0.15).map((d) => ({
      ...d,
      value: parseFloat((d.value / 10).toFixed(2)),
    })),

  // Ad spend: $100-$5000/day
  adSpend: () =>
    generateTimeSeriesData(30, 850, 0.2),

  // CTR: 1-5%
  ctr: () =>
    generatePercentageData(30, 2.4, 0.2),

  // Countries (top 10)
  countries: () =>
    generateDemographicData(
      ["US", "UK", "Brazil", "India", "Germany", "France", "Canada", "Australia", "Mexico", "Spain"],
      "power"
    ),

  // Gender split
  gender: () =>
    generateDemographicData(["Female", "Male", "Other"], "even"),

  // Video milestones
  videoMilestones: () => [
    { category: "2 seconds", value: 95 },
    { category: "25%", value: 72 },
    { category: "50%", value: 48 },
    { category: "75%", value: 31 },
    { category: "100%", value: 18 },
  ],
};

// ============================================================================
// Chart Options Presets
// ============================================================================

/**
 * Get base chart options with theme support
 */
export function getBaseChartOptions(
  colors: ChartColors,
  showLegend: boolean = false
): ChartOptions<"line" | "bar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "top" as const,
        labels: {
          color: colors.foreground,
          usePointStyle: true,
          padding: 16,
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
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          color: `rgba(128, 128, 128, ${colors.gridOpacity})`,
          drawTicks: false,
        },
        ticks: {
          color: colors.muted,
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 7,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: `rgba(128, 128, 128, ${colors.gridOpacity})`,
          drawTicks: false,
        },
        ticks: {
          color: colors.muted,
          padding: 8,
        },
        border: {
          display: false,
        },
      },
    },
  };
}

/**
 * Get line chart dataset config with gradient fill
 */
export function getLineDatasetConfig(
  color: string,
  label: string,
  fill: boolean = true
) {
  return {
    label,
    borderColor: color,
    backgroundColor: fill ? `${color}40` : "transparent",
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 6,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: "#fff",
    pointHoverBorderWidth: 2,
    tension: 0.4,
    fill,
  };
}

/**
 * Get multi-line chart colors
 */
export function getMultiLineColors(colors: ChartColors): string[] {
  return [
    colors.chart1,
    colors.chart2,
    colors.chart3,
    colors.chart4,
    colors.chart5,
  ];
}

/**
 * Get doughnut/pie chart options
 */
export function getDoughnutOptions(colors: ChartColors): ChartOptions<"doughnut"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
        labels: {
          color: colors.foreground,
          usePointStyle: true,
          padding: 16,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
  };
}

/**
 * Get horizontal bar chart options
 */
export function getHorizontalBarOptions(colors: ChartColors): ChartOptions<"bar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: colors.tooltipText,
        bodyColor: colors.tooltipText,
        borderColor: colors.border,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          color: `rgba(128, 128, 128, ${colors.gridOpacity})`,
          drawTicks: false,
        },
        ticks: {
          color: colors.muted,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.foreground,
        },
        border: {
          display: false,
        },
      },
    },
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format date labels for charts
 */
export function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Format number with K/M suffix
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Format percentage
 */
export function formatPercentage(num: number): string {
  return num.toFixed(1) + "%";
}
