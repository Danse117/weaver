"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface DashboardLayoutProps {
	sidebar: React.ReactNode;
	tabs: React.ReactNode;
	content: React.ReactNode;
	className?: string;
}

export function DashboardLayout({
	sidebar,
	tabs,
	content,
	className,
}: DashboardLayoutProps) {
	return (
		<div className={cn("flex h-screen w-full overflow-hidden", className)}>
			{/* Sidebar */}
			{sidebar}

			{/* Main content area */}
			<div className="flex flex-1 flex-col overflow-hidden">
				{/* Tab bar */}
				<div className="border-b border-border bg-background">
					{tabs}
				</div>

				{/* Content */}
				<div className="flex-1 overflow-auto">
					{content}
				</div>
			</div>
		</div>
	);
}
