"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getConnectedAccounts, ConnectedAccount } from "@/app/actions/accounts";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { AccountSwitcher } from "../components/dashboard/AccountSwitcher";
import { TabBar, TabType } from "../components/dashboard/TabBar";
import { EmptyState } from "../components/dashboard/EmptyState";
import { AddAccountModal } from "../components/dashboard/AddAccountModal";
import { MetricsTab } from "../components/dashboard/metrics/MetricsTab";
import { ContentTab } from "../components/dashboard/content/ContentTab";
import { InsightsTab } from "../components/dashboard/insights/InsightsTab";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

function DashboardContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { toast, toasts } = useToast();

	const [accounts, setAccounts] = useState<ConnectedAccount[]>([]);
	const [loading, setLoading] = useState(true);
	const [showAddModal, setShowAddModal] = useState(false);

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

	// Loading state
	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="flex flex-col items-center gap-2">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
					<p className="text-sm text-muted-foreground">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	// No accounts - show empty state
	if (accounts.length === 0) {
		return (
			<>
				<EmptyState onAddAccount={() => setShowAddModal(true)} />
				{showAddModal && (
					<AddAccountModal
						onClose={() => setShowAddModal(false)}
						onSuccess={handleAddAccountSuccess}
					/>
				)}
				<Toaster toasts={toasts} />
			</>
		);
	}

	// Render dashboard
	const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

	return (
		<>
			<DashboardLayout
				sidebar={
					<AccountSwitcher
						accounts={accounts}
						selectedAccountId={selectedAccountId}
						onSelectAccount={handleAccountSelect}
						onAddAccount={() => setShowAddModal(true)}
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
					selectedAccountId ? (
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

			<Toaster toasts={toasts} />
		</>
	);
}

export default function DashboardPage() {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center h-screen">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
				</div>
			}
		>
			<DashboardContent />
		</Suspense>
	);
}
