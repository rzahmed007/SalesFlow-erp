# JD WebnShip — Enterprise Sales, Courier, Shipment & Commission Management System

> **Phase 1: Project Foundation, Authentication, Application Layout & Dashboard**  
> Premium enterprise SaaS interface built with a monochromatic Black & White design system, high performance, and strict Phase Boundary enforcement.

---

## 🚀 Quick Start

### Installation & Run

```bash
# Install dependencies
npm install

# Start Vite Development Server
npm run dev

# Run Automated Verification Tests (43 Unit & Integration Tests)
npm test

# Build for Production
npm run build
```

The application will be accessible at `http://localhost:3000` (or `http://localhost:5173`).

---

## 🔐 Demo Credentials (Mock Authentication Mode)

The Phase 1 release includes an isolated, swappable mock authentication service with pre-seeded enterprise accounts:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin@jdwebnship.com` | `password123` | Full ERP System Access |
| **Sales Manager** | `manager@jdwebnship.com` | `password123` | Sales & Operations Access |

*Note: One-click demo credentials autofill pills are provided directly on the login screen for instant evaluation.*

---

## 🎨 Design Direction: Monochromatic Enterprise SaaS

Designed around a refined black-and-white monochromatic system with semantic accent indicators:

| Element | Light Mode | Dark Mode |
|---|---|---|
| **Primary Background** | `#FFFFFF` | `#090B0E` |
| **Foreground / Text** | `#111111` | `#FAFAFA` |
| **Secondary Text** | `#6B7280` | `#A1A1AA` |
| **Sidebar Background** | `#FFFFFF` | `#0E1015` |
| **Card Background** | `#FFFFFF` | `#11141A` |
| **Borders** | `#E5E7EB` | `#27272A` |
| **Hover Surfaces** | `#F5F5F5` | `#1B1E26` |
| **Semantic Success** | `#16A34A` | `#22C55E` |
| **Semantic Warning** | `#D97706` | `#F59E0B` |
| **Semantic Error** | `#DC2626` | `#EF4444` |
| **Semantic Info** | `#2563EB` | `#3B82F6` |

---

## 📂 Architecture Overview

The codebase is organized in a feature-based scalable modular structure:

```
src/
├── app/
│   ├── providers/          # ThemeProvider, AuthProvider, ToastProvider, QueryClientProvider
│   └── router/             # React Router v7 configuration with ProtectedRoute wrappers
├── components/
│   ├── shared/             # ThemeToggle, PlaceholderPage (Phase boundary enforcement)
│   └── ui/                 # 27 atomic reusable design system components:
│                           # Button, IconButton, Input, PasswordInput, Checkbox, Select,
│                           # Dropdown, Badge, Avatar, Tooltip, Dialog, Drawer, Card, Tabs,
│                           # Table, Pagination, Skeleton, EmptyState, ErrorState,
│                           # LoadingState, Toast, Breadcrumbs, SearchInput, DatePicker,
│                           # FormField, SectionHeader, PageHeader, StatCard
├── features/
│   ├── auth/               # Login, Forgot Password, Reset Password, Auth Context & Service
│   └── dashboard/          # Header, 6 KPI cards, Sales AreaChart, Order DonutChart,
│                           # Shipment Analytics, Commission Breakdown, Employee Rankings,
│                           # Recent Orders Table (Search + Filter + Pagination),
│                           # Order Details Modal, Live Activity Timeline
├── layouts/                # Master AppLayout, Collapsible Sidebar with Tooltips,
│                           # Sticky Topbar with Dynamic Breadcrumbs, Notification Dropdown,
│                           # Global Search Command Palette (Cmd+K), Logout Confirmation Dialog
└── lib/                    # Formatting helpers (Currency, Dates, Numbers) & Tailwind utils
```

---

## 🛠️ Implemented Features in Phase 1

### 1. Authentication Module
- **Login (`/login`)**: Business email, password with visibility toggle, remember-me checkbox, instant demo auto-fill helpers, Zod validation, error banners.
- **Forgot Password (`/forgot-password`)**: Business email entry, validation, simulated reset link generation.
- **Reset Password (`/reset-password`)**: Real-time password requirement checklist (8+ chars, uppercase, number, symbol), password strength meter, confirmation validation.
- **Session Handling**: Protected routes, persistence in storage with expiration validation, safe fallback for server-side execution.

### 2. Application Layout
- **Sidebar**:
  - JD WebnShip geometric brand icon and application title.
  - Collapsible mode (72px vs 260px) with persistent state and tooltips.
  - 9 navigation groups mapping directly to the BRD.
  - Active route indicators and smooth hover feedback.
  - Mobile slide-out drawer navigation.
- **Topbar**:
  - Dynamic breadcrumb path derived from the current route.
  - Global Search button with keyboard shortcut (`⌘K` / `Ctrl+K`) opening an interactive search palette.
  - Interactive notification bell with unread badge counter, category filters, and mark-as-read actions.
  - Light/Dark mode switcher with persistent preference.
  - User avatar with online status badge and profile menu with sign-out confirmation.

### 3. Executive Dashboard (`/dashboard`)
- **Dashboard Header**: Dynamic greeting, current date, date range selector (Today, Last 7 Days, This Month, etc.), manual refresh trigger, CSV/PDF report export.
- **6 KPI Cards**:
  1. *Total Sales*: $124,580.00 (+14.2% vs last month)
  2. *Total Orders*: 1,842 (+8.7% vs last month)
  3. *Active Employees*: 28 (+7.1% vs last month)
  4. *Total Shipments*: 1,695 (+11.3% vs last month)
  5. *Total Commission*: $18,687.00 (+12.5% vs last month)
  6. *Delivered Orders*: 1,520 (89.7% delivery SLA rate)
- **Sales Analytics**: Recharts AreaChart with Daily / Weekly / Monthly view toggles, sales vs target comparison, responsive tooltips, and theme-adaptive gridlines.
- **Order Overview**: Donut chart with 6 lifecycle statuses (Delivered, Shipped, Processing, Confirmed, Pending, Cancelled) and center order counter.
- **Shipment Overview**: Carrier SLA analytics, delivery success rate (89.7%), RTO percentage (4.2%), and individual carrier stage progress bars.
- **Commission Overview**: Accrued commission progress bar ($18,687.00), segmented into Paid ($9,556.50), Approved ($5,890.00), and Pending Audit ($3,240.50).
- **Employee Performance**: Top 5 sales agents leaderboard with rank badges, orders count, sales gross, and commission earned.
- **Recent Orders**: Interactive table with search input, status filter, pagination, and a "View" action opening the **Order Details Modal** displaying customer info, courier tracking (AWB), item count, and commission breakdown.
- **Live Activity Stream**: Real-time event log for new orders, courier handovers, deliveries, commission credits, and employee milestones.

---

## 🛡️ Strict Phase Boundary Enforcement

In strict compliance with project guidelines, business modules scheduled for later phases (Employees, Products, Commission Rules, Orders, Shipments, Courier Tracking, Returns, RTO Management, Payouts, Reports) are represented in the sidebar navigation as architectural placeholders. Clicking any of these routes displays a standardized `PlaceholderPage` containing:
- Target phase release timeline badge (Phase 2 through Phase 8).
- Notice explaining the BRD specification and phase scope.
- List of planned capabilities for that module.
- Quick navigation shortcut back to the live Executive Dashboard.

---

## ✅ Quality & Verification

- **TypeScript Strict Mode**: Zero compile errors (`npx tsc --noEmit`).
- **Production Build**: Cleanly compiled with Vite code-splitting chunks (`npm run build`).
- **Automated Test Suite**: 43 passed test assertions across navigation, auth service, and dashboard telemetry (`npm test`).
