import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Tooltip
      content={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      position="bottom"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className={cn(
          "rounded-lg h-9 w-9 border-border bg-background hover:bg-accent text-foreground transition-colors",
          className
        )}
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 text-foreground transition-transform duration-200 rotate-0 scale-100" />
        )}
      </Button>
    </Tooltip>
  );
};
