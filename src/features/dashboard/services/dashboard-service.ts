import {
  KPIData,
  SalesChartPoint,
  OrderStatusBreakdown,
  ShipmentAnalytics,
  CommissionAnalytics,
  EmployeePerformanceItem,
  OrderItem,
  ActivityItem,
  OrderStatus,
} from "../types";
import { DateRangePreset } from "@/components/ui/date-picker";

// Realistic KPI data
const mockKPIData: KPIData = {
  totalSales: {
    value: 124580,
    change: 14.2,
    trend: "up",
  },
  totalOrders: {
    value: 1842,
    change: 8.7,
    trend: "up",
  },
  activeEmployees: {
    value: 28,
    change: 7.1,
    trend: "up",
  },
  totalShipments: {
    value: 1695,
    change: 11.3,
    trend: "up",
  },
  totalCommission: {
    value: 18687,
    change: 12.5,
    trend: "up",
  },
  deliveredOrders: {
    value: 1520,
    rate: 89.7,
    change: 4.3,
    trend: "up",
  },
};

// Daily sales points (Last 7 days)
const mockDailySales: SalesChartPoint[] = [
  { label: "Mon", sales: 14200, target: 12000, orders: 195 },
  { label: "Tue", sales: 18400, target: 14000, orders: 240 },
  { label: "Wed", sales: 16800, target: 15000, orders: 215 },
  { label: "Thu", sales: 21500, target: 16000, orders: 280 },
  { label: "Fri", sales: 24800, target: 18000, orders: 325 },
  { label: "Sat", sales: 19100, target: 15000, orders: 250 },
  { label: "Sun", sales: 15800, target: 13000, orders: 210 },
];

// Weekly sales points (Last 4 weeks)
const mockWeeklySales: SalesChartPoint[] = [
  { label: "Week 1", sales: 26400, target: 24000, orders: 380 },
  { label: "Week 2", sales: 31200, target: 28000, orders: 445 },
  { label: "Week 3", sales: 29800, target: 27000, orders: 410 },
  { label: "Week 4", sales: 37180, target: 32000, orders: 520 },
];

// Monthly sales points (Last 6 months)
const mockMonthlySales: SalesChartPoint[] = [
  { label: "Jun", sales: 92400, target: 85000, orders: 1380 },
  { label: "Jul", sales: 98600, target: 90000, orders: 1460 },
  { label: "Aug", sales: 104200, target: 95000, orders: 1540 },
  { label: "Sep", sales: 112800, target: 100000, orders: 1680 },
  { label: "Oct", sales: 119400, target: 110000, orders: 1750 },
  { label: "Nov", sales: 124580, target: 115000, orders: 1842 },
];

// Order status breakdown
const mockOrderBreakdown: OrderStatusBreakdown[] = [
  { status: "delivered", label: "Delivered", count: 1520, percentage: 82.5, color: "#16A34A" },
  { status: "shipped", label: "Shipped", count: 175, percentage: 9.5, color: "#2563EB" },
  { status: "processing", label: "Processing", count: 82, percentage: 4.5, color: "#D97706" },
  { status: "confirmed", label: "Confirmed", count: 35, percentage: 1.9, color: "#9333EA" },
  { status: "pending", label: "Pending", count: 18, percentage: 1.0, color: "#6B7280" },
  { status: "cancelled", label: "Cancelled", count: 12, percentage: 0.6, color: "#DC2626" },
];

// Shipment analytics
const mockShipmentAnalytics: ShipmentAnalytics = {
  total: 1695,
  pending: 62,
  inTransit: 113,
  delivered: 1520,
  failed: 28,
  rto: 71,
  deliverySuccessRate: 89.7,
  rtoPercentage: 4.2,
};

// Commission analytics
const mockCommissionAnalytics: CommissionAnalytics = {
  totalCommission: 18687.0,
  pendingCommission: 3240.5,
  approvedCommission: 5890.0,
  paidCommission: 9556.5,
};

// Top performing employees
const mockTopEmployees: EmployeePerformanceItem[] = [
  {
    id: "emp-101",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Enterprise Logistics",
    salesAmount: 32450.0,
    ordersCount: 462,
    commission: 4867.5,
    performanceScore: 98,
    rank: 1,
  },
  {
    id: "emp-102",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Direct Sales",
    salesAmount: 28900.0,
    ordersCount: 395,
    commission: 4335.0,
    performanceScore: 94,
    rank: 2,
  },
  {
    id: "emp-103",
    name: "Devon Reynolds",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Regional Dispatch",
    salesAmount: 24150.0,
    ordersCount: 340,
    commission: 3622.5,
    performanceScore: 91,
    rank: 3,
  },
  {
    id: "emp-104",
    name: "Amara Okonjo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Corporate Accounts",
    salesAmount: 21800.0,
    ordersCount: 310,
    commission: 3270.0,
    performanceScore: 88,
    rank: 4,
  },
  {
    id: "emp-105",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    department: "Courier Operations",
    salesAmount: 17280.0,
    ordersCount: 265,
    commission: 2592.0,
    performanceScore: 85,
    rank: 5,
  },
];

// Recent orders
const mockRecentOrders: OrderItem[] = [
  {
    id: "ord-1",
    orderNumber: "ORD-92841",
    customerName: "Astra Dynamics Corp",
    customerEmail: "logistics@astradynamics.com",
    employeeName: "Marcus Vance",
    employeeId: "emp-101",
    orderDate: "2026-11-15T18:30:00Z",
    amount: 3450.0,
    status: "delivered",
    courier: "BlueDart Express",
    trackingNumber: "BD-90218491",
    commission: 517.5,
    itemsCount: 14,
  },
  {
    id: "ord-2",
    orderNumber: "ORD-92840",
    customerName: "Nexus Retail Supply",
    customerEmail: "procurement@nexusretail.com",
    employeeName: "Elena Rostova",
    employeeId: "emp-102",
    orderDate: "2026-11-15T17:15:00Z",
    amount: 1890.0,
    status: "shipped",
    courier: "Delhivery Surface",
    trackingNumber: "DEL-84019284",
    commission: 283.5,
    itemsCount: 8,
  },
  {
    id: "ord-3",
    orderNumber: "ORD-92839",
    customerName: "Vanguard Tech Labs",
    customerEmail: "billing@vanguardlabs.io",
    employeeName: "Devon Reynolds",
    employeeId: "emp-103",
    orderDate: "2026-11-15T16:05:00Z",
    amount: 2750.0,
    status: "processing",
    courier: "DTDC Priority",
    trackingNumber: "DTDC-482019",
    commission: 412.5,
    itemsCount: 11,
  },
  {
    id: "ord-4",
    orderNumber: "ORD-92838",
    customerName: "Apex Global Traders",
    customerEmail: "supply@apextraders.com",
    employeeName: "Amara Okonjo",
    employeeId: "emp-104",
    orderDate: "2026-11-15T14:40:00Z",
    amount: 4120.0,
    status: "delivered",
    courier: "BlueDart Air",
    trackingNumber: "BD-77391024",
    commission: 618.0,
    itemsCount: 18,
  },
  {
    id: "ord-5",
    orderNumber: "ORD-92837",
    customerName: "Solaria Hardware Inc",
    customerEmail: "orders@solaria.net",
    employeeName: "Liam O'Connor",
    employeeId: "emp-105",
    orderDate: "2026-11-15T13:20:00Z",
    amount: 860.0,
    status: "confirmed",
    courier: "Pending Allocation",
    commission: 129.0,
    itemsCount: 3,
  },
  {
    id: "ord-6",
    orderNumber: "ORD-92836",
    customerName: "Horizon Consumer Goods",
    customerEmail: "horizon@consumergoods.co",
    employeeName: "Marcus Vance",
    employeeId: "emp-101",
    orderDate: "2026-11-15T11:50:00Z",
    amount: 1420.0,
    status: "pending",
    courier: "Pending Allocation",
    commission: 213.0,
    itemsCount: 6,
  },
  {
    id: "ord-7",
    orderNumber: "ORD-92835",
    customerName: "Cascade Manufacturing",
    customerEmail: "cascademfg@outlook.com",
    employeeName: "Elena Rostova",
    employeeId: "emp-102",
    orderDate: "2026-11-14T20:10:00Z",
    amount: 5200.0,
    status: "delivered",
    courier: "Delhivery Surface",
    trackingNumber: "DEL-66291830",
    commission: 780.0,
    itemsCount: 22,
  },
  {
    id: "ord-8",
    orderNumber: "ORD-92834",
    customerName: "Pacific Ocean Logistics",
    customerEmail: "pacific@pol.org",
    employeeName: "Devon Reynolds",
    employeeId: "emp-103",
    orderDate: "2026-11-14T18:45:00Z",
    amount: 720.0,
    status: "cancelled",
    courier: "Cancelled by Client",
    commission: 0,
    itemsCount: 2,
  },
];

// Activity timeline
const mockActivities: ActivityItem[] = [
  {
    id: "act-1",
    type: "shipment",
    title: "Shipment Dispatched",
    description: "Courier handed over parcel BD-90218491 for Astra Dynamics Corp",
    timestamp: "12 mins ago",
    meta: "BlueDart Express",
  },
  {
    id: "act-2",
    type: "order",
    title: "New Order Confirmed",
    description: "Order ORD-92841 ($3,450.00) created by Marcus Vance",
    timestamp: "35 mins ago",
    meta: "14 items",
  },
  {
    id: "act-3",
    type: "delivery",
    title: "Order Delivered Successfully",
    description: "Apex Global Traders marked received (AWB: BD-77391024)",
    timestamp: "1 hr ago",
    meta: "Delivered in 24h",
  },
  {
    id: "act-4",
    type: "commission",
    title: "Commission Calculated & Accrued",
    description: "$618.00 credited to Amara Okonjo for corporate fulfillment",
    timestamp: "2 hrs ago",
    meta: "Tier 1 (15%)",
  },
  {
    id: "act-5",
    type: "employee",
    title: "Employee Milestone Achieved",
    description: "Marcus Vance entered Gold Performer Tier (> $30k Monthly Sales)",
    timestamp: "4 hrs ago",
    meta: "Top Performer",
  },
];

export const dashboardService = {
  getKPIs: async (preset?: DateRangePreset): Promise<KPIData> => {
    // Return sample data
    return mockKPIData;
  },

  getSalesData: async (granularity: "daily" | "weekly" | "monthly"): Promise<SalesChartPoint[]> => {
    switch (granularity) {
      case "daily":
        return mockDailySales;
      case "weekly":
        return mockWeeklySales;
      case "monthly":
        return mockMonthlySales;
      default:
        return mockDailySales;
    }
  },

  getOrderBreakdown: async (): Promise<OrderStatusBreakdown[]> => {
    return mockOrderBreakdown;
  },

  getShipmentAnalytics: async (): Promise<ShipmentAnalytics> => {
    return mockShipmentAnalytics;
  },

  getCommissionAnalytics: async (): Promise<CommissionAnalytics> => {
    return mockCommissionAnalytics;
  },

  getTopEmployees: async (): Promise<EmployeePerformanceItem[]> => {
    return mockTopEmployees;
  },

  getRecentOrders: async (params?: {
    search?: string;
    status?: OrderStatus | "all";
    page?: number;
    pageSize?: number;
  }): Promise<{ items: OrderItem[]; total: number }> => {
    let filtered = [...mockRecentOrders];

    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.employeeName.toLowerCase().includes(q)
      );
    }

    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((o) => o.status === params.status);
    }

    const total = filtered.length;
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 5;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return { items, total };
  },

  getRecentActivity: async (): Promise<ActivityItem[]> => {
    return mockActivities;
  },
};
