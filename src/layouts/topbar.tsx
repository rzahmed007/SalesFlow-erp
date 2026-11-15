import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  User as UserIcon,
  Settings as SettingsIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from "@/components/ui/dropdown";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NotificationDropdown } from "./notification-dropdown";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { navigationConfig } from "./navigation-config";

export interface TopbarProps {
  onOpenMobileNav: () => void;
  onOpenSearch: () => void;
  onOpenLogout: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileNav,
  onOpenSearch,
  onOpenLogout,
}) => {
  const { user } = useAuth();
  const location = useLocation();

  // Compute dynamic breadcrumbs from current pathname
  const breadcrumbItems = React.useMemo<BreadcrumbItem[]>(() => {
    const allItems = navigationConfig.flatMap((g) =>
      g.items.map((i) => ({ ...i, group: g.groupTitle }))
    );
    const matched = allItems.find((i) => i.href === location.pathname);

    if (location.pathname === "/dashboard") {
      return [{ label: "Executive Dashboard" }];
    }

    if (matched) {
      return [
        { label: matched.group },
        { label: matched.title },
      ];
    }

    // Fallback for custom or nested paths
    const segments = location.pathname.split("/").filter(Boolean);
    return segments.map((seg, idx) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      href: idx < segments.length - 1 ? `/${seg}` : undefined,
    }));
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Right: Search, Theme, Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Button */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex h-9 items-center gap-2 rounded-lg border border-input bg-muted/40 px-3 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors max-w-[200px] sm:max-w-[240px]"
          aria-label="Search"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Search...</span>
          <span className="sm:hidden">Search</span>
          <kbd className="hidden sm:inline-flex h-4 items-center rounded border border-border bg-background px-1.5 font-mono text-[9px] text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Dropdown */}
        <NotificationDropdown />

        <div className="h-5 w-px bg-border mx-0.5" />

        {/* User Profile Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <div className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-accent/60 transition-colors cursor-pointer select-none">
              <Avatar
                src={user?.avatar}
                fallback={user?.name || "Admin"}
                size="sm"
                status="online"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground leading-tight truncate max-w-[120px]">
                  {user?.name || "Ahmed Raza"}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  {user?.role === "admin" ? "Administrator" : "Manager"}
                </span>
              </div>
              <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </DropdownTrigger>

          <DropdownContent align="right" width="w-56">
            <div className="px-3 py-2 border-b border-border/80">
              <div className="text-xs font-semibold text-foreground truncate">
                {user?.name}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                {user?.email}
              </div>
              <Badge variant="outline" size="sm" className="mt-1.5 text-[9px]">
                {user?.department || "Executive Operations"}
              </Badge>
            </div>

            <DropdownLabel>Navigation</DropdownLabel>
            <Link to="/settings/profile">
              <DropdownItem icon={<UserIcon className="h-3.5 w-3.5" />}>
                My Profile
              </DropdownItem>
            </Link>
            <Link to="/settings/general">
              <DropdownItem icon={<SettingsIcon className="h-3.5 w-3.5" />}>
                General Settings
              </DropdownItem>
            </Link>

            <DropdownSeparator />

            <DropdownItem
              icon={<LogOut className="h-3.5 w-3.5" />}
              destructive
              onClick={onOpenLogout}
            >
              Sign Out
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
};
