import * as React from "react";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { EmployeeKPIStats } from "../types";

export interface EmployeeStatsProps {
  stats: EmployeeKPIStats | null;
  isLoading?: boolean;
}

export const EmployeeStats: React.FC<EmployeeStatsProps> = ({ stats, isLoading }) => {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-muted/60 animate-pulse border border-border" />
        ))}
      </div>
    );
  }

  const activePct = Math.round((stats.activeEmployees / stats.totalEmployees) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        index={0}
        label="Total Employees"
        value={stats.totalEmployees}
        change={stats.totalGrowthPercentage}
        changePeriod="vs last quarter"
        trend="up"
        icon={<Users className="h-5 w-5 text-foreground" />}
      />

      <StatCard
        index={1}
        label="Active Employees"
        value={stats.activeEmployees}
        description={`${activePct}% of total workforce`}
        trend="up"
        icon={<UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
      />

      <StatCard
        index={2}
        label="Inactive & Suspended"
        value={stats.inactiveEmployees + stats.suspendedEmployees}
        description={`${stats.inactiveEmployees} inactive, ${stats.suspendedEmployees} suspended`}
        trend="neutral"
        icon={<UserX className="h-5 w-5 text-zinc-500" />}
      />

      <StatCard
        index={3}
        label="New This Month"
        value={stats.newThisMonth}
        change={12.5}
        changePeriod="onboarding rate"
        trend="up"
        icon={<UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
      />
    </div>
  );
};
