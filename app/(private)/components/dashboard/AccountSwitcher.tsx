"use client";

import React from "react";
import {
	Sidebar,
	SidebarBody,
	SidebarLink,
} from "./DashboardSidebar";
import { Plus, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectedAccount } from "@/app/actions/accounts";
import Image from "next/image";

interface AccountSwitcherProps {
	accounts: ConnectedAccount[];
	selectedAccountId: string | null;
	onSelectAccount: (accountId: string) => void;
	onAddAccount: () => void;
}

export function AccountSwitcher({
	accounts,
	selectedAccountId,
	onSelectAccount,
	onAddAccount,
}: AccountSwitcherProps) {
	return (
		<Sidebar animate={true}>
			<SidebarBody className="justify-between">
				<div className="flex flex-col gap-2">
					{/* Logo / Header */}
					<div className="flex items-center gap-2 px-2 py-4">
						<div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
							<span className="text-primary-foreground font-bold text-sm">
								W
							</span>
						</div>
						<span className="font-semibold text-neutral-800 dark:text-neutral-200">
							Weaver
						</span>
					</div>

					{/* Divider */}
					<div className="border-t border-neutral-300 dark:border-neutral-700 my-2" />

					{/* Connected Accounts */}
					<div className="flex flex-col gap-1">
						{accounts.length === 0 ? (
							<p className="text-xs text-muted-foreground px-2 py-2">
								No accounts connected
							</p>
						) : (
							accounts.map((account) => (
								<SidebarLink
									key={account.id}
									link={{
										label: account.display_name || account.platform_username || "Account",
										href: "#",
										icon: account.avatar_url ? (
											<div className="relative h-6 w-6 rounded-full overflow-hidden flex-shrink-0">
												<Image
													src={account.avatar_url}
													alt={account.display_name || "Account"}
													fill
													className="object-cover"
												/>
											</div>
										) : (
											<div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
												<User className="h-3 w-3" />
											</div>
										),
									}}
									onClick={() => onSelectAccount(account.id)}
									className={
										selectedAccountId === account.id
											? "bg-neutral-200 dark:bg-neutral-700"
											: ""
									}
								/>
							))
						)}
					</div>

					{/* Add Account Button */}
					<SidebarLink
						link={{
							label: "Add Account",
							href: "#",
							icon: <Plus className="h-5 w-5 text-primary" />,
						}}
						onClick={onAddAccount}
						className="mt-2 hover:bg-primary/10"
					/>
				</div>

				{/* Bottom section */}
				<div className="flex flex-col gap-2">
					<div className="border-t border-neutral-300 dark:border-neutral-700 my-2" />
					<div className="flex items-center justify-between px-2">
						<ThemeToggle />
					</div>
				</div>
			</SidebarBody>
		</Sidebar>
	);
}
