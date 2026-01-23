"use client";

/**
 * TabBar component
 *
 * Displays a bar of tabs for the dashboard.
 * Responsive: icons-only on mobile, full text on sm+
 *
 * @param activeTab - The active tab
 * @param onTabChange - Function to call when a tab is clicked
 * @param disabled - Whether the tab bar is disabled
 */

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Image, Lightbulb, Megaphone, TrendingUp } from "lucide-react";

export type TabType = "metrics" | "content" | "insights" | "advertising" | "trends";

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  disabled?: boolean;
}

export function TabBar({ activeTab, onTabChange, disabled }: TabBarProps) {
  return (
    <div className="px-3 sm:px-6 py-2 sm:py-3">
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as TabType)}
      >
        <TabsList className="h-9 sm:h-10 p-1">
          <TabsTrigger
            value="metrics"
            disabled={disabled}
            className="px-2.5 sm:px-3 text-xs sm:text-sm gap-1.5 sm:gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Metrics</span>
          </TabsTrigger>
          <TabsTrigger
            value="content"
            disabled={disabled}
            className="px-2.5 sm:px-3 text-xs sm:text-sm gap-1.5 sm:gap-2"
          >
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            disabled={disabled}
            className="px-2.5 sm:px-3 text-xs sm:text-sm gap-1.5 sm:gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
          <TabsTrigger
            value="advertising"
            disabled={disabled}
            className="px-2.5 sm:px-3 text-xs sm:text-sm gap-1.5 sm:gap-2"
          >
            <Megaphone className="h-4 w-4" />
            <span className="hidden sm:inline">Ads</span>
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="px-2.5 sm:px-3 text-xs sm:text-sm gap-1.5 sm:gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Trends</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
