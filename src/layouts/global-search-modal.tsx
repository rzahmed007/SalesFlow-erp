import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Sun, Moon, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { navigationConfig } from "./navigation-config";
import { useTheme } from "@/app/providers/theme-provider";
import { Badge } from "@/components/ui/badge";

export interface GlobalSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenLogout: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  open,
  onOpenChange,
  onOpenLogout,
}) => {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const { toggleTheme, resolvedTheme } = useTheme();

  const allNavItems = React.useMemo(() => {
    return navigationConfig.flatMap((group) =>
      group.items.map((item) => ({ ...item, group: group.groupTitle }))
    );
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return allNavItems.slice(0, 8);
    const q = query.toLowerCase();
    return allNavItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [allNavItems, query]);

  const handleSelectRoute = (href: string) => {
    onOpenChange(false);
    navigate(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="lg" showClose={false} className="p-0 overflow-hidden">
        {/* Search header input */}
        <div className="flex items-center px-4 border-b border-border bg-muted/20">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, modules, or commands... (e.g. Orders, Payouts, Theme)"
            className="h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Search results list */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No matching pages or modules found for "{query}".
            </div>
          ) : (
            <>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Pages & Modules
              </div>
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleSelectRoute(item.href)}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-xs text-left hover:bg-accent transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground flex items-center gap-2">
                          {item.title}
                          {item.badge && (
                            <Badge variant="outline" size="sm" className="text-[9px] py-0">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {item.group} • {item.description}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </>
          )}

          {/* Quick command actions */}
          <div className="pt-2 mt-2 border-t border-border">
            <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Quick System Actions
            </div>
            <button
              type="button"
              onClick={() => {
                toggleTheme();
                onOpenChange(false);
              }}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-left hover:bg-accent transition-colors"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-foreground" />
              )}
              <span className="font-medium text-foreground">
                Toggle Theme ({resolvedTheme === "dark" ? "Switch to Light" : "Switch to Dark"})
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onOpenLogout();
              }}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-left text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Sign Out of JD WebnShip</span>
            </button>
          </div>
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-muted/40 text-[11px] text-muted-foreground">
          <span>Navigate with arrows or click</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-background border border-border">↵</kbd> to select
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
