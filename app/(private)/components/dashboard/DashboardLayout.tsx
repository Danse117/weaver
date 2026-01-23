"use client";

/**
 * DashboardLayout component
 * 
 * Main layout component for the dashboard.
 * 
 * @param sidebar - The sidebar component
 * @param tabs - The tab bar component
 * @param content - The content component
 * @param className - Additional CSS classes
 */

import { cn } from "@/lib/utils";
import React from "react";
import { SidebarProvider, useSidebar } from "@/components/sidebar/SidebarContext";

interface DashboardLayoutProps {
	profileCard?: React.ReactNode;
	sidebar: React.ReactNode;
	tabs: React.ReactNode;
	content: React.ReactNode;
	className?: string;
}

function MainContentWrapper({ 
	profileCard,
	tabs,
	content 
}: { 
	profileCard?: React.ReactNode;
	tabs: React.ReactNode;
	content: React.ReactNode;
}) {
	const { isCollapsed } = useSidebar();

	return (
		<main
			className={cn(
				"flex-1 flex flex-col transition-all duration-300 h-screen overflow-hidden w-full",
				isCollapsed ? "ml-[70px]" : "ml-64"
			)}
		>
			{/* User Profile Account card - fixed */}
			<div className="shrink-0 w-full">
				{profileCard}
			</div>

			{/* Tab bar - fixed */}
			<div className="shrink-0 border-b border-border bg-background w-full">
				{tabs}
			</div>

			{/* Content - scrollable, full width */}
			<div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
				{content}
			</div>
		</main>
	);
}

export function DashboardLayout({
	profileCard,
	sidebar,
	tabs,
	content,
	className,
}: DashboardLayoutProps) {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen bg-background">
				{/* Sidebar */}
				{sidebar}

				{/* Main content area */}
				<MainContentWrapper profileCard={profileCard} tabs={tabs} content={content} />
			</div>
		</SidebarProvider>
	);
}
