import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/login-page";
import { ForgotPasswordPage } from "@/features/auth/pages/forgot-password-page";
import { ResetPasswordPage } from "@/features/auth/pages/reset-password-page";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { AppLayout } from "@/layouts/app-layout";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected Application Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* BRD Module Navigation Placeholders (Scheduled for subsequent phases) */}
          <Route path="/employees" element={<PlaceholderPage />} />
          <Route path="/employee-performance" element={<PlaceholderPage />} />
          <Route path="/products" element={<PlaceholderPage />} />
          <Route path="/commission-rules" element={<PlaceholderPage />} />
          <Route path="/sales" element={<PlaceholderPage />} />
          <Route path="/orders" element={<PlaceholderPage />} />
          <Route path="/shipments" element={<PlaceholderPage />} />
          <Route path="/courier-tracking" element={<PlaceholderPage />} />
          <Route path="/returns" element={<PlaceholderPage />} />
          <Route path="/rto-management" element={<PlaceholderPage />} />
          <Route path="/commission-overview" element={<PlaceholderPage />} />
          <Route path="/employee-earnings" element={<PlaceholderPage />} />
          <Route path="/payouts" element={<PlaceholderPage />} />
          <Route path="/reports/sales" element={<PlaceholderPage />} />
          <Route path="/reports/shipments" element={<PlaceholderPage />} />
          <Route path="/reports/commission" element={<PlaceholderPage />} />
          <Route path="/settings/profile" element={<PlaceholderPage />} />
          <Route path="/settings/general" element={<PlaceholderPage />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
