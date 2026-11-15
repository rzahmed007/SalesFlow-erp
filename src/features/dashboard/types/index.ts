export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type ShipmentStatus =
  | "pending"
  | "in_transit"
  | "delivered"
  | "failed"
  | "rto";

export type CommissionStatus = "pending" | "approved" | "paid";

export interface KPIData {
  totalSales: {
    value: number;
    change: number;
    trend: "up" | "down" | "neutral";
  };
  totalOrders: {
    value: number;
    change: number;
    trend: "up" | "down" | "neutral";
  };
  activeEmployees: {
    value: number;
    change: number;
    trend: "up" | "down" | "neutral";
  };
  totalShipments: {
    value: number;
    change: number;
    trend: "up" | "down" | "neutral";
  };
  totalCommission: {
    value: number;
    change: number;
    trend: "up" | "down" | "neutral";
  };
  deliveredOrders: {
    value: number;
    rate: number;
    change: number;
    trend: "up" | "down" | "neutral";
  };
}

export interface SalesChartPoint {
  label: string;
  sales: number;
  target: number;
  orders: number;
}

export interface OrderStatusBreakdown {
  status: OrderStatus;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ShipmentAnalytics {
  total: number;
  pending: number;
  inTransit: number;
  delivered: number;
  failed: number;
  rto: number;
  deliverySuccessRate: number; // e.g. 89.7%
  rtoPercentage: number; // e.g. 4.2%
}

export interface CommissionAnalytics {
  totalCommission: number;
  pendingCommission: number;
  approvedCommission: number;
  paidCommission: number;
}

export interface EmployeePerformanceItem {
  id: string;
  name: string;
  avatar: string;
  department: string;
  salesAmount: number;
  ordersCount: number;
  commission: number;
  performanceScore: number; // e.g. 98%
  rank: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  employeeName: string;
  employeeId: string;
  orderDate: string;
  amount: number;
  status: OrderStatus;
  courier?: string;
  trackingNumber?: string;
  commission: number;
  itemsCount: number;
}

export interface ActivityItem {
  id: string;
  type: "order" | "shipment" | "delivery" | "commission" | "employee";
  title: string;
  description: string;
  timestamp: string;
  meta?: string;
}
