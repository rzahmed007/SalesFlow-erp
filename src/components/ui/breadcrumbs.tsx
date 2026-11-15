import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  showHome = true,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1.5 text-xs text-muted-foreground", className)}
    >
      {showHome && (
        <>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
          {items.length > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50 shrink-0" />}
        </>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-foreground transition-colors truncate max-w-[150px]"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "truncate max-w-[200px]",
                  isLast ? "font-semibold text-foreground" : ""
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 opacity-50 shrink-0" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
