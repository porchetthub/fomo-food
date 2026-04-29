"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "brown" | "olive" | "default";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    gold: "bg-pork-gold/15 text-pork-amber border-pork-gold/30",
    brown: "bg-pork-crust/15 text-pork-crust border-pork-crust/30",
    olive: "bg-pork-olive/15 text-pork-olive border-pork-olive/30",
    default: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
