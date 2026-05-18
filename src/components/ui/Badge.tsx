import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  className?: string;
}

export const Badge = ({ children, variant = 'neutral', className }: BadgeProps) => {
  const variants = {
    success: 'bg-merck-green/8 text-merck-green border-merck-green/15',
    warning: 'bg-orange-50 text-orange-600 border-orange-200/50',
    danger: 'bg-merck-magenta/8 text-merck-magenta border-merck-magenta/15',
    info: 'bg-merck-indigo/6 text-merck-indigo border-merck-indigo/12',
    neutral: 'bg-slate-50 text-slate-500 border-slate-200/50'
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
