import * as React from "react";
import { Download, RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker, DateRangePreset } from "@/components/ui/date-picker";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/ui/dropdown";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useToast } from "@/components/ui";

export interface DashboardHeaderProps {
  dateRange: DateRangePreset;
  onDateRangeChange: (val: DateRangePreset, label: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  dateRange,
  onDateRangeChange,
  onRefresh,
  isRefreshing = false,
}) => {
  const { user } = useAuth();
  const toast = useToast();

  const formattedToday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const handleExport = (format: "csv" | "pdf") => {
    toast.success(
      `Exporting Dashboard Report (${format.toUpperCase()})`,
      "Your executive summary report is compiling and will download shortly."
    );
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/80">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
            Welcome back, {user?.name?.split(" ")[0] || "Administrator"}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{formattedToday}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">
            Executive sales, courier dispatch & commission overview
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Date Range Selector */}
        <DatePicker value={dateRange} onChange={onDateRangeChange} />

        {/* Refresh button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          isLoading={isRefreshing}
          leftIcon={<RefreshCw className={isRefreshing ? "animate-spin h-3.5 w-3.5" : "h-3.5 w-3.5"} />}
          className="h-9 text-xs"
        >
          Refresh
        </Button>

        {/* Export dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="default"
              size="sm"
              leftIcon={<Download className="h-3.5 w-3.5" />}
              className="h-9 text-xs"
            >
              Export Report
            </Button>
          </DropdownTrigger>
          <DropdownContent align="right" width="w-44">
            <DropdownItem onClick={() => handleExport("csv")}>
              Export as CSV Data
            </DropdownItem>
            <DropdownItem onClick={() => handleExport("pdf")}>
              Export Executive PDF
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </div>
  );
};
