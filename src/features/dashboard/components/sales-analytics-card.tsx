import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesChartPoint } from "../types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useTheme } from "@/app/providers/theme-provider";

export interface SalesAnalyticsCardProps {
  data: SalesChartPoint[];
  granularity: "daily" | "weekly" | "monthly";
  onGranularityChange: (granularity: "daily" | "weekly" | "monthly") => void;
  isLoading?: boolean;
}

export const SalesAnalyticsCard: React.FC<SalesAnalyticsCardProps> = ({
  data,
  granularity,
  onGranularityChange,
  isLoading,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Dynamic theme colors for the chart
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
  const textColor = isDark ? "#A1A1AA" : "#6B7280";
  const primaryStroke = isDark ? "#FAFAFA" : "#111111";
  const primaryFill = isDark ? "rgba(250, 250, 250, 0.15)" : "rgba(17, 17, 17, 0.08)";
  const targetStroke = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.25)";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-border bg-popover p-3 shadow-premium text-xs space-y-1.5 backdrop-blur-md">
          <div className="font-semibold text-foreground border-b border-border pb-1">
            {label} ({granularity === "daily" ? "Day" : granularity === "weekly" ? "Week" : "Month"})
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-foreground" />
              Actual Sales:
            </span>
            <span className="font-bold text-foreground">
              {formatCurrency(payload[0]?.value)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-dashed border-foreground" />
              Target:
            </span>
            <span className="font-semibold text-muted-foreground">
              {formatCurrency(payload[1]?.value)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-border/60 text-[10px]">
            <span className="text-muted-foreground">Orders Count:</span>
            <span className="font-medium text-foreground">
              {formatNumber(payload[0]?.payload?.orders)} orders
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Sales Analytics & Growth</CardTitle>
          <CardDescription>
            Gross revenue generated across all employee dispatch channels against monthly targets
          </CardDescription>
        </div>

        {/* View granularities toggle */}
        <Tabs
          defaultValue={granularity}
          value={granularity}
          onValueChange={(val) => onGranularityChange(val as "daily" | "weekly" | "monthly")}
        >
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-[290px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryStroke} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={primaryStroke} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="label"
                stroke={textColor}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={textColor}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value >= 1000 ? `${value / 1000}k` : value}`}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: "11px", paddingBottom: "10px" }}
              />
              <Area
                type="monotone"
                name="Actual Sales"
                dataKey="sales"
                stroke={primaryStroke}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#salesGradient)"
              />
              <Area
                type="monotone"
                name="Sales Target"
                dataKey="target"
                stroke={targetStroke}
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
