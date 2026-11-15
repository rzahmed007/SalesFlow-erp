import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

export const Dropdown: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger: React.FC<{
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}> = ({ children, className }) => {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error("DropdownTrigger must be used within Dropdown");

  return (
    <div
      onClick={() => context.setIsOpen((prev) => !prev)}
      className={cn("cursor-pointer inline-flex items-center", className)}
    >
      {children}
    </div>
  );
};

export const DropdownContent: React.FC<{
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
  className?: string;
}> = ({ children, align = "right", width = "w-56", className }) => {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error("DropdownContent must be used within Dropdown");

  const alignClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {context.isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -4 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute z-50 mt-2 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-premium backdrop-blur-md focus:outline-none",
            alignClasses[align],
            width,
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const DropdownItem: React.FC<{
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
  disabled?: boolean;
  className?: string;
}> = ({ children, icon, onClick, destructive, disabled, className }) => {
  const context = React.useContext(DropdownContext);

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    context?.setIsOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-foreground hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-left",
        destructive && "text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10",
        className
      )}
    >
      {icon && <span className="h-4 w-4 shrink-0 text-muted-foreground">{icon}</span>}
      <span className="flex-1 truncate">{children}</span>
    </button>
  );
};

export const DropdownSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("-mx-1 my-1.5 h-px bg-border", className)} />
);

export const DropdownLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={cn("px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider", className)}>
    {children}
  </div>
);
