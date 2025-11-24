'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function AnalyticsCard({ title, icon, children, className = '' }: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="bg-white/80 border-neutral-200 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-neutral-900 flex items-center gap-2">
            {icon && <span className="text-primary-600">{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

