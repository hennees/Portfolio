"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type GlassCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function GlassCard({
  children,
  className = "",
  hover = true,
  ...props
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`glass rounded-2xl ${className}`}
      whileHover={
        hover && !prefersReducedMotion
          ? {
              y: -4,
              boxShadow: "0 20px 60px rgba(248, 89, 0, 0.12)",
              borderColor: "rgba(248, 89, 0, 0.2)",
            }
          : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
