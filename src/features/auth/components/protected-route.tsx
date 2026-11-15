import * as React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { LoadingState } from "@/components/ui";

export const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingState fullScreen message="Verifying security credentials..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
