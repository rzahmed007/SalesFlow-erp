import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { OrderStatusBreakdown } from "../types";
import { formatNumber } from "@/lib/utils";

export interface OrderOverviewCardProps {
  data: OrderStatusBreakdown[];
}

export const OrderOverviewCard: React.FC<OrderOverviewCardProps> = ({ data }) => {
  const totalOrders = data.reduce((acc, curr) => acc + curr.count, 0);

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: OrderStatusBreakdown = payload[0].payload;
      return (
        <div className="rounded-xl border border-border bg-popover p-2.5 shadow-premium text-xs space-y-1">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.label} Orders
          </div>
          <div className="text-muted-foreground">
            <span className="font-bold text-foreground">{formatNumber(item.count)}</span> orders (
            {item.percentage}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Order Fulfillment Overview</CardTitle>
        <CardDescription>
          Distribution of order lifecycle statuses across all active sales lines
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        {/* Donut Chart with Center Metric */}
        <div className="relative h-[200px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <RechartsTooltip content={<CustomPieTooltip />} />
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={2}
                stroke="transparent"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {formatNumber(totalOrders)}
            </span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
              Total Orders
            </span>
          </div>
        </div>

        {/* Status Legend Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/80 text-xs">
          {data.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between p-1.5 rounded-lg hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground truncate">{item.label}</span>
              </div>
              <span className="font-semibold text-foreground text-xs ml-2">
                {formatNumber(item.count)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
