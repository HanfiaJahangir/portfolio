"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUpVariants } from "@/systems/animation/framer";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
};

export function MotionReveal({ children, className }: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
