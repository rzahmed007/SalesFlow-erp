import * as React from "react";
import { DashboardHeader } from "../components/dashboard-header";
import { KPISection } from "../components/kpi-section";
import { SalesAnalyticsCard } from "../components/sales-analytics-card";
import { OrderOverviewCard } from "../components/order-overview-card";
import { ShipmentOverviewCard } from "../components/shipment-overview-card";
import { CommissionOverviewCard } from "../components/commission-overview-card";
import { EmployeePerformanceCard } from "../components/employee-performance-card";
import { RecentOrdersCard } from "../components/recent-orders-card";
import { RecentActivityCard } from "../components/recent-activity-card";
import { dashboardService } from "../services/dashboard-service";
import {
  KPIData,
  SalesChartPoint,
  OrderStatusBreakdown,
  ShipmentAnalytics,
  CommissionAnalytics,
  EmployeePerformanceItem,
  OrderItem,
  ActivityItem,
} from "../types";
import { DateRangePreset } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui";

export const DashboardPage: React.FC = () => {
  const toast = useToast();

  const [dateRange, setDateRange] = React.useState<DateRangePreset>("thisMonth");
  const [granularity, setGranularity] = React.useState<"daily" | "weekly" | "monthly">("daily");
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Dashboard Data States
  const [kpiData, setKpiData] = React.useState<KPIData | null>(null);
  const [salesData, setSalesData] = React.useState<SalesChartPoint[]>([]);
  const [orderBreakdown, setOrderBreakdown] = React.useState<OrderStatusBreakdown[]>([]);
  const [shipmentData, setShipmentData] = React.useState<ShipmentAnalytics | null>(null);
  const [commissionData, setCommissionData] = React.useState<CommissionAnalytics | null>(null);
  const [topEmployees, setTopEmployees] = React.useState<EmployeePerformanceItem[]>([]);
  const [recentOrders, setRecentOrders] = React.useState<OrderItem[]>([]);
  const [recentActivities, setRecentActivities] = React.useState<ActivityItem[]>([]);

  // Load dashboard data
  const loadDashboardData = React.useCallback(async (preset: DateRangePreset, gran: "daily" | "weekly" | "monthly") => {
    try {
      const [kpi, sales, orders, shipments, commissions, employees, recent, activities] =
        await Promise.all([
          dashboardService.getKPIs(preset),
          dashboardService.getSalesData(gran),
          dashboardService.getOrderBreakdown(),
          dashboardService.getShipmentAnalytics(),
          dashboardService.getCommissionAnalytics(),
          dashboardService.getTopEmployees(),
          dashboardService.getRecentOrders(),
          dashboardService.getRecentActivity(),
        ]);

      setKpiData(kpi);
      setSalesData(sales);
      setOrderBreakdown(orders);
      setShipmentData(shipments);
      setCommissionData(commissions);
      setTopEmployees(employees);
      setRecentOrders(recent.items);
      setRecentActivities(activities);
    } catch {
      toast.error("Error", "Failed to load dashboard metrics");
    }
  }, [toast]);

  React.useEffect(() => {
    loadDashboardData(dateRange, granularity);
  }, [dateRange, granularity, loadDashboardData]);

  const handleDateRangeChange = (preset: DateRangePreset, label: string) => {
    setDateRange(preset);
    toast.info("Date Filter Updated", `Showing analytics for ${label}`);
  };

  const handleGranularityChange = async (newGran: "daily" | "weekly" | "monthly") => {
    setGranularity(newGran);
    const updatedSales = await dashboardService.getSalesData(newGran);
    setSalesData(updatedSales);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDashboardData(dateRange, granularity);
    setIsRefreshing(false);
    toast.success("Dashboard Refreshed", "All metrics synchronized with latest courier telemetry.");
  };

  if (!kpiData || !shipmentData || !commissionData) {
    return (
      <div className="space-y-6">
        <div className="h-14 w-full bg-muted/60 animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-muted/50 animate-pulse rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-80 lg:col-span-2 bg-muted/50 animate-pulse rounded-xl" />
          <div className="h-80 bg-muted/50 animate-pulse rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* A. Header */}
      <DashboardHeader
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* B. 6 KPI Cards */}
      <KPISection data={kpiData} />

      {/* C & D. Sales Analytics & Order Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesAnalyticsCard
          data={salesData}
          granularity={granularity}
          onGranularityChange={handleGranularityChange}
        />
        <OrderOverviewCard data={orderBreakdown} />
      </div>

      {/* E, F, G. Shipment Overview, Commission Overview, Top Employees */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ShipmentOverviewCard data={shipmentData} />
        <CommissionOverviewCard data={commissionData} />
        <EmployeePerformanceCard data={topEmployees} />
      </div>

      {/* H & I. Recent Orders Table & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrdersCard
          initialOrders={recentOrders}
          totalOrdersCount={recentOrders.length}
        />
        <RecentActivityCard data={recentActivities} />
      </div>
    </div>
  );
};
