import * as React from "react";
import { X, Filter } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { EmployeeFilterParams, EmployeeStatus } from "../types";

export interface EmployeeFiltersProps {
  params: EmployeeFilterParams;
  onUpdateFilters: (newParams: Partial<EmployeeFilterParams>) => void;
  onResetFilters: () => void;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  params,
  onUpdateFilters,
  onResetFilters,
}) => {
  const departments = [
    { value: "all", label: "All Departments" },
    { value: "Sales", label: "Sales" },
    { value: "Logistics", label: "Logistics" },
    { value: "Operations", label: "Operations" },
    { value: "Customer Support", label: "Customer Support" },
    { value: "Finance", label: "Finance" },
  ];

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  const hasActiveFilters =
    Boolean(params.search) ||
    params.status !== "all" ||
    params.department !== "all" ||
    params.designation !== "all";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card">
      {/* Left: Search input */}
      <div className="w-full md:w-80">
        <SearchInput
          value={params.search || ""}
          onChange={(val) => onUpdateFilters({ search: val })}
          placeholder="Search by name, ID, or email..."
        />
      </div>

      {/* Right: Dropdowns & Clear */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="w-36">
          <Select
            value={params.status || "all"}
            onChange={(val) => onUpdateFilters({ status: val as EmployeeStatus | "all" })}
            options={statuses}
          />
        </div>

        <div className="w-44">
          <Select
            value={params.department || "all"}
            onChange={(val) => onUpdateFilters({ department: val })}
            options={departments}
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            leftIcon={<X className="h-3.5 w-3.5" />}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};
