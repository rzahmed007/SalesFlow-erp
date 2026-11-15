import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { AuthLayout } from "../components/auth-layout";
import { useAuth } from "../hooks/use-auth";
import { Button, PasswordInput, FormField, useToast } from "@/components/ui";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const currentPassword = watch("password");

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const res = await resetPassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (res.success) {
        setIsSuccess(true);
        toast.success("Password Updated", "Your password has been reset successfully.");
      } else {
        setErrorMsg(res.message || "Failed to reset password.");
      }
    } catch {
      setErrorMsg("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Create a secure enterprise password to protect your account and company data"
    >
      {isSuccess ? (
        <div className="space-y-5 rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 text-center dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-semibold text-emerald-900 dark:text-emerald-200">
              Password Reset Successfully
            </h4>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
              Your new password has been verified and saved. You can now use it to sign in.
            </p>
          </div>

          <Button
            className="w-full"
            onClick={() => navigate("/login")}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Continue to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {errorMsg && (
            <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {/* New Password */}
          <FormField
            label="New Password"
            htmlFor="new-password"
            required
            error={errors.password?.message}
          >
            <PasswordInput
              id="new-password"
              placeholder="••••••••"
              showStrength
              error={!!errors.password}
              {...register("password")}
            />
          </FormField>

          {/* Confirm Password */}
          <FormField
            label="Confirm New Password"
            htmlFor="confirm-password"
            required
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              id="confirm-password"
              placeholder="••••••••"
              error={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
          </FormField>

          {/* Real-time Password Rules Checklist */}
          <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 text-[11px] space-y-1.5">
            <span className="font-semibold text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Password Requirements:
            </span>
            <ul className="space-y-1 text-muted-foreground">
              <li
                className={
                  currentPassword?.length >= 8
                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                    : ""
                }
              >
                • Minimum 8 characters
              </li>
              <li
                className={
                  /[A-Z]/.test(currentPassword || "")
                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                    : ""
                }
              >
                • At least one uppercase letter (A-Z)
              </li>
              <li
                className={
                  /[0-9]/.test(currentPassword || "")
                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                    : ""
                }
              >
                • At least one numerical digit (0-9)
              </li>
              <li
                className={
                  /[^A-Za-z0-9]/.test(currentPassword || "")
                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                    : ""
                }
              >
                • At least one special symbol (!@#$%^&*)
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Update Password
          </Button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Cancel and return to sign in
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};
