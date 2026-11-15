import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  fullScreen = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-8 text-center",
        fullScreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {message && <p className="text-xs font-medium text-muted-foreground">{message}</p>}
    </div>
  );
};
