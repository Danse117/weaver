"use client";

import { cn } from "@/lib/utils";
import { BarChart3, Image, Lightbulb } from "lucide-react";

export type TabType = "metrics" | "content" | "insights";

interface TabBarProps {
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
	disabled?: boolean;
}

const tabs = [
	{
		id: "metrics" as TabType,
		label: "Metrics",
		icon: BarChart3,
	},
	{
		id: "content" as TabType,
		label: "Content",
		icon: Image,
	},
	{
		id: "insights" as TabType,
		label: "Insights",
		icon: Lightbulb,
	},
];

export function TabBar({ activeTab, onTabChange, disabled }: TabBarProps) {
	return (
		<div className="flex items-center gap-1 px-6 py-3">
			{tabs.map((tab) => {
				const Icon = tab.icon;
				const isActive = activeTab === tab.id;

				return (
					<button
						key={tab.id}
						onClick={() => !disabled && onTabChange(tab.id)}
						disabled={disabled}
						className={cn(
							"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
							"hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed",
							isActive
								? "bg-primary text-primary-foreground"
								: "text-muted-foreground"
						)}
					>
						<Icon className="h-4 w-4" />
						<span>{tab.label}</span>
					</button>
				);
			})}
		</div>
	);
}
