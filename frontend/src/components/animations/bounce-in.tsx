"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BounceInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function BounceIn({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: BounceInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
