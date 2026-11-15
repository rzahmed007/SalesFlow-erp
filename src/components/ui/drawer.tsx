import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  title?: string;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  side = "left",
  title,
  className,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const slideVariants = {
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
    },
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <div
            className={cn(
              "fixed inset-y-0 flex max-w-full",
              side === "left" ? "left-0" : "right-0"
            )}
          >
            <motion.div
              initial={slideVariants[side].initial}
              animate={slideVariants[side].animate}
              exit={slideVariants[side].exit}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "relative w-screen max-w-xs sm:max-w-md bg-card border-r border-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto",
                side === "right" && "border-l border-r-0",
                className
              )}
            >
              <div className="flex items-center justify-between pb-4 border-b border-border">
                {title ? (
                  <h3 className="font-semibold text-foreground text-base">{title}</h3>
                ) : (
                  <div />
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 py-4">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
