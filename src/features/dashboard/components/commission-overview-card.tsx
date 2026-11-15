import * as React from "react";
import { Percent, Clock, CheckCircle, Wallet, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommissionAnalytics } from "../types";
import { formatCurrency } from "@/lib/utils";

export interface CommissionOverviewCardProps {
  data: CommissionAnalytics;
}

export const CommissionOverviewCard: React.FC<CommissionOverviewCardProps> = ({ data }) => {
  const paidPct = Math.round((data.paidCommission / data.totalCommission) * 100);
  const approvedPct = Math.round((data.approvedCommission / data.totalCommission) * 100);
  const pendingPct = Math.round((data.pendingCommission / data.totalCommission) * 100);

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Percent className="h-4 w-4 text-primary" />
              Commission & Payout Overview
            </CardTitle>
            <CardDescription>
              Accrued agent commissions, approvals, and disbursement status
            </CardDescription>
          </div>
          <Badge variant="success" size="sm" dot>
            Current Cycle
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-3">
        {/* Total Accrued Card */}
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Accrued Commission</span>
            <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
              <ArrowUpRight className="h-3 w-3" /> +12.5% this cycle
            </span>
          </div>
          <div className="text-2xl font-bold tracking-tight text-foreground mt-1">
            {formatCurrency(data.totalCommission)}
          </div>

          {/* Segmented Progress Bar */}
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-full rounded-full bg-muted flex overflow-hidden">
              <div
                className="bg-emerald-600 dark:bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${paidPct}%` }}
                title={`Paid: ${paidPct}%`}
              />
              <div
                className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${approvedPct}%` }}
                title={`Approved: ${approvedPct}%`}
              />
              <div
                className="bg-amber-500 dark:bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${pendingPct}%` }}
                title={`Pending: ${pendingPct}%`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Paid ({paidPct}%)</span>
              <span>Approved ({approvedPct}%)</span>
              <span>Pending ({pendingPct}%)</span>
            </div>
          </div>
        </div>

        {/* Breakdown rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-card p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <Wallet className="h-3.5 w-3.5" /> Paid Out
            </div>
            <div className="text-sm font-bold text-foreground">
              {formatCurrency(data.paidCommission)}
            </div>
            <div className="text-[10px] text-muted-foreground">Disbursed to bank</div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400">
              <CheckCircle className="h-3.5 w-3.5" /> Approved
            </div>
            <div className="text-sm font-bold text-foreground">
              {formatCurrency(data.approvedCommission)}
            </div>
            <div className="text-[10px] text-muted-foreground">Ready for payout</div>
          </div>

          <div className="rounded-xl border border-border bg-card p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
              <Clock className="h-3.5 w-3.5" /> Pending Audit
            </div>
            <div className="text-sm font-bold text-foreground">
              {formatCurrency(data.pendingCommission)}
            </div>
            <div className="text-[10px] text-muted-foreground">Awaiting delivery</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
