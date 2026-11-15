import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required,
  htmlFor,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={htmlFor}
            className="text-xs font-semibold text-foreground tracking-tight select-none"
          >
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>
        </div>
      )}
      {children}
      {error ? (
        <p className="text-[11px] font-medium text-destructive animate-in fade-in-50 duration-150">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
};
