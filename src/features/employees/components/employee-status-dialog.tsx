import * as React from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Employee, EmployeeStatus } from "../types";

export interface EmployeeStatusDialogProps {
  employee: Employee | null;
  targetStatus: EmployeeStatus | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isUpdating?: boolean;
}

export const EmployeeStatusDialog: React.FC<EmployeeStatusDialogProps> = ({
  employee,
  targetStatus,
  open,
  onOpenChange,
  onConfirm,
  isUpdating = false,
}) => {
  if (!employee || !targetStatus) return null;

  const isSuspension = targetStatus === "suspended";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full mb-2 ${
              isSuspension
                ? "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                : "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
            }`}
          >
            {isSuspension ? <ShieldAlert className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          </div>
          <DialogTitle>
            {isSuspension ? "Suspend Employee Account" : `Change Status to ${targetStatus.toUpperCase()}`}
          </DialogTitle>
          <DialogDescription>
            {isSuspension
              ? `Suspending ${employee.fullName} will immediately revoke ERP system access and pause active courier dispatch attribution.`
              : `Are you sure you want to mark ${employee.fullName} as ${targetStatus}?`}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant={isSuspension ? "destructive" : "default"}
            size="sm"
            onClick={onConfirm}
            isLoading={isUpdating}
          >
            Confirm {targetStatus.toUpperCase()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
