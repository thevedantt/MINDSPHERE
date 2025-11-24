'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradient({ children, className }: AnimatedGradientProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden rounded-3xl", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
