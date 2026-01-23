"use client";
import Image from "next/image";
import { ChevronLeft, Plus, X, Settings } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";
import { ConnectedAccount } from "@/app/actions/accounts";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarProps {
  accounts: ConnectedAccount[];
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
  onAddAccount: () => void;
  onRemoveAccount: (accountId: string) => void;
  onSettings: () => void;
}

export default function Sidebar({
  accounts,
  selectedAccountId,
  onSelectAccount,
  onAddAccount,
  onRemoveAccount,
  onSettings,
}: SidebarProps) {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-64"
      )}
    >
      <div className="flex h-full flex-col px-3 py-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-center px-2">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden">
                <Image
                  src="/assets/logos/weaver_icon.png"
                  alt="Weaver"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">Weaver</span>
            </div>
          ) : (
            <div className="relative h-8 w-8 shrink-0 overflow-hidden">
              <Image
                src="/assets/logos/weaver_icon.png"
                alt="Weaver"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "mb-3 flex w-full items-center gap-3 rounded-lg py-2 text-muted-foreground hover:bg-accent transition-all",
            isCollapsed ? "justify-center px-0" : "px-3"
          )}
          aria-label="Toggle Sidebar"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 shrink-0 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>

        {/* Account List */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {accounts.map((account) => {
            const isActive = selectedAccountId === account.id;
            return (
              <div
                key={account.id}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg py-2 transition-all hover:bg-accent",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  isCollapsed ? "justify-center px-0" : "px-3"
                )}
              >
                <button
                  onClick={() => onSelectAccount(account.id)}
                  className={cn(
                    "flex items-center gap-3 flex-1 min-w-0",
                    isCollapsed && "justify-center"
                  )}
                >
                  {account.avatar_url ? (
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={account.avatar_url}
                        alt={account.platform_username || account.display_name || "Account"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {(account.platform_username || account.display_name || "?")[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  {!isCollapsed && (
                    <div className="flex flex-col items-start overflow-hidden">
                      <span className="text-sm font-medium truncate w-full">
                        {account.platform_username || account.display_name || "Account"}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {account.platform}
                      </span>
                    </div>
                  )}
                </button>
                {!isCollapsed && isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveAccount(account.id);
                    }}
                    className="shrink-0 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                    aria-label="Remove account"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Account Button */}
          <button
            onClick={onAddAccount}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg py-2 text-muted-foreground hover:bg-accent transition-all",
              isCollapsed ? "justify-center px-0" : "px-3"
            )}
          >
            <Plus className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="text-sm">Add Account</span>}
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t pt-4 space-y-1">
          <div
            className={cn(
              "flex w-full items-center gap-2 rounded-lg py-1 text-muted-foreground hover:bg-accent transition-all",
              isCollapsed ? "justify-center px-0" : "pl-1 pr-3"
            )}
          >
            <ThemeToggle />
            {!isCollapsed && <span className="text-sm">Switch Theme</span>}
          </div>
          <button
            onClick={onSettings}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg py-2 text-muted-foreground hover:bg-accent transition-all",
              isCollapsed ? "justify-center px-0" : "px-3"
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="text-sm">Settings</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
