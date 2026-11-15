import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { navigationConfig, NavItem } from "./navigation-config";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
  onNavigateMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  className,
  onNavigateMobile,
}) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 select-none z-30 h-screen sticky top-0",
        isCollapsed ? "w-[72px]" : "w-[260px]",
        className
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center px-4 justify-between border-b border-sidebar-border shrink-0">
        <Link
          to="/dashboard"
          onClick={onNavigateMobile}
          className="flex items-center gap-3 overflow-hidden focus:outline-none"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-sm">
            <Package className="h-5 w-5" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col whitespace-nowrap overflow-hidden"
              >
                <span className="font-bold text-sm tracking-tight text-foreground">
                  JD WebnShip
                </span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                  Enterprise ERP
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Desktop Collapse Toggle Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
            isCollapsed && "mx-auto"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationConfig.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {group.groupTitle}
              </div>
            )}
            {isCollapsed && groupIdx > 0 && (
              <div className="my-2 border-t border-sidebar-border/60 mx-2" />
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                const navLinkContent = (
                  <Link
                    to={item.href}
                    onClick={onNavigateMobile}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150 outline-none",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isCollapsed && "justify-center px-0 py-2.5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-colors",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />

                    {!isCollapsed && (
                      <span className="flex-1 truncate">{item.title}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <Badge
                        variant={isActive ? "secondary" : "outline"}
                        size="sm"
                        className={cn(
                          "ml-auto text-[9px] px-1.5 py-0 font-normal",
                          isActive
                            ? "bg-primary-foreground/20 text-primary-foreground border-transparent"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );

                if (isCollapsed) {
                  return (
                    <Tooltip
                      key={item.href}
                      content={
                        <div className="space-y-0.5">
                          <p className="font-semibold">{item.title}</p>
                          {item.badge && (
                            <p className="text-[10px] text-zinc-400">
                              Status: {item.badge}
                            </p>
                          )}
                        </div>
                      }
                      position="right"
                    >
                      {navLinkContent}
                    </Tooltip>
                  );
                }

                return <div key={item.href}>{navLinkContent}</div>;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer (System status) */}
      {!isCollapsed && (
        <div className="p-3 border-t border-sidebar-border shrink-0">
          <div className="rounded-xl border border-border bg-muted/40 p-3 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground text-[11px]">
                JD WebnShip
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Phase 1 Enterprise Foundation
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
