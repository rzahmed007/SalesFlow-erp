import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, label, description, checked, onChange, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex items-start space-x-2.5">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              "flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded border border-input bg-background transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-primary-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              className
            )}
          >
            <Check className="h-3 w-3 opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
          </label>
        </div>
        {(label || description) && (
          <div className="grid gap-1 leading-none select-none">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "text-sm font-medium leading-none cursor-pointer text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  disabled && "cursor-not-allowed opacity-70"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
