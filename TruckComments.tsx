"use client";

import { cn } from "@/lib/utils";

interface LivePillProps {
  size?: "sm" | "md";
  className?: string;
}

export function LivePill({ size = "md", className }: LivePillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-bold tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]",
        "bg-red-500 text-white",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-full w-full bg-white" />
      </span>
      LIVE
    </div>
  );
}
