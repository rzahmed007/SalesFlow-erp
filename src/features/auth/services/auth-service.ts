import {
  User,
  LoginCredentials,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
  AuthSession,
} from "../types";

const STORAGE_SESSION_KEY = "jd_webnship_auth_session";
const STORAGE_USERS_KEY = "jd_webnship_mock_users";

// Initial mock administrator user
const DEFAULT_DEMO_USER: User = {
  id: "usr-admin-001",
  name: "Ahmed Raza",
  email: "admin@jdwebnship.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  department: "Executive Operations",
  phone: "+1 (555) 019-2834",
  status: "active",
  lastLoginAt: new Date().toISOString(),
};

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentSession(): AuthSession | null;
  forgotPassword(payload: ForgotPasswordPayload): Promise<AuthResponse>;
  resetPassword(payload: ResetPasswordPayload): Promise<AuthResponse>;
}

class MockAuthService implements IAuthService {
  private delay(ms = 600): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getCurrentSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!raw) return null;
      const session: AuthSession = JSON.parse(raw);
      // Validate expiration
      if (new Date(session.expiresAt) <= new Date()) {
        this.logout();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.delay(700);

    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    // Check credentials (accept demo account or standard test accounts)
    if (
      (email === "admin@jdwebnship.com" && password === "password123") ||
      (email === "manager@jdwebnship.com" && password === "password123") ||
      (email === "demo@jdwebnship.com" && password === "password123")
    ) {
      const role = email.includes("manager") ? "manager" : "admin";
      const name = email.includes("manager") ? "Sarah Jenkins" : "Ahmed Raza";

      const user: User = {
        ...DEFAULT_DEMO_USER,
        name,
        email,
        role,
        lastLoginAt: new Date().toISOString(),
      };

      const expirationDays = credentials.rememberMe ? 30 : 1;
      const expiresAt = new Date(
        Date.now() + expirationDays * 24 * 60 * 60 * 1000
      ).toISOString();

      const session: AuthSession = {
        user,
        token: `mock-jwt-token-${Math.random().toString(36).substring(2)}`,
        expiresAt,
      };

      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

      return {
        success: true,
        user,
        token: session.token,
        message: "Successfully logged in",
      };
    }

    // Invalid credentials error
    return {
      success: false,
      message: "Invalid email or password. Please try again or use the demo credentials.",
    };
  }

  async logout(): Promise<void> {
    await this.delay(200);
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }

  async forgotPassword(payload: ForgotPasswordPayload): Promise<AuthResponse> {
    await this.delay(800);
    const email = payload.email.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Please provide a valid email address.",
      };
    }

    // Generates mock reset link for simulation
    const resetToken = "mock-reset-" + Math.random().toString(36).substring(2, 10);
    const mockResetLink = `/reset-password?token=${resetToken}&email=${encodeURIComponent(
      email
    )}`;

    return {
      success: true,
      message:
        "Password reset instructions have been simulated for this email. (Phase 1 Mock Mode: use the direct reset link below to test).",
      resetLink: mockResetLink,
    };
  }

  async resetPassword(payload: ResetPasswordPayload): Promise<AuthResponse> {
    await this.delay(800);

    if (payload.password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters long.",
      };
    }

    if (payload.password !== payload.confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match.",
      };
    }

    return {
      success: true,
      message: "Your password has been successfully updated. You can now log in.",
    };
  }
}

export const authService = new MockAuthService();
