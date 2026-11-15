import * as React from "react";
import {
  Bell,
  CheckCheck,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  UserCheck,
} from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownContent } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "shipment" | "order" | "commission" | "rto" | "employee";
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Courier Batch Dispatched",
    description: "48 orders handed over to BlueDart Courier (Batch #BD-9021)",
    timestamp: "10m ago",
    type: "shipment",
    read: false,
  },
  {
    id: "notif-2",
    title: "Monthly Commission Accrued",
    description: "$18,687.00 calculated across 28 active sales agents",
    timestamp: "45m ago",
    type: "commission",
    read: false,
  },
  {
    id: "notif-3",
    title: "High-Priority RTO Alert",
    description: "Order #ORD-7821 marked RTO by courier due to incorrect address",
    timestamp: "2h ago",
    type: "rto",
    read: false,
  },
  {
    id: "notif-4",
    title: "Quarterly Target Achieved",
    description: "Marcus Vance reached 120% of monthly sales milestone",
    timestamp: "5h ago",
    type: "employee",
    read: true,
  },
  {
    id: "notif-5",
    title: "Bulk Order Invoiced",
    description: "Order #ORD-7819 ($4,850.00) confirmed by Corporate Client",
    timestamp: "1d ago",
    type: "order",
    read: true,
  },
];

export const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "shipment":
        return <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "commission":
        return <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "rto":
        return <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />;
      case "employee":
        return <UserCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "order":
        return <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Bell className="h-4 w-4 text-foreground" />;
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg h-9 w-9 border-border bg-background hover:bg-accent text-foreground"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
          </Button>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownTrigger>

      <DropdownContent align="right" width="w-80 sm:w-96" className="p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="neutral" size="sm">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <CheckCheck className="h-3 w-3" /> Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-border/60">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleToggleRead(n.id)}
              className={cn(
                "flex items-start gap-3 p-3.5 text-xs transition-colors cursor-pointer hover:bg-accent/60",
                !n.read ? "bg-muted/30 font-medium" : "text-muted-foreground"
              )}
            >
              <div className="mt-0.5 rounded-lg border border-border bg-background p-1.5 shadow-sm shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground text-xs leading-none">
                    {n.title}
                  </p>
                  <span className="text-[10px] text-muted-foreground">{n.timestamp}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {n.description}
                </p>
              </div>
              {!n.read && (
                <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2 border-t border-border bg-muted/20 text-center">
          <span className="text-[11px] text-muted-foreground">
            Showing latest enterprise system activity
          </span>
        </div>
      </DropdownContent>
    </Dropdown>
  );
};
