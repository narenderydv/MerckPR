import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

const ChartCard = ({ title, children, subtitle }: ChartCardProps) => (
  <div className="bg-white p-7 rounded-2xl border border-slate-100 h-full" style={{ boxShadow: '0 1px 3px rgba(107,63,160,0.03), 0 4px 16px rgba(107,63,160,0.03)' }}>
    <div className="mb-6">
      <h3 className="text-sm font-bold text-slate-800 tracking-tight font-display">{title}</h3>
      {subtitle && <p className="text-[11px] text-slate-400 mt-1 font-medium">{subtitle}</p>}
    </div>
    <div className="h-[280px] w-full">
      {children}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-sans">
        <p className="font-semibold border-b border-slate-700 pb-1.5 mb-1.5">{label || payload[0].name}</p>
        <p className="flex justify-between space-x-8">
          <span className="opacity-60">Count:</span>
          <span className="font-mono font-medium">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const CompliancePieChart = ({ 
  data, 
  onSegmentClick, 
  activeSegment 
}: { 
  data: any[], 
  onSegmentClick?: (name: string) => void,
  activeSegment?: string 
}) => {
  const handleClick = (data: any) => {
    if (onSegmentClick && data && data.name) {
      onSegmentClick(data.name);
    }
  };

  return (
    <ChartCard 
      title="Review Status Hub" 
      subtitle="Click segments to filter registry below"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
            onClick={handleClick}
            cursor="pointer"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                className={cn(
                  "transition-all duration-300 outline-none",
                  activeSegment === entry.name ? "opacity-100 scale-105" : (activeSegment ? "opacity-30" : "opacity-90 hover:opacity-100")
                )}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            align="center" 
            iconType="circle" 
            wrapperStyle={{ fontSize: '11px', paddingTop: '20px', fontWeight: 600 }}
            onClick={(data: any) => onSegmentClick?.(data.value)}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const CriticalityBarChart = ({ data }: { data: any[] }) => (
  <ChartCard title="Observations Index" subtitle="Breakdown by criticality level">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: -10, right: 30, top: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
        <XAxis type="number" hide />
        <YAxis 
          dataKey="name" 
          type="category" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
          width={70}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
        <Bar 
          dataKey="value" 
          radius={[0, 4, 4, 0]} 
          barSize={40}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);
