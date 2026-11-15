import {
  LayoutDashboard,
  Users,
  Award,
  Package,
  Sliders,
  TrendingUp,
  ShoppingCart,
  Truck,
  Navigation,
  RotateCcw,
  AlertOctagon,
  Percent,
  Wallet,
  CreditCard,
  FileBarChart,
  FileCheck2,
  PieChart,
  User,
  Settings,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  isPhase1?: boolean; // Only Dashboard is Phase 1; others are placeholders
  phase?: string;
  description?: string;
}

export interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
  {
    groupTitle: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        isPhase1: true,
        phase: "Phase 1",
        description: "Executive sales, shipments, and commissions overview",
      },
    ],
  },
  {
    groupTitle: "Employee Management",
    items: [
      {
        title: "Employees",
        href: "/employees",
        icon: Users,
        badge: "Phase 2",
        isPhase1: false,
        phase: "Phase 2",
        description: "Employee directory, hierarchy, and roles",
      },
      {
        title: "Employee Performance",
        href: "/employee-performance",
        icon: Award,
        isPhase1: false,
        phase: "Phase 2",
        description: "Target tracking and sales performance metrics",
      },
    ],
  },
  {
    groupTitle: "Products & Commission",
    items: [
      {
        title: "Products",
        href: "/products",
        icon: Package,
        isPhase1: false,
        phase: "Phase 3",
        description: "Product catalog, SKU pricing, and tiers",
      },
      {
        title: "Commission Rules",
        href: "/commission-rules",
        icon: Sliders,
        isPhase1: false,
        phase: "Phase 3",
        description: "Fixed, percentage, and tiered commission logic",
      },
    ],
  },
  {
    groupTitle: "Sales & Orders",
    items: [
      {
        title: "Sales",
        href: "/sales",
        icon: TrendingUp,
        isPhase1: false,
        phase: "Phase 4",
        description: "Direct employee sales entries and attribution",
      },
      {
        title: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        isPhase1: false,
        phase: "Phase 4",
        description: "Customer orders, status changes, and fulfillment",
      },
    ],
  },
  {
    groupTitle: "Shipment Management",
    items: [
      {
        title: "Shipments",
        href: "/shipments",
        icon: Truck,
        isPhase1: false,
        phase: "Phase 5",
        description: "Shipment booking, AWB labels, and parcel manifests",
      },
      {
        title: "Courier Tracking",
        href: "/courier-tracking",
        icon: Navigation,
        isPhase1: false,
        phase: "Phase 5",
        description: "Multi-carrier live status tracking and webhooks",
      },
    ],
  },
  {
    groupTitle: "Returns & RTO",
    items: [
      {
        title: "Returns",
        href: "/returns",
        icon: RotateCcw,
        isPhase1: false,
        phase: "Phase 6",
        description: "Customer returns, replacement, and inspection",
      },
      {
        title: "RTO Management",
        href: "/rto-management",
        icon: AlertOctagon,
        badge: "Critical",
        isPhase1: false,
        phase: "Phase 6",
        description: "Return-To-Origin penalty mitigation and analytics",
      },
    ],
  },
  {
    groupTitle: "Commission & Earnings",
    items: [
      {
        title: "Commission Overview",
        href: "/commission-overview",
        icon: Percent,
        isPhase1: false,
        phase: "Phase 7",
        description: "Accrued, approved, and pending commissions",
      },
      {
        title: "Employee Earnings",
        href: "/employee-earnings",
        icon: Wallet,
        isPhase1: false,
        phase: "Phase 7",
        description: "Individual commission statements and ledger",
      },
      {
        title: "Payouts",
        href: "/payouts",
        icon: CreditCard,
        isPhase1: false,
        phase: "Phase 7",
        description: "Disbursement batches and payment verification",
      },
    ],
  },
  {
    groupTitle: "Reports",
    items: [
      {
        title: "Sales Reports",
        href: "/reports/sales",
        icon: FileBarChart,
        isPhase1: false,
        phase: "Phase 8",
        description: "Historical sales volume, revenue, and trends",
      },
      {
        title: "Shipment Reports",
        href: "/reports/shipments",
        icon: FileCheck2,
        isPhase1: false,
        phase: "Phase 8",
        description: "Courier SLA performance and delivery rates",
      },
      {
        title: "Commission Reports",
        href: "/reports/commission",
        icon: PieChart,
        isPhase1: false,
        phase: "Phase 8",
        description: "Payout audit trails and tax reporting",
      },
    ],
  },
  {
    groupTitle: "Settings",
    items: [
      {
        title: "Profile",
        href: "/settings/profile",
        icon: User,
        isPhase1: false,
        phase: "Settings",
        description: "User account credentials and personal preferences",
      },
      {
        title: "General Settings",
        href: "/settings/general",
        icon: Settings,
        isPhase1: false,
        phase: "Settings",
        description: "Organization profile, currency, and system rules",
      },
    ],
  },
];
