import { useState } from 'react';
import { MOCK_APPLICATIONS } from '../../constants/mockData';
import { Badge } from '../ui/Badge';
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, User, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

export const ObservationsRegistry = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allObservations = MOCK_APPLICATIONS.flatMap(app => 
    app.observations.map(obs => ({ ...obs, appName: app.name, appId: app.id }))
  );

  const filteredObservations = activeFilter
    ? allObservations.filter(obs => obs.criticality === activeFilter)
    : allObservations;

  const stats = {
    critical: allObservations.filter(o => o.criticality === 'Critical').length,
    major: allObservations.filter(o => o.criticality === 'Major').length,
    minor: allObservations.filter(o => o.criticality === 'Minor').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-end pb-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">Risk & Observation Registry</h2>
          <p className="text-xs text-slate-400 font-medium">Consolidated monitoring of global audit findings and quality observations</p>
        </div>
        <div className="flex gap-3">
          <button className="merck-btn-secondary px-5 flex items-center justify-center">
            <Filter className="w-3.5 h-3.5 mr-2 opacity-50" />
            Filters
          </button>
          <button className="merck-btn-primary px-5">
            Bulk Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setActiveFilter(activeFilter === 'Critical' ? null : 'Critical')}
          className={cn(
            "p-6 rounded-[1.5rem] border shadow-sm relative overflow-hidden group text-left transition-all",
            activeFilter === 'Critical' 
              ? "bg-merck-magenta border-merck-magenta shadow-lg shadow-merck-magenta/20 scale-[1.02]" 
              : "bg-white border-merck-magenta/10 bg-merck-magenta/[0.02] hover:border-merck-magenta/30"
          )}
        >
          <div className="relative z-10">
            <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5", activeFilter === 'Critical' ? "text-white/70" : "text-merck-magenta")}>Critical Risk</p>
            <p className={cn("text-3xl font-bold font-display", activeFilter === 'Critical' ? "text-white" : "text-slate-900")}>{stats.critical}</p>
            <p className={cn("text-[9px] font-bold uppercase tracking-wider mt-1.5 opacity-80", activeFilter === 'Critical' ? "text-white/60" : "text-slate-400")}>IMMEDIATE ACTION REQ.</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            activeFilter === 'Critical' ? "bg-white/20 scale-150" : "bg-merck-magenta/5 group-hover:scale-150"
          )}></div>
        </button>

        <button 
          onClick={() => setActiveFilter(activeFilter === 'Major' ? null : 'Major')}
          className={cn(
            "p-6 rounded-[1.5rem] border shadow-sm relative overflow-hidden group text-left transition-all",
            activeFilter === 'Major' 
              ? "bg-amber-500 border-amber-500 shadow-lg shadow-amber-500/20 scale-[1.02]" 
              : "bg-white border-amber-500/10 bg-amber-500/[0.02] hover:border-amber-500/30"
          )}
        >
          <div className="relative z-10">
            <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5", activeFilter === 'Major' ? "text-white/70" : "text-amber-600")}>Major Findings</p>
            <p className={cn("text-3xl font-bold font-display", activeFilter === 'Major' ? "text-white" : "text-slate-900")}>{stats.major}</p>
            <p className={cn("text-[9px] font-bold uppercase tracking-wider mt-1.5 opacity-80", activeFilter === 'Major' ? "text-white/60" : "text-slate-400")}>CAPA FOLLOW-UP PENDING</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            activeFilter === 'Major' ? "bg-white/20 scale-150" : "bg-amber-500/5 group-hover:scale-150"
          )}></div>
        </button>

        <button 
          onClick={() => setActiveFilter(activeFilter === 'Minor' ? null : 'Minor')}
          className={cn(
            "p-6 rounded-[1.5rem] border shadow-sm relative overflow-hidden group text-left transition-all",
            activeFilter === 'Minor' 
              ? "bg-merck-cyan border-merck-cyan shadow-lg shadow-merck-cyan/20 scale-[1.02]" 
              : "bg-white border-merck-cyan/10 bg-merck-cyan/[0.02] hover:border-merck-cyan/30"
          )}
        >
          <div className="relative z-10">
            <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5", activeFilter === 'Minor' ? "text-white/70" : "text-merck-cyan")}>Continuous Imp.</p>
            <p className={cn("text-3xl font-bold font-display", activeFilter === 'Minor' ? "text-white" : "text-slate-900")}>{stats.minor}</p>
            <p className={cn("text-[9px] font-bold uppercase tracking-wider mt-1.5 opacity-80", activeFilter === 'Minor' ? "text-white/60" : "text-slate-400")}>QUALITY BEST PRACTICES</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            activeFilter === 'Minor' ? "bg-white/20 scale-150" : "bg-merck-cyan/5 group-hover:scale-150"
          )}></div>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center space-x-3">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display italic">Consolidated Findings</h3>
             {activeFilter && (
               <span className="px-2 py-0.5 bg-merck-indigo/5 text-merck-indigo text-[9px] font-bold rounded-full border border-merck-indigo/10 uppercase tracking-widest">
                 Level: {activeFilter}
               </span>
             )}
           </div>
           {activeFilter && (
             <button 
              onClick={() => setActiveFilter(null)}
              className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-merck-magenta transition-all"
             >
               Reset View
             </button>
           )}
        </div>
        {filteredObservations.map((obs) => (
          <div key={obs.id} className="bg-white p-7 rounded-[2rem] border border-slate-200/50 shadow-[0_4px_25px_rgba(80,50,145,0.03)] hover:shadow-[0_4px_35px_rgba(80,50,145,0.08)] transition-all group relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-0">
                <span className="text-[10px] font-bold font-mono text-merck-indigo bg-merck-indigo/5 px-2.5 py-1 rounded-lg border border-merck-indigo/10 shadow-sm">{obs.id}</span>
                <Badge variant={
                  obs.criticality === 'Critical' ? 'danger' : 
                  obs.criticality === 'Major' ? 'warning' : 'info'
                } className="px-3 py-1 font-display uppercase tracking-wider text-[9px]">{obs.criticality}</Badge>
                <div className="h-4 w-px bg-slate-100 hidden sm:block"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-merck-indigo transition-colors font-display">{obs.appName}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{obs.appId}</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">Due Date</span>
                  <div className="flex items-center text-[11px] text-slate-600 font-bold">
                    <Clock className="w-3.5 h-3.5 mr-2 text-merck-cyan opacity-40" />
                    {obs.dueDate}
                  </div>
                </div>
                <Badge variant={obs.status === 'Open' ? 'danger' : obs.status === 'Closed' ? 'success' : 'warning'} className="px-4 py-1.5 rounded-full font-display uppercase text-[10px] tracking-widest">
                  {obs.status}
                </Badge>
              </div>
            </div>
            
            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 mb-6 relative z-10 group-hover:bg-white transition-colors duration-500">
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{obs.description}</p>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] opacity-70">
                  <User className="w-4 h-4 mr-2 text-merck-indigo opacity-30" />
                  Responsible: <span className="ml-2 text-slate-800">{obs.owner}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="px-5 py-2 text-[10px] font-bold text-merck-indigo hover:text-white bg-merck-indigo/5 hover:bg-merck-indigo rounded-full uppercase tracking-widest transition-all">
                  CAPA Analysis
                </button>
                <button className="px-5 py-2 text-[10px] font-bold text-slate-400 bg-slate-50 rounded-full uppercase tracking-widest transition-all hover:bg-slate-100 hover:text-slate-600">
                  Quick Action
                </button>
              </div>
            </div>

            {/* Decorative soft glow on hover */}
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-merck-cyan/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        ))}

        {allObservations.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-100 mx-auto mb-4" />
            <p className="text-sm font-semibold text-slate-400">All systems are currently clean. No observations found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
