import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Standalone event-based toast trigger for calling outside of React render tree
type ToastListener = (toast: Omit<ToastItem, "id">) => void;
const toastListeners = new Set<ToastListener>();

export const toast = {
  success: (title: string, description?: string, duration?: number) => {
    toastListeners.forEach((listener) =>
      listener({ type: "success", title, description, duration })
    );
  },
  error: (title: string, description?: string, duration?: number) => {
    toastListeners.forEach((listener) =>
      listener({ type: "error", title, description, duration })
    );
  },
  warning: (title: string, description?: string, duration?: number) => {
    toastListeners.forEach((listener) =>
      listener({ type: "warning", title, description, duration })
    );
  },
  info: (title: string, description?: string, duration?: number) => {
    toastListeners.forEach((listener) =>
      listener({ type: "info", title, description, duration })
    );
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    ({ type, title, description, duration = 4000 }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, type, title, description, duration };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  React.useEffect(() => {
    toastListeners.add(addToast);
    return () => {
      toastListeners.delete(addToast);
    };
  }, [addToast]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
    error: <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
    info: <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2 p-4 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-premium text-card-foreground"
            >
              <div className="mt-0.5 shrink-0">{icons[item.type]}</div>
              <div className="flex-1 space-y-0.5">
                <p className="text-xs font-semibold text-foreground">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(item.id)}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    return toast;
  }
  return { ...toast, ...context };
};
