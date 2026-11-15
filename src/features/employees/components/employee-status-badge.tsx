import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { EmployeeStatus } from "../types";

export const EmployeeStatusBadge: React.FC<{
  status: EmployeeStatus;
  size?: "sm" | "default" | "lg";
  className?: string;
}> = ({ status, size = "sm", className }) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="success" dot size={size} className={className}>
          Active
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="neutral" dot size={size} className={className}>
          Inactive
        </Badge>
      );
    case "suspended":
      return (
        <Badge variant="error" dot size={size} className={className}>
          Suspended
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" size={size} className={className}>
          {status}
        </Badge>
      );
  }
};
