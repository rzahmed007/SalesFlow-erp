import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength = false, value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [passwordValue, setPasswordValue] = React.useState(String(value || ""));

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    // Calculate password strength
    const strengthScore = React.useMemo(() => {
      const val = String(value ?? passwordValue);
      if (!val) return 0;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      return score;
    }, [value, passwordValue]);

    const getStrengthLabel = (score: number) => {
      switch (score) {
        case 0:
        case 1:
          return { label: "Weak", color: "bg-red-500", text: "text-red-500" };
        case 2:
          return { label: "Fair", color: "bg-amber-500", text: "text-amber-500" };
        case 3:
          return { label: "Good", color: "bg-blue-500", text: "text-blue-500" };
        case 4:
          return { label: "Strong", color: "bg-green-600", text: "text-green-600" };
        default:
          return { label: "", color: "bg-muted", text: "text-muted-foreground" };
      }
    };

    const strength = getStrengthLabel(strengthScore);

    return (
      <div className="w-full space-y-1.5">
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            value={value}
            onChange={handleValueChange}
            className={cn("pr-10", className)}
            {...props}
          />
        </div>

        {showStrength && (value || passwordValue) && (
          <div className="space-y-1 pt-1">
            <div className="flex gap-1.5 h-1.5 w-full">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-full flex-1 rounded-full transition-all duration-300",
                    strengthScore >= level ? strength.color : "bg-muted"
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Password strength:</span>
              <span className={cn("font-medium", strength.text)}>{strength.label}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
