import * as React from "react";
import { Package, User, Truck, DollarSign, Calendar, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderItem } from "../types";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export interface OrderDetailModalProps {
  order: OrderItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  open,
  onOpenChange,
}) => {
  if (!order) return null;

  const getStatusBadge = (status: OrderItem["status"]) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success" dot>Delivered</Badge>;
      case "shipped":
        return <Badge variant="info" dot>Shipped</Badge>;
      case "processing":
        return <Badge variant="warning" dot>Processing</Badge>;
      case "confirmed":
        return <Badge variant="neutral" dot>Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline" dot>Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive" dot>Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-base font-bold font-mono">
                  {order.orderNumber}
                </DialogTitle>
                {getStatusBadge(order.status)}
              </div>
              <DialogDescription>
                Detailed overview of order fulfillment and employee sales attribution
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Customer & Employee Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                <User className="h-3.5 w-3.5 text-primary" /> Customer Details
              </div>
              <div className="font-bold text-foreground text-sm">{order.customerName}</div>
              <div className="text-muted-foreground flex items-center gap-1 text-[11px]">
                <Mail className="h-3 w-3" /> {order.customerEmail}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                <User className="h-3.5 w-3.5 text-primary" /> Attributed Employee
              </div>
              <div className="font-bold text-foreground text-sm">{order.employeeName}</div>
              <div className="text-muted-foreground text-[11px]">ID: {order.employeeId}</div>
            </div>
          </div>

          {/* Courier & Tracking */}
          <div className="rounded-xl border border-border bg-card p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Courier Fulfillment
              </span>
              <span className="font-mono text-muted-foreground text-[11px]">
                AWB: {order.trackingNumber || "N/A"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-muted-foreground block">Assigned Carrier</span>
                <span className="font-medium text-foreground">{order.courier || "Pending"}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Items Count</span>
                <span className="font-medium text-foreground">{order.itemsCount} SKUs</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Order Created</span>
                <span className="font-medium text-foreground">
                  {formatDateTime(order.orderDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="rounded-xl border border-border bg-muted/40 p-3.5 flex items-center justify-between">
            <div>
              <span className="text-muted-foreground block text-[11px]">Gross Order Amount</span>
              <span className="text-lg font-extrabold text-foreground">
                {formatCurrency(order.amount)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground block text-[11px]">Employee Commission (15%)</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(order.commission)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
