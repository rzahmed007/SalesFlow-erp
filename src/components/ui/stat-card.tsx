import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: number; // e.g. 14.2 for +14.2%
  changePeriod?: string; // e.g. "vs last month"
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  description?: string;
  className?: string;
  index?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  changePeriod = "vs last month",
  icon,
  trend = change !== undefined ? (change >= 0 ? "up" : "down") : "neutral",
  description,
  className,
  index = 0,
}) => {
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        hoverable
        className={cn(
          "p-5 relative overflow-hidden transition-all duration-200 group border-border/80 hover:border-foreground/20",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              {label}
            </span>
            <div className="text-2xl font-bold tracking-tight text-foreground font-sans">
              {value}
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground/80 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            {icon}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs">
          {change !== undefined && (
            <div className="flex items-center gap-1 font-medium">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold gap-0.5",
                  isPositive &&
                    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
                  isNegative &&
                    "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
                  trend === "neutral" && "bg-muted text-muted-foreground"
                )}
              >
                {isPositive && <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />}
                {isNegative && <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />}
                {trend === "neutral" && <Minus className="h-3 w-3" />}
                {change > 0 ? `+${change}%` : `${change}%`}
              </span>
              <span className="text-muted-foreground ml-1">{changePeriod}</span>
            </div>
          )}

          {description && !change && (
            <span className="text-muted-foreground text-[11px]">{description}</span>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
