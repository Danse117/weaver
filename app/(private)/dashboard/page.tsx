/**
 * Dashboard Page Component
 * 
 * Main dashboard interface for managing connected social media accounts and viewing analytics.
 * 
 * Features:
 * - Single-page app experience (no full page reloads when switching tabs/accounts)
 * - URL persistence using query parameters (?tab=metrics&account=xyz)
 * - Sidebar for account switching and adding new accounts
 * - Tab navigation (Metrics, Content, Insights, Advertising, Trends)
 * - Empty state for new users with no connected accounts
 * - Account removal functionality
 * 
 * URL Parameters:
 * - tab: Active tab (metrics, content, insights, advertising, trends) - defaults to metrics
 * - account: Selected account ID - defaults to first account
 * 
 * Note: The Trends tab doesn't require an account - it shows global trending data
 * 
 * State Management:
 * - Connected accounts fetched on mount
 * - Selected account and active tab synced with URL
 * - Toast notifications for user feedback
 */

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getConnectedAccounts, ConnectedAccount, deleteAccount } from "@/app/actions/accounts";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { ProfileCard } from "../components/dashboard/ProfileCard";
import { TabBar, TabType } from "../components/dashboard/TabBar";
import { AddAccountModal } from "../components/dashboard/AddAccountModal";
import { SettingsModal } from "../components/dashboard/SettingsModal";
import { MetricsTab } from "../components/dashboard/metrics/MetricsTab";
import { ContentTab } from "../components/dashboard/content/ContentTab";
import { InsightsTab } from "../components/dashboard/insights/InsightsTab";
import { AdvertisingTab } from "../components/dashboard/advertising/AdvertisingTab";
import { TrendsTab } from "../components/dashboard/trends/TrendsTab";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { WeaverLoaderWithText, WeaverLoader } from "@/components/ui/loader";
import { Plus } from "lucide-react";

/**
 * Dashboard content component (wrapped in Suspense by parent)
 * Handles all dashboard logic and state management
 */
function DashboardContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { toast, toasts } = useToast();

	const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
	const [loading, setLoading] = useState(true);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	// Get URL params
	const urlTab = searchParams.get("tab") as TabType | null;
	const urlAccountId = searchParams.get("account");
	const urlError = searchParams.get("error");

	// State
	const [activeTab, setActiveTab] = useState<TabType>(urlTab || "metrics");
	const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
		urlAccountId
	);

	// Load accounts
	useEffect(() => {
		async function loadAccounts() {
			try {
				const fetchedAccounts = await getConnectedAccounts();
				setAccounts(fetchedAccounts);

				// If no account selected but accounts exist, select first one
				if (!selectedAccountId && fetchedAccounts.length > 0) {
					setSelectedAccountId(fetchedAccounts[0].id);
				}
			} catch (error) {
				console.error("Failed to load accounts:", error);
				toast({
					title: "Error",
					description: "Failed to load connected accounts",
					variant: "destructive",
				});
			} finally {
				setLoading(false);
			}
		}

		loadAccounts();
	}, []);

	// Show error from URL params
	useEffect(() => {
		if (urlError) {
			toast({
				title: "Authentication Error",
				description: urlError,
				variant: "destructive",
			});
			// Clear error from URL
			const params = new URLSearchParams(searchParams);
			params.delete("error");
			router.replace(`?${params.toString()}`);
		}
	}, [urlError]);

	// Sync state with URL
	useEffect(() => {
		if (urlTab && urlTab !== activeTab) {
			setActiveTab(urlTab);
		}
	}, [urlTab]);

	useEffect(() => {
		if (urlAccountId && urlAccountId !== selectedAccountId) {
			setSelectedAccountId(urlAccountId);
		}
	}, [urlAccountId]);

	// Update URL when state changes
	const updateUrl = (tab?: TabType, accountId?: string | null) => {
		const params = new URLSearchParams(searchParams);

		if (tab !== undefined) {
			params.set("tab", tab);
		}

		if (accountId !== undefined) {
			if (accountId) {
				params.set("account", accountId);
			} else {
				params.delete("account");
			}
		}

		router.push(`?${params.toString()}`, { scroll: false });
	};

	const handleTabChange = (tab: TabType) => {
		setActiveTab(tab);
		updateUrl(tab, undefined);
	};

	const handleAccountSelect = (accountId: string) => {
		setSelectedAccountId(accountId);
		updateUrl(undefined, accountId);
	};

	const handleAddAccountSuccess = async () => {
		// Reload accounts
		try {
			const fetchedAccounts = await getConnectedAccounts();
			setAccounts(fetchedAccounts);
			toast({
				title: "Success",
				description: "Account connected successfully!",
			});
		} catch (error) {
			console.error("Failed to reload accounts:", error);
		}
	};

	const handleRemoveAccount = async (accountId: string) => {
		try {
			await deleteAccount(accountId);
			
			// Remove from local state
			const updatedAccounts = accounts.filter((a) => a.id !== accountId);
			setAccounts(updatedAccounts);

			// If the removed account was selected, select another
			if (selectedAccountId === accountId) {
				const newSelectedId = updatedAccounts.length > 0 ? updatedAccounts[0].id : null;
				setSelectedAccountId(newSelectedId);
				updateUrl(undefined, newSelectedId);
			}

			toast({
				title: "Account removed",
				description: "The account has been disconnected successfully.",
			});
		} catch (error) {
			console.error("Failed to remove account:", error);
			toast({
				title: "Error",
				description: "Failed to remove account. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleSettings = () => {
		setShowSettingsModal(true);
	};

	// Loading state
	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<WeaverLoaderWithText size={64} text="Loading dashboard..." />
			</div>
		);
	}

	// Render dashboard (even with no accounts)
	const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

	return (
		<>
			<DashboardLayout
				profileCard={<ProfileCard account={selectedAccount || null} />}
				sidebar={
					<Sidebar
						accounts={accounts}
						selectedAccountId={selectedAccountId}
						onSelectAccount={handleAccountSelect}
						onAddAccount={() => setShowAddModal(true)}
						onRemoveAccount={handleRemoveAccount}
						onSettings={handleSettings}
					/>
				}
				tabs={
					<TabBar
						activeTab={activeTab}
						onTabChange={handleTabChange}
						disabled={!selectedAccountId}
					/>
				}
				content={
					accounts.length === 0 ? (
						<div className="flex items-center justify-center h-full">
							<div className="text-center space-y-4 max-w-md px-6">
								<div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
									<Plus className="h-8 w-8 text-primary" />
								</div>
								<div className="space-y-2">
									<h2 className="text-2xl font-semibold">Get Started with Weaver</h2>
									<p className="text-muted-foreground">
										Connect your first social media account using the "Add Account" button in the sidebar to start tracking analytics and insights.
									</p>
								</div>
							</div>
						</div>
					) : activeTab === "trends" ? (
						// Trends tab doesn't require account - shows global data
						<TrendsTab />
					) : selectedAccountId ? (
						<>
							{activeTab === "metrics" && (
								<MetricsTab accountId={selectedAccountId} />
							)}
							{activeTab === "content" && (
								<ContentTab accountId={selectedAccountId} />
							)}
							{activeTab === "insights" && (
								<InsightsTab accountId={selectedAccountId} />
							)}
							{activeTab === "advertising" && selectedAccount && (
								<AdvertisingTab 
									accountId={selectedAccountId} 
									platform={selectedAccount.platform} 
								/>
							)}
						</>
					) : (
						<div className="flex items-center justify-center h-full">
							<p className="text-muted-foreground">Select an account to view analytics</p>
						</div>
					)
				}
			/>

			{showAddModal && (
				<AddAccountModal
					onClose={() => setShowAddModal(false)}
					onSuccess={handleAddAccountSuccess}
				/>
			)}

			{showSettingsModal && (
				<SettingsModal
					onClose={() => setShowSettingsModal(false)}
				/>
			)}

			<Toaster toasts={toasts} />
		</>
	);
}

export default function DashboardPage() {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center h-screen">
					<WeaverLoader size={64} animation="pulse" />
				</div>
			}
		>
			<DashboardContent />
		</Suspense>
	);
}
