import * as React from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "./dropdown";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export type DateRangePreset =
  | "today"
  | "yesterday"
  | "last7days"
  | "last30days"
  | "thisMonth"
  | "lastMonth"
  | "thisYear";

export interface DatePickerProps {
  value: DateRangePreset;
  onChange: (val: DateRangePreset, label: string) => void;
  className?: string;
}

const presetLabels: Record<DateRangePreset, string> = {
  today: "Today",
  yesterday: "Yesterday",
  last7days: "Last 7 Days",
  last30days: "Last 30 Days",
  thisMonth: "This Month",
  lastMonth: "Last Month",
  thisYear: "This Year",
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const selectedLabel = presetLabels[value] || "Select date";

  return (
    <Dropdown className={className}>
      <DropdownTrigger>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 text-xs font-normal border-border bg-background"
        >
          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium text-foreground">{selectedLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-1 opacity-70" />
        </Button>
      </DropdownTrigger>
      <DropdownContent align="right" width="w-48">
        {(Object.keys(presetLabels) as DateRangePreset[]).map((preset) => (
          <DropdownItem
            key={preset}
            onClick={() => onChange(preset, presetLabels[preset])}
            className={cn(value === preset && "font-semibold bg-accent text-foreground")}
          >
            {presetLabels[preset]}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
