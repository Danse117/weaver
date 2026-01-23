/**
 * TrendTable Component
 *
 * CoinMarketCap-style ranked table for displaying trending items.
 * Supports hashtags, sounds, and effects with sortable columns.
 *
 * Features:
 * - Sortable columns (click headers)
 * - Responsive design (hide columns on mobile)
 * - Green/red percentage indicators
 * - Mini sparkline charts
 * - Hover states
 */

"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { TrendSparkline } from "./TrendSparkline";
import { formatUsageCount, formatPercentage } from "../data/mockTrendData";
import {
  Hash,
  Music,
  Sparkles,
  Star,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// =============================================================================
// Types
// =============================================================================

export type TrendItemType = "hashtag" | "sound" | "effect";

export interface TrendItem {
  rank: number;
  id: string;
  name: string;
  subtitle?: string; // Artist for sounds
  usageCount: number;
  change24h: number;
  change7d: number;
  sparklineData: number[];
  category?: string;
}

type SortKey = "rank" | "name" | "usageCount" | "change24h" | "change7d";
type SortDirection = "asc" | "desc";

interface TrendTableProps {
  items: TrendItem[];
  type: TrendItemType;
  className?: string;
  onRowClick?: (item: TrendItem) => void;
}

// =============================================================================
// Helper Components
// =============================================================================

function PercentageCell({ value }: { value: number }) {
  const isPositive = value >= 0;
  return (
    <span
      className={cn(
        "font-medium text-xs sm:text-sm",
        isPositive ? "text-green-500" : "text-red-500"
      )}
    >
      {formatPercentage(value)}
    </span>
  );
}

function TypeIcon({ type }: { type: TrendItemType }) {
  const iconClass = "h-4 w-4";
  switch (type) {
    case "hashtag":
      return <Hash className={iconClass} />;
    case "sound":
      return <Music className={iconClass} />;
    case "effect":
      return <Sparkles className={iconClass} />;
  }
}

function SortIcon({
  sortKey,
  currentSort,
  direction,
}: {
  sortKey: SortKey;
  currentSort: SortKey;
  direction: SortDirection;
}) {
  if (sortKey !== currentSort) {
    return <ArrowUpDown className="h-3 w-3 text-muted-foreground opacity-50" />;
  }
  return direction === "asc" ? (
    <ChevronUp className="h-3 w-3" />
  ) : (
    <ChevronDown className="h-3 w-3" />
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function TrendTable({
  items,
  type,
  className,
  onRowClick,
}: TrendTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Handle sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection(key === "rank" ? "asc" : "desc");
    }
  };

  // Sort items
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case "rank":
          comparison = a.rank - b.rank;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "usageCount":
          comparison = a.usageCount - b.usageCount;
          break;
        case "change24h":
          comparison = a.change24h - b.change24h;
          break;
        case "change7d":
          comparison = a.change7d - b.change7d;
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [items, sortKey, sortDirection]);

  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Column header component
  const ColumnHeader = ({
    label,
    sortKeyValue,
    className: headerClass,
  }: {
    label: string;
    sortKeyValue: SortKey;
    className?: string;
  }) => (
    <th
      className={cn(
        "px-2 sm:px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none",
        headerClass
      )}
      onClick={() => handleSort(sortKeyValue)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        <SortIcon
          sortKey={sortKeyValue}
          currentSort={sortKey}
          direction={sortDirection}
        />
      </div>
    </th>
  );

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead className="border-b border-border">
          <tr>
            {/* Star column - fixed */}
            <th className="w-8 sm:w-10 px-2 py-3"></th>

            {/* Rank */}
            <ColumnHeader
              label="#"
              sortKeyValue="rank"
              className="w-10 sm:w-14"
            />

            {/* Name */}
            <ColumnHeader label="Name" sortKeyValue="name" />

            {/* Usage (like market cap) */}
            <ColumnHeader
              label="Usage"
              sortKeyValue="usageCount"
              className="hidden sm:table-cell"
            />

            {/* 24h % */}
            <ColumnHeader label="24h %" sortKeyValue="change24h" />

            {/* 7d % - hidden on mobile */}
            <ColumnHeader
              label="7d %"
              sortKeyValue="change7d"
              className="hidden md:table-cell"
            />

            {/* Sparkline - hidden on mobile */}
            <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              7d Trend
            </th>

            {/* Category - hidden on small screens */}
            <th className="hidden xl:table-cell px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedItems.map((item) => (
            <tr
              key={item.id}
              className={cn(
                "hover:bg-muted/50 transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(item)}
            >
              {/* Star/Favorite */}
              <td className="px-2 py-3">
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <Star
                    className={cn(
                      "h-4 w-4 transition-colors",
                      favorites.has(item.id)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground hover:text-yellow-400"
                    )}
                  />
                </button>
              </td>

              {/* Rank */}
              <td className="px-2 sm:px-4 py-3 text-sm font-medium">
                {item.rank}
              </td>

              {/* Name with icon */}
              <td className="px-2 sm:px-4 py-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <TypeIcon type={type} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate max-w-[120px] sm:max-w-none">
                      {type === "hashtag" ? `#${item.name}` : item.name}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-none">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              </td>

              {/* Usage */}
              <td className="hidden sm:table-cell px-2 sm:px-4 py-3 text-sm font-medium">
                {formatUsageCount(item.usageCount)}
              </td>

              {/* 24h % */}
              <td className="px-2 sm:px-4 py-3">
                <PercentageCell value={item.change24h} />
              </td>

              {/* 7d % */}
              <td className="hidden md:table-cell px-2 sm:px-4 py-3">
                <PercentageCell value={item.change7d} />
              </td>

              {/* Sparkline */}
              <td className="hidden lg:table-cell px-4 py-3">
                <TrendSparkline data={item.sparklineData} width={100} height={32} />
              </td>

              {/* Category */}
              <td className="hidden xl:table-cell px-4 py-3">
                {item.category && (
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {sortedItems.length === 0 && (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          No trending items found
        </div>
      )}
    </div>
  );
}
