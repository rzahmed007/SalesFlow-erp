import * as React from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Truck,
  Percent,
  CheckCircle2,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { KPIData } from "../types";
import { formatCurrency, formatNumber } from "@/lib/utils";

export interface KPISectionProps {
  data: KPIData;
}

export const KPISection: React.FC<KPISectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* 1. Total Sales */}
      <StatCard
        index={0}
        label="Total Sales"
        value={formatCurrency(data.totalSales.value)}
        change={data.totalSales.change}
        changePeriod="vs last month"
        trend={data.totalSales.trend}
        icon={<DollarSign className="h-5 w-5" />}
      />

      {/* 2. Total Orders */}
      <StatCard
        index={1}
        label="Total Orders"
        value={formatNumber(data.totalOrders.value)}
        change={data.totalOrders.change}
        changePeriod="vs last month"
        trend={data.totalOrders.trend}
        icon={<ShoppingCart className="h-5 w-5" />}
      />

      {/* 3. Active Employees */}
      <StatCard
        index={2}
        label="Active Employees"
        value={formatNumber(data.activeEmployees.value)}
        change={data.activeEmployees.change}
        changePeriod="vs last month"
        trend={data.activeEmployees.trend}
        icon={<Users className="h-5 w-5" />}
      />

      {/* 4. Total Shipments */}
      <StatCard
        index={3}
        label="Total Shipments"
        value={formatNumber(data.totalShipments.value)}
        change={data.totalShipments.change}
        changePeriod="vs last month"
        trend={data.totalShipments.trend}
        icon={<Truck className="h-5 w-5" />}
      />

      {/* 5. Total Commission */}
      <StatCard
        index={4}
        label="Total Commission"
        value={formatCurrency(data.totalCommission.value)}
        change={data.totalCommission.change}
        changePeriod="vs last month"
        trend={data.totalCommission.trend}
        icon={<Percent className="h-5 w-5" />}
      />

      {/* 6. Delivered Orders */}
      <StatCard
        index={5}
        label="Delivered Orders"
        value={formatNumber(data.deliveredOrders.value)}
        change={data.deliveredOrders.change}
        changePeriod={`(${data.deliveredOrders.rate}% success)`}
        trend={data.deliveredOrders.trend}
        icon={<CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
      />
    </div>
  );
};
