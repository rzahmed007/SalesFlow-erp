import * as React from "react";
import { Truck, CheckCircle, AlertTriangle, Clock, RefreshCw, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShipmentAnalytics } from "../types";
import { formatNumber } from "@/lib/utils";

export interface ShipmentOverviewCardProps {
  data: ShipmentAnalytics;
}

export const ShipmentOverviewCard: React.FC<ShipmentOverviewCardProps> = ({ data }) => {
  const statuses = [
    {
      label: "Pending Shipment",
      count: data.pending,
      icon: <Clock className="h-3.5 w-3.5 text-zinc-500" />,
      color: "bg-zinc-400",
    },
    {
      label: "In Transit",
      count: data.inTransit,
      icon: <RefreshCw className="h-3.5 w-3.5 text-blue-500" />,
      color: "bg-blue-500",
    },
    {
      label: "Delivered",
      count: data.delivered,
      icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />,
      color: "bg-emerald-500",
    },
    {
      label: "Failed Delivery",
      count: data.failed,
      icon: <XCircle className="h-3.5 w-3.5 text-amber-500" />,
      color: "bg-amber-500",
    },
    {
      label: "RTO (Return to Origin)",
      count: data.rto,
      icon: <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />,
      color: "bg-rose-500",
    },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              Shipment & Logistics Overview
            </CardTitle>
            <CardDescription>
              Carrier dispatch, in-transit status and RTO mitigation indicators
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-mono">
            {formatNumber(data.total)} Total
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-3">
        {/* Core SLA Rate Highlights */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300">
              Delivery Success Rate
            </span>
            <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
              {data.deliverySuccessRate}%
            </div>
            <div className="text-[10px] text-emerald-800/80 dark:text-emerald-400/80 mt-1">
              Top carrier SLA tier
            </div>
          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3.5 dark:border-rose-900/50 dark:bg-rose-950/20">
            <span className="text-[11px] font-medium text-rose-800 dark:text-rose-300">
              RTO Return Rate
            </span>
            <div className="text-xl font-bold text-rose-700 dark:text-rose-400 mt-0.5">
              {data.rtoPercentage}%
            </div>
            <div className="text-[10px] text-rose-800/80 dark:text-rose-400/80 mt-1">
              Below 5.0% enterprise benchmark
            </div>
          </div>
        </div>

        {/* Detailed Breakdown with Progress bars */}
        <div className="space-y-3 pt-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Carrier Status Breakdown
          </div>
          {statuses.map((item) => {
            const percentage = Math.round((item.count / data.total) * 100);
            return (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-foreground font-medium">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {formatNumber(item.count)}
                    </span>
                    <span className="text-muted-foreground text-[11px] w-8 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${Math.max(percentage, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
