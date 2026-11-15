import * as React from "react";
import {
  Clock,
  Package,
  TrendingUp,
  DollarSign,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActivityItem } from "../types";

export interface RecentActivityCardProps {
  data: ActivityItem[];
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ data }) => {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "shipment":
        return <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case "order":
        return <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case "delivery":
        return <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      case "commission":
        return <DollarSign className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case "employee":
        return <UserCheck className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-foreground" />;
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Live Activity Stream
            </CardTitle>
            <CardDescription>
              Chronological log of orders, dispatch handovers, and milestone events
            </CardDescription>
          </div>
          <Badge variant="outline" size="sm">
            Realtime
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {data.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-6 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border shadow-xs group-hover:scale-110 transition-transform">
                {getIcon(item.type)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {item.description}
                </p>
                {item.meta && (
                  <div className="pt-0.5">
                    <Badge variant="neutral" size="sm" className="text-[9px] py-0 px-1.5 font-normal">
                      {item.meta}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
