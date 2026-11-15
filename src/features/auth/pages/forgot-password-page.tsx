import * as React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { AuthLayout } from "../components/auth-layout";
import { useAuth } from "../hooks/use-auth";
import { Button, Input, FormField } from "@/components/ui";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid business email address"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successInfo, setSuccessInfo] = React.useState<{
    message: string;
    resetLink?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "admin@jdwebnship.com",
    },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setErrorMsg(null);
    setSuccessInfo(null);
    setIsSubmitting(true);
    try {
      const res = await forgotPassword({ email: data.email });
      if (res.success) {
        setSuccessInfo({
          message: res.message || "Reset link generated.",
          resetLink: res.resetLink,
        });
      } else {
        setErrorMsg(res.message || "Failed to process password reset request.");
      }
    } catch {
      setErrorMsg("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your verified business email address and we'll help you reset your credentials"
    >
      {successInfo ? (
        <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                Reset Link Ready
              </h4>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                {successInfo.message}
              </p>
            </div>
          </div>

          {successInfo.resetLink && (
            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40">
              <p className="text-[11px] font-medium text-emerald-900 dark:text-emerald-200 mb-2">
                Phase 1 Mock Simulation Link:
              </p>
              <Link
                to={successInfo.resetLink}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline hover:opacity-80"
              >
                Proceed to Reset Password Screen <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          <div className="pt-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="w-full text-xs" leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}>
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {errorMsg && (
            <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          <FormField
            label="Business Email"
            htmlFor="forgot-email"
            required
            error={errors.email?.message}
            helperText="Enter the email address registered with your company"
          >
            <Input
              id="forgot-email"
              type="email"
              placeholder="name@company.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={!!errors.email}
              {...register("email")}
            />
          </FormField>

          <Button
            type="submit"
            className="w-full mt-2"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Send Reset Instructions
          </Button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};
