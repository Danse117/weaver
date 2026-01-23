"use client";

/**
 * SettingsModal component
 * 
 * Displays user account settings in a modal with tabbed sections:
 * - Account Information: email, name, organization, account creation date
 * - Preferences: theme, notifications
 * - Security: password, 2FA, active sessions, delete account
 * - Billing: plan, payment, usage
 * 
 * @param onClose - Function to call when the modal is closed
 */

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, User, Settings, Shield, CreditCard, AlertTriangle, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { logout, getUser } from "@/app/actions/auth";
import { ThemeToggle } from "@/components/theme-toggle";

interface SettingsModalProps {
	onClose: () => void;
}

type SettingsTab = "account" | "preferences" | "security" | "billing";

export function SettingsModal({ onClose }: SettingsModalProps) {
	const [activeTab, setActiveTab] = useState<SettingsTab>("account");
	const [userData, setUserData] = useState<{
		email: string;
		firstName: string;
		lastName: string;
		organization: string;
		createdAt: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	useEffect(() => {
		async function loadUserData() {
			try {
				const user = await getUser();
				if (user) {
					// TODO: Fetch actual user profile data from Supabase
					// For now, using placeholder data
					setUserData({
						email: user.email || "",
						firstName: "John", // TODO: Replace with actual data
						lastName: "Doe", // TODO: Replace with actual data
						organization: "Acme Inc.", // TODO: Replace with actual data
						createdAt: user.created_at || "",
					});
				}
			} catch (error) {
				console.error("Failed to load user data:", error);
			} finally {
				setIsLoading(false);
			}
		}

		loadUserData();
	}, []);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await logout();
		} catch (error) {
			console.error("Logout failed:", error);
			setIsLoggingOut(false);
		}
	};

	const tabs = [
		{ id: "account" as const, label: "Account", icon: User },
		{ id: "preferences" as const, label: "Preferences", icon: Settings },
		{ id: "security" as const, label: "Security", icon: Shield },
		{ id: "billing" as const, label: "Billing", icon: CreditCard },
	];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
			<Card className="w-full max-w-4xl mx-4 relative max-h-[90vh] flex flex-col">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</button>

				<CardHeader>
					<CardTitle>Settings</CardTitle>
					<CardDescription>
						Manage your Weaver account settings and preferences
					</CardDescription>
				</CardHeader>

				<div className="flex flex-col md:flex-row flex-1 overflow-hidden">
					{/* Sidebar Tabs */}
					<div className="border-b md:border-b-0 md:border-r border-border px-4 md:w-48 shrink-0">
						<nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible py-2">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
											activeTab === tab.id
												? "bg-primary/10 text-primary"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										}`}
									>
										<Icon className="h-4 w-4 shrink-0" />
										<span>{tab.label}</span>
									</button>
								);
							})}
						</nav>
					</div>

					{/* Content Area */}
					<CardContent className="flex-1 overflow-y-auto p-6">
						{isLoading ? (
							<div className="flex items-center justify-center h-full">
								<p className="text-sm text-muted-foreground">Loading...</p>
							</div>
						) : (
							<>
								{activeTab === "account" && (
									<AccountTab userData={userData} />
								)}
								{activeTab === "preferences" && <PreferencesTab />}
								{activeTab === "security" && <SecurityTab />}
								{activeTab === "billing" && <BillingTab />}
							</>
						)}
					</CardContent>
				</div>

				{/* Footer with Logout Button */}
				<div className="border-t border-border p-4">
					<Button
						onClick={handleLogout}
						disabled={isLoggingOut}
						variant="outline"
						className="w-full md:w-auto"
					>
						<LogOut className="h-4 w-4 mr-2" />
						{isLoggingOut ? "Logging out..." : "Logout"}
					</Button>
				</div>
			</Card>
		</div>
	);
}

// Account Information Tab
function AccountTab({
	userData,
}: {
	userData: {
		email: string;
		firstName: string;
		lastName: string;
		organization: string;
		createdAt: string;
	} | null;
}) {
	const formatDate = (dateString: string) => {
		if (!dateString) return "N/A";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-4">Account Information</h3>
				<p className="text-sm text-muted-foreground mb-6">
					Your Weaver account details. Profile editing coming soon.
				</p>
			</div>

			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							value={userData?.firstName || ""}
							disabled
							className="bg-muted"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							id="lastName"
							value={userData?.lastName || ""}
							disabled
							className="bg-muted"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={userData?.email || ""}
						disabled
						className="bg-muted"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="organization">Organization</Label>
					<Input
						id="organization"
						value={userData?.organization || ""}
						disabled
						className="bg-muted"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="createdAt">Account Created</Label>
					<Input
						id="createdAt"
						value={formatDate(userData?.createdAt || "")}
						disabled
						className="bg-muted"
					/>
				</div>
			</div>
		</div>
	);
}

// Preferences Tab
function PreferencesTab() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-4">Preferences</h3>
				<p className="text-sm text-muted-foreground mb-6">
					Customize your Weaver experience
				</p>
			</div>

			<div className="space-y-6">
				{/* Theme Setting */}
				<div className="space-y-2">
					<Label>Theme</Label>
					<p className="text-sm text-muted-foreground mb-3">
						Choose your preferred theme
					</p>
					<div className="flex items-center gap-3">
						<ThemeToggle />
						<span className="text-sm text-muted-foreground">
							Toggle between light, dark, and system theme
						</span>
					</div>
				</div>

				{/* Notification Settings (Future) */}
				<div className="space-y-2">
					<Label>Notification Settings</Label>
					<p className="text-sm text-muted-foreground mb-3">
						Control how you receive notifications
					</p>
					<div className="space-y-3 p-4 border border-border rounded-lg bg-muted/50">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Email Notifications</p>
								<p className="text-xs text-muted-foreground">
									Receive updates via email
								</p>
							</div>
							<div className="text-xs text-muted-foreground">Coming soon</div>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Push Notifications</p>
								<p className="text-xs text-muted-foreground">
									Get browser notifications
								</p>
							</div>
							<div className="text-xs text-muted-foreground">Coming soon</div>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Weekly Reports</p>
								<p className="text-xs text-muted-foreground">
									Receive weekly analytics summaries
								</p>
							</div>
							<div className="text-xs text-muted-foreground">Coming soon</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Security Tab
function SecurityTab() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-4">Security</h3>
				<p className="text-sm text-muted-foreground mb-6">
					Manage your account security settings
				</p>
			</div>

			<div className="space-y-6">
				{/* Password Change (Future) */}
				<div className="space-y-2">
					<Label>Password</Label>
					<p className="text-sm text-muted-foreground mb-3">
						Change your account password
					</p>
					<Button variant="outline" disabled>
						Change Password (Coming soon)
					</Button>
				</div>

				{/* Two-Factor Authentication (Future) */}
				<div className="space-y-2">
					<Label>Two-Factor Authentication</Label>
					<p className="text-sm text-muted-foreground mb-3">
						Add an extra layer of security to your account
					</p>
					<Button variant="outline" disabled>
						Enable 2FA (Coming soon)
					</Button>
				</div>

				{/* Active Sessions (Future) */}
				<div className="space-y-2">
					<Label>Active Sessions</Label>
					<p className="text-sm text-muted-foreground mb-3">
						Manage devices where you're currently logged in
					</p>
					<div className="p-4 border border-border rounded-lg bg-muted/50">
						<p className="text-sm text-muted-foreground">
							Active session management coming soon
						</p>
					</div>
				</div>

				{/* Danger Zone - Delete Account */}
				<div className="space-y-2 pt-6 border-t border-border">
					<div className="flex items-center gap-2 text-destructive">
						<AlertTriangle className="h-5 w-5" />
						<Label className="text-destructive">Danger Zone</Label>
					</div>
					<p className="text-sm text-muted-foreground mb-3">
						Permanently delete your account and all associated data
					</p>
					<div className="p-4 border-2 border-destructive/50 rounded-lg bg-destructive/5">
						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
								<div>
									<p className="text-sm font-semibold text-destructive">
										Delete Account
									</p>
									<p className="text-xs text-muted-foreground mt-1">
										This action cannot be undone. This will permanently delete your
										account and remove all your data from our servers, including all
										connected social media accounts and analytics history.
									</p>
								</div>
							</div>
							<Button variant="destructive" disabled className="w-full md:w-auto">
								Delete Account (Coming soon)
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Billing Tab
function BillingTab() {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold mb-4">Billing & Subscription</h3>
				<p className="text-sm text-muted-foreground mb-6">
					Manage your subscription and billing information
				</p>
			</div>

			<div className="space-y-6">
				{/* Current Plan */}
				<div className="space-y-2">
					<Label>Current Plan</Label>
					<div className="p-4 border border-border rounded-lg">
						<div className="flex items-center justify-between mb-2">
							<p className="text-sm font-medium">Free Plan</p>
							<span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
								Active
							</span>
						</div>
						<p className="text-sm text-muted-foreground">
							You're currently on the free plan. Upgrade to unlock more features.
						</p>
						<Button variant="outline" disabled className="mt-3">
							Upgrade Plan (Coming soon)
						</Button>
					</div>
				</div>

				{/* Payment Method (Future) */}
				<div className="space-y-2">
					<Label>Payment Method</Label>
					<p className="text-sm text-muted-foreground mb-3">
						Manage your payment methods
					</p>
					<div className="p-4 border border-border rounded-lg bg-muted/50">
						<p className="text-sm text-muted-foreground">
							No payment method on file
						</p>
						<Button variant="outline" disabled className="mt-3">
							Add Payment Method (Coming soon)
						</Button>
					</div>
				</div>

				{/* Usage Stats (Future) */}
				<div className="space-y-2">
					<Label>Usage Statistics</Label>
					<p className="text-sm text-muted-foreground mb-3">
						View your current usage across all features
					</p>
					<div className="p-4 border border-border rounded-lg space-y-3">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Connected Accounts</p>
								<p className="text-xs text-muted-foreground">Unlimited</p>
							</div>
							<p className="text-sm font-medium">-</p>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">API Calls (Monthly)</p>
								<p className="text-xs text-muted-foreground">Coming soon</p>
							</div>
							<p className="text-sm font-medium">-</p>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium">Data Retention</p>
								<p className="text-xs text-muted-foreground">90 days</p>
							</div>
							<p className="text-sm font-medium">-</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
