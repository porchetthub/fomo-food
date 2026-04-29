"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-white/20 bg-white/60 backdrop-blur-2xl backdrop-saturate-150 shadow-sm",
        "dark:bg-black/30 dark:border-white/10",
        hover && "cursor-pointer active:scale-[0.98]",
        className
      )}
      whileHover={hover ? { y: -2, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" } : undefined}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
