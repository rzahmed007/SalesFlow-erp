import {
  User,
  LoginCredentials,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  AuthResponse,
  AuthSession,
} from "../types";

const STORAGE_SESSION_KEY = "jd_webnship_auth_session";

// Fallback in-memory store for SSR or non-browser environments
let memoryStore: Record<string, string> = {};

const getStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return memoryStore[key] || null;
    }
  }
  return memoryStore[key] || null;
};

const setStorageItem = (key: string, value: string): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      memoryStore[key] = value;
    }
  } else {
    memoryStore[key] = value;
  }
};

const removeStorageItem = (key: string): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      delete memoryStore[key];
    }
  } else {
    delete memoryStore[key];
  }
};

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
  private delay(ms = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getCurrentSession(): AuthSession | null {
    try {
      const raw = getStorageItem(STORAGE_SESSION_KEY);
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
    await this.delay(300);

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

      setStorageItem(STORAGE_SESSION_KEY, JSON.stringify(session));

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
    await this.delay(100);
    removeStorageItem(STORAGE_SESSION_KEY);
  }

  async forgotPassword(payload: ForgotPasswordPayload): Promise<AuthResponse> {
    await this.delay(300);
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
    await this.delay(300);

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
