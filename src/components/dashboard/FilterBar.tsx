import React from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Division } from '../../types';

interface FilterBarProps {
  filters: {
    year?: string;
    division: string;
    search: string;
    prStatus?: string;
  };
  setFilters: (filters: any) => void;
  onClear: () => void;
}

export const FilterBar = ({ filters, setFilters, onClear }: FilterBarProps) => {
  const years = ['All Years', '2024', '2025', '2026'];
  const divisions = ['All Divisions', 'R&D', 'DDIT', 'Quality', 'Commercial', 'Manufacturing', 'Medical'];
  const prStatuses = ['All Statuses', 'Completed', 'Pending', 'Overdue'];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 mb-8" style={{ boxShadow: '0 1px 3px rgba(107,63,160,0.03), 0 4px 16px rgba(107,63,160,0.03)' }}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
        {/* Search */}
        <div className="flex-1 min-w-0 relative group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-merck-indigo transition-all" strokeWidth={1.8} />
          <input 
            type="text" 
            placeholder="Search by Name, ID, or RDID..." 
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-merck-indigo/10 focus:bg-white focus:border-merck-indigo/15 transition-all font-medium placeholder:text-slate-300"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-100">
            <div className="relative min-w-[110px]">
              <select 
                value={filters.year || ''}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-transparent text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer"
              >
                {years.map(y => <option key={y} value={y === 'All Years' ? '' : y}>{y}</option>)}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" strokeWidth={1.8} />
            </div>

            <div className="w-px h-5 bg-slate-200/60" />

            <div className="relative min-w-[130px]">
              <select 
                value={filters.division || ''}
                onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-transparent text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer"
              >
                {divisions.map(d => <option key={d} value={d === 'All Divisions' ? '' : d}>{d}</option>)}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" strokeWidth={1.8} />
            </div>

            <div className="w-px h-5 bg-slate-200/60" />

            <div className="relative min-w-[130px]">
              <select 
                value={filters.prStatus || ''}
                onChange={(e) => setFilters({ ...filters, prStatus: e.target.value })}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-transparent text-xs font-semibold text-slate-600 focus:outline-none cursor-pointer"
              >
                {prStatuses.map(s => <option key={s} value={s === 'All Statuses' ? '' : s}>{s}</option>)}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" strokeWidth={1.8} />
            </div>
          </div>

          <button 
            onClick={onClear}
            className="flex items-center px-3.5 py-2.5 text-[10px] font-semibold text-slate-400 hover:text-merck-magenta uppercase tracking-wider transition-all hover:bg-merck-magenta/[0.04] rounded-xl"
          >
            <X className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.8} />
            Reset
          </button>
        </div>
      </div>

      {/* Active Tags */}
      {(filters.year || filters.division || filters.prStatus || filters.search) && (
        <div className="flex items-center flex-wrap gap-2 mt-4 pt-4 border-t border-slate-50">
          <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider mr-1">Filters:</span>
          {filters.year && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-semibold border border-slate-100">
              {filters.year}
            </span>
          )}
          {filters.division && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-indigo/5 text-merck-indigo text-[10px] font-semibold border border-merck-indigo/10">
              {filters.division}
            </span>
          )}
          {filters.prStatus && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-indigo/5 text-merck-indigo text-[10px] font-semibold border border-merck-indigo/10">
              {filters.prStatus}
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 text-[10px] font-semibold border border-slate-100">
              "{filters.search}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};
