import * as React from "react";
import { motion } from "framer-motion";
import { Package, ShieldCheck, ArrowUpRight, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen w-full flex bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Theme toggle in top right */}
      <div className="absolute top-5 right-5 z-20">
        <ThemeToggle />
      </div>

      {/* Left / Main form section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm sm:max-w-md">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-foreground font-sans">
                JD WebnShip
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                Enterprise Logistics & Sales ERP
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>

          {/* Footer note */}
          <div className="mt-8 text-center text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} JD WebnShip Inc. All rights reserved. • Monochromatic Enterprise Edition
          </div>
        </div>
      </div>

      {/* Right hero side banner (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 text-white overflow-hidden p-12 flex-col justify-between border-l border-border/20">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient glowing radial blur */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-xs font-medium text-zinc-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Verified Enterprise Platform
          </span>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Unified Sales, Courier Dispatch & Automated Commission Architecture
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Designed specifically for multi-tier employee sales teams, integrated courier
              tracking, real-time RTO management, and transparent commission settlements.
            </p>
          </div>

          {/* Interactive KPI highlight box */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Monthly Dispatch</span>
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-white mt-1">14,250+</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> +18.4% this quarter
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Avg Commission Paid</span>
                <Package className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white mt-1">99.8%</div>
              <div className="text-[11px] text-zinc-400 mt-1">On-schedule settlement</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-zinc-500 flex items-center justify-between">
          <span>JD WebnShip ERP v1.0.0</span>
          <span>Phase 1 Architecture Foundation</span>
        </div>
      </div>
    </div>
  );
};
