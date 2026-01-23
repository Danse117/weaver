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
				"flex-1 transition-all duration-300 min-h-screen",
				isCollapsed ? "ml-[70px]" : "ml-64"
			)}
		>
			{/* User Profile Account card */}
			{profileCard}

			{/* Tab bar */}
			<div className="border-b border-border bg-background">
				{tabs}
			</div>

			{/* Content */}
			<div className="flex-1 overflow-auto">
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
