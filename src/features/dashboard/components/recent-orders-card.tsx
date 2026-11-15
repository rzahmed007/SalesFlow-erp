import * as React from "react";
import { Eye, Filter, ShoppingCart } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { OrderDetailModal } from "./order-detail-modal";
import { OrderItem, OrderStatus } from "../types";
import { formatCurrency, formatDate } from "@/lib/utils";

export interface RecentOrdersCardProps {
  initialOrders: OrderItem[];
  totalOrdersCount: number;
}

export const RecentOrdersCard: React.FC<RecentOrdersCardProps> = ({
  initialOrders,
  totalOrdersCount,
}) => {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderItem | null>(null);
  const pageSize = 5;

  // Client-side filtering & pagination for interactive demonstration
  const filteredOrders = React.useMemo(() => {
    return initialOrders.filter((order) => {
      const matchSearch =
        search === "" ||
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.employeeName.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [initialOrders, search, statusFilter]);

  const paginatedOrders = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success" dot size="sm">Delivered</Badge>;
      case "shipped":
        return <Badge variant="info" dot size="sm">Shipped</Badge>;
      case "processing":
        return <Badge variant="warning" dot size="sm">Processing</Badge>;
      case "confirmed":
        return <Badge variant="neutral" dot size="sm">Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline" dot size="sm">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive" dot size="sm">Cancelled</Badge>;
      default:
        return <Badge size="sm">{status}</Badge>;
    }
  };

  return (
    <>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-primary" />
                Recent Orders & Dispatch Status
              </CardTitle>
              <CardDescription>
                Live stream of sales orders with customer, courier attribution, and gross amounts
              </CardDescription>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2">
              <div className="w-44 sm:w-56">
                <SearchInput
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search orders..."
                />
              </div>

              <div className="w-32">
                <Select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="h-9 text-xs"
                >
                  <option value="all">All Statuses</option>
                  <option value="delivered">Delivered</option>
                  <option value="shipped">Shipped</option>
                  <option value="processing">Processing</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedOrders.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="No orders found"
                description="No matching orders found for the current search or status filter."
                action={
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead className="text-right w-[80px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium text-foreground text-xs">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        <div>{order.customerName}</div>
                        <div className="text-[10px] text-muted-foreground">
                          {order.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.employeeName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(order.orderDate)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        {formatCurrency(order.amount)}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() => setSelectedOrder(order)}
                          leftIcon={<Eye className="h-3.5 w-3.5" />}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 border-t border-border/70">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <OrderDetailModal
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
      />
    </>
  );
};
