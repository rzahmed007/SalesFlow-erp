import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const statusColors = {
  online: "bg-emerald-500",
  offline: "bg-zinc-400",
  busy: "bg-rose-500",
  away: "bg-amber-500",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  fallback = "U",
  size = "md",
  status,
  className,
  ...props
}) => {
  const [hasError, setHasError] = React.useState(false);

  const getInitials = (text: string) => {
    return text
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative inline-block" {...props}>
      <div
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full border border-border bg-muted font-medium text-muted-foreground items-center justify-center select-none shadow-sm",
          sizeClasses[size],
          className
        )}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <span className="font-semibold text-foreground/80">
            {fallback.length <= 3 ? fallback : getInitials(fallback)}
          </span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
            statusColors[status],
            size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5"
          )}
        />
      )}
    </div>
  );
};
