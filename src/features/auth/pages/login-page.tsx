import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, AlertCircle, ArrowRight, KeyRound } from "lucide-react";
import { AuthLayout } from "../components/auth-layout";
import { useAuth } from "../hooks/use-auth";
import {
  Button,
  Input,
  PasswordInput,
  Checkbox,
  FormField,
  useToast,
} from "@/components/ui";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid business email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@jdwebnship.com",
      password: "password123",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      const res = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (res.success) {
        toast.success("Welcome back!", `Signed in as ${res.user?.name}`);
        navigate(from, { replace: true });
      } else {
        setAuthError(res.message || "Failed to sign in. Please verify your credentials.");
      }
    } catch {
      setAuthError("An unexpected error occurred during authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = (type: "admin" | "manager") => {
    if (type === "admin") {
      setValue("email", "admin@jdwebnship.com");
      setValue("password", "password123");
    } else {
      setValue("email", "manager@jdwebnship.com");
      setValue("password", "password123");
    }
    setAuthError(null);
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Enter your enterprise credentials to access the ERP management console"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Invalid credentials banner */}
        {authError && (
          <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">Authentication failed: </span>
              {authError}
            </div>
          </div>
        )}

        {/* Email input */}
        <FormField
          label="Business Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            autoComplete="email"
            leftIcon={<Mail className="h-4 w-4" />}
            error={!!errors.email}
            {...register("email")}
          />
        </FormField>

        {/* Password input */}
        <FormField
          label="Password"
          htmlFor="password"
          required
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            error={!!errors.password}
            {...register("password")}
          />
        </FormField>

        {/* Remember me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <Checkbox
            id="rememberMe"
            label="Remember this device"
            {...register("rememberMe")}
          />
          <Link
            to="/forgot-password"
            className="font-medium text-foreground hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full mt-2"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Sign In
        </Button>

        {/* Demo Credentials Helper Pill */}
        <div className="rounded-xl border border-border/80 bg-muted/40 p-3.5 mt-6 text-xs space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5" />
              Demo Credentials
            </span>
            <span className="text-[10px] uppercase font-semibold text-zinc-500">
              Mock Auth Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo("admin")}
              className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-left hover:bg-accent transition-colors"
            >
              <div className="font-semibold text-foreground text-[11px]">Administrator</div>
              <div className="text-[10px] text-muted-foreground truncate">
                admin@jdwebnship.com
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo("manager")}
              className="flex-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-left hover:bg-accent transition-colors"
            >
              <div className="font-semibold text-foreground text-[11px]">Sales Manager</div>
              <div className="text-[10px] text-muted-foreground truncate">
                manager@jdwebnship.com
              </div>
            </button>
          </div>
          <div className="text-[10px] text-muted-foreground text-center">
            Password: <code className="bg-background px-1 py-0.5 rounded border border-border">password123</code>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};
