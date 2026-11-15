import * as React from "react";
import { Award, TrendingUp, ShoppingBag, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmployeePerformanceItem } from "../types";
import { formatCurrency, formatNumber } from "@/lib/utils";

export interface EmployeePerformanceCardProps {
  data: EmployeePerformanceItem[];
}

export const EmployeePerformanceCard: React.FC<EmployeePerformanceCardProps> = ({ data }) => {
  return (
    <Card className="col-span-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Top Employee Performance
            </CardTitle>
            <CardDescription>
              Sales volume leaders and commission earners for the current cycle
            </CardDescription>
          </div>
          <Badge variant="neutral" size="sm">
            Top 5
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-1">
        {data.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-card hover:bg-muted/40 transition-colors"
          >
            {/* Left: Rank & Avatar & Name */}
            <div className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  employee.rank === 1
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400"
                    : employee.rank === 2
                    ? "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                    : employee.rank === 3
                    ? "bg-amber-50 text-amber-900 border border-amber-300/60 dark:bg-amber-900/30 dark:text-amber-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                #{employee.rank}
              </span>

              <Avatar
                src={employee.avatar}
                fallback={employee.name}
                size="md"
              />

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground">
                    {employee.name}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                  <span>{employee.department}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <ShoppingBag className="h-3 w-3" /> {formatNumber(employee.ordersCount)} orders
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Sales & Commission */}
            <div className="text-right space-y-0.5">
              <div className="text-xs font-bold text-foreground">
                {formatCurrency(employee.salesAmount)}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                {formatCurrency(employee.commission)} comm.
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
