import React, { useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { Calendar, X, TrendingUp } from 'lucide-react';
import { MOCK_APPLICATIONS } from '../../constants/mockData';
import { cn } from '../../lib/utils';

// Generate year-on-year trend data from mock data
const TREND_DATA = [
  { year: '2021', Critical: 8, Major: 14, Minor: 22, total: 44 },
  { year: '2022', Critical: 6, Major: 18, Minor: 25, total: 49 },
  { year: '2023', Critical: 10, Major: 12, Minor: 19, total: 41 },
  { year: '2024', Critical: 4, Major: 9, Minor: 15, total: 28 },
  { year: '2025', Critical: 3, Major: 7, Minor: 11, total: 21 },
  { year: '2026', Critical: 2, Major: 5, Minor: 8, total: 15 },
];

const SERIES = [
  { key: 'Critical', color: '#eb3c96', label: 'Critical' },
  { key: 'Major', color: '#f97316', label: 'Major' },
  { key: 'Minor', color: '#ffc800', label: 'Minor' },
  { key: 'total', color: '#503291', label: 'Total' },
];

const DIVISIONS = ['All', 'R&D', 'Quality', 'Commercial', 'Medical', 'Manufacturing', 'DDIT'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs font-sans min-w-[140px]">
        <p className="font-bold border-b border-slate-700 pb-1 mb-1.5">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} className="flex justify-between space-x-6 py-0.5">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="opacity-70">{p.name}</span>
            </span>
            <span className="font-mono font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ObservationTrendChart = () => {
  const [yearFrom, setYearFrom] = useState('2021');
  const [yearTo, setYearTo] = useState('2026');
  const [division, setDivision] = useState('All');
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({
    Critical: true, Major: true, Minor: true, total: true
  });

  const toggleSeries = (key: string) => {
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = useMemo(() => {
    return TREND_DATA.filter(d => {
      const y = parseInt(d.year);
      return y >= parseInt(yearFrom) && y <= parseInt(yearTo);
    });
  }, [yearFrom, yearTo]);

  const years = TREND_DATA.map(d => d.year);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(107,63,160,0.03), 0 4px 16px rgba(107,63,160,0.03)' }}>
      {/* Header */}
      <div className="p-7 border-b border-slate-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <TrendingUp className="w-4 h-4 text-merck-indigo" strokeWidth={1.8} />
            <h3 className="text-sm font-bold text-slate-800 tracking-tight font-display">Observation Criticality Trend</h3>
          </div>
          <p className="text-[10px] font-medium text-slate-400 tracking-wider">Year-on-Year Analysis</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">From Year</label>
            <select value={yearFrom} onChange={e => setYearFrom(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-slate-50 cursor-pointer">
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">To Year</label>
            <select value={yearTo} onChange={e => setYearTo(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-slate-50 cursor-pointer">
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Division</label>
            <select value={division} onChange={e => setDivision(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-slate-50 cursor-pointer">
              {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Series toggles */}
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Show on Graph</label>
            <div className="flex flex-wrap gap-2">
              {SERIES.map(s => (
                <button key={s.key} onClick={() => toggleSeries(s.key)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all",
                    visibleSeries[s.key]
                      ? "text-white shadow-sm"
                      : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                  )}
                  style={visibleSeries[s.key] ? { backgroundColor: s.color, borderColor: s.color } : {}}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '16px', fontWeight: 600 }}
              />
              {SERIES.filter(s => visibleSeries[s.key]).map(s => (
                <Line
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.label}
                  stroke={s.color}
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: s.color, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: s.color, strokeWidth: 2, stroke: '#fff' }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
