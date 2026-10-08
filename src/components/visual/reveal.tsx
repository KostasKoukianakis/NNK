"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function GatherPanel({
  children,
  className,
  open,
}: {
  children: ReactNode;
  className?: string;
  open: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return open ? <div className={className}>{children}</div> : null;
  }

  return (
    <motion.div
      className={cn("origin-top overflow-hidden", className)}
      initial={false}
      animate={
        open
          ? { opacity: 1, height: "auto", y: 0, filter: "blur(0px)" }
          : { opacity: 0, height: 0, y: -8, filter: "blur(4px)" }
      }
      transition={{ duration: 0.38, ease }}
      aria-hidden={!open}
    >
      {open ? children : null}
    </motion.div>
  );
}
