import React, { ReactNode } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Briefcase 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  icon: React.ElementType;
  description?: string;
  loading?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export const StatCard = ({ label, value, trend, icon: Icon, description, loading, onClick, isActive }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "p-7 rounded-2xl border transition-all duration-300 group overflow-hidden relative cursor-pointer",
        isActive 
          ? "border-transparent scale-[1.02] text-white" 
          : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-merck-indigo/[0.06]"
      )}
      style={isActive ? {
        background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
        boxShadow: '0 8px 32px rgba(107,63,160,0.3)'
      } : {
        boxShadow: '0 1px 3px rgba(107,63,160,0.03), 0 4px 16px rgba(107,63,160,0.03)'
      }}
    >
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className={cn(
          "p-3 rounded-xl transition-all duration-300",
          isActive ? "bg-white/15" : "bg-merck-indigo/[0.05] group-hover:bg-merck-indigo/[0.08]"
        )}>
          <Icon className={cn(
            "w-5 h-5 transition-all duration-300", 
            isActive ? "text-white" : "text-slate-400 group-hover:text-merck-indigo"
          )} strokeWidth={1.8} />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full",
            trend > 0 
              ? (isActive ? "text-white/90 bg-white/15" : "text-merck-green bg-merck-green/8") 
              : (isActive ? "text-white/90 bg-white/15" : "text-merck-magenta bg-merck-magenta/8")
          )}>
            {trend > 0 ? <TrendingUp className="w-3 h-3 mr-1" strokeWidth={1.8} /> : <TrendingDown className="w-3 h-3 mr-1" strokeWidth={1.8} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="relative z-10 space-y-1">
        <p className={cn(
          "text-[10px] uppercase tracking-[0.15em] font-semibold", 
          isActive ? "text-white/60" : "text-slate-400"
        )}>{label}</p>
        <h3 className={cn(
          "text-4xl font-bold tracking-tighter font-display leading-none", 
          isActive ? "text-white" : "text-slate-900"
        )}>
          {loading ? (
            <div className={cn("h-10 w-24 animate-pulse rounded-xl", isActive ? "bg-white/20" : "bg-slate-100")} />
          ) : value}
        </h3>
        {description && (
          <p className={cn(
            "text-[11px] pt-2 font-medium leading-relaxed", 
            isActive ? "text-white/60" : "text-slate-400"
          )}>{description}</p>
        )}
      </div>

      {isActive && (
        <div className="absolute top-5 right-5">
          <div className="w-2 h-2 rounded-full bg-merck-cyan/80 merck-soft-pulse" style={{ boxShadow: '0 0 4px rgba(0,196,240,0.3)' }} />
        </div>
      )}

      {/* Organic blob decoration */}
      <div className={cn(
        "absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl transition-all duration-700 merck-blob",
        isActive ? "bg-white/10 opacity-100" : "bg-merck-indigo/5 opacity-0 group-hover:opacity-100"
      )} />
    </motion.div>
  );
};
