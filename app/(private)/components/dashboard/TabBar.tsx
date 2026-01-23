"use client";

/**
 * TabBar component
 * 
 * Displays a bar of tabs for the dashboard.
 * 
 * @param activeTab - The active tab
 * @param onTabChange - Function to call when a tab is clicked
 * @param disabled - Whether the tab bar is disabled
 */

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Image, Lightbulb } from "lucide-react";

export type TabType = "metrics" | "content" | "insights";

interface TabBarProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
	disabled?: boolean;
}

export function TabBar({ activeTab, onTabChange, disabled }: TabBarProps) {
	return (
		<div className="px-6 py-3">
			<Tabs value={activeTab} onValueChange={onTabChange} className="text-sm text-muted-foreground">
				<TabsList size="lg">
					<TabsTrigger value="metrics" disabled={disabled}>
						<BarChart3 /> Metrics
					</TabsTrigger>
					<TabsTrigger value="content" disabled={disabled}>
						<Image /> Content
					</TabsTrigger>
					<TabsTrigger value="insights" disabled={disabled}>
						<Lightbulb /> Insights
					</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	);
}
