import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Compass,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navigationConfig, NavItem } from "@/layouts/navigation-config";

export const PlaceholderPage: React.FC<{
  title?: string;
  phase?: string;
  description?: string;
}> = ({ title: propTitle, phase: propPhase, description: propDescription }) => {
  const location = useLocation();

  // Find matching nav item
  const allItems: NavItem[] = navigationConfig.flatMap((g) => g.items);
  const matched = allItems.find((item) => item.href === location.pathname);

  const title = propTitle || matched?.title || "Upcoming Module";
  const phase = propPhase || matched?.phase || "Future Phase";
  const description =
    propDescription ||
    matched?.description ||
    "This business module is scheduled for development in a subsequent phase per the JD WebnShip BRD.";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: title },
            ]}
          />
        }
        actions={
          <Link to="/dashboard">
            <Button variant="outline" size="sm" leftIcon={<Compass className="h-3.5 w-3.5" />}>
              Back to Dashboard
            </Button>
          </Link>
        }
      />

      {/* Phase Boundary Notice */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 text-xs">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-900 dark:text-amber-200">
                Phase Boundary Enforcement
              </span>
              <Badge variant="warning" size="sm">
                Scheduled for {phase}
              </Badge>
            </div>
            <p className="text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
              In accordance with project rules, only Phase 1 (Foundation, Authentication, Application Layout & Dashboard) is implemented. This navigation item serves as an architectural placeholder matching the BRD specifications.
            </p>
          </div>
        </div>
      </div>

      {/* Module Overview Card */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                {title} — Scope & Implementation Roadmap
              </CardTitle>
              <CardDescription>
                Architectural blueprint and data contract definitions for {title}
              </CardDescription>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              Status: Planned
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Clock className="h-3.5 w-3.5 text-primary" /> Target Release
              </div>
              <div className="text-sm font-semibold text-foreground">{phase}</div>
              <p className="text-[11px] text-muted-foreground">Follows Phase 1 foundation rollout</p>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Calendar className="h-3.5 w-3.5 text-emerald-600" /> Current Phase Status
              </div>
              <div className="text-sm font-semibold text-foreground">Phase 1 Active</div>
              <p className="text-[11px] text-muted-foreground">Auth, Layout & Dashboard completed</p>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> UI Architecture
              </div>
              <div className="text-sm font-semibold text-foreground">Route & Nav Ready</div>
              <p className="text-[11px] text-muted-foreground">Standardized design system linked</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Planned Capabilities for this Module
            </h4>
            <div className="rounded-lg border border-border bg-background p-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Seamless integration with JD WebnShip centralized data services</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Role-based access control (Administrator, Operations, Sales Employee)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Exportable audit logs and automated reconciliation reports</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link to="/dashboard">
              <Button size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Go to Live Executive Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
