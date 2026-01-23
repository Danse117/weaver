/**
 * RegionFilter Component
 *
 * Dropdown select for filtering trends by region.
 * Uses Shadcn Select component with flag emojis.
 */

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGIONS, Region } from "../data/mockTrendData";
import { Globe } from "lucide-react";

interface RegionFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RegionFilter({ value, onChange, className }: RegionFilterProps) {
  const selectedRegion = REGIONS.find((r) => r.code === value) || REGIONS[0];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <SelectValue>
            <span className="flex items-center gap-2">
              <span>{selectedRegion.flag}</span>
              <span className="hidden sm:inline">{selectedRegion.name}</span>
              <span className="sm:hidden">{selectedRegion.code}</span>
            </span>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((region) => (
          <SelectItem key={region.code} value={region.code}>
            <span className="flex items-center gap-2">
              <span>{region.flag}</span>
              <span>{region.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
