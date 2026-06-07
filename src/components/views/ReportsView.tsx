import React, { useState } from 'react';
import { FileDown, FileText, CheckCircle2, FileBarChart, Filter, Download, Plus, Clock, FileCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export const ReportsView = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const reports = [
    { title: 'Annual PR Compliance Summary', type: 'PDF', date: '2026-04-15', status: 'Ready' },
    { title: 'Observation Resolution Trend', type: 'Excel', date: '2026-04-20', status: 'Draft' },
    { title: 'Global Audit Findings Report Q1', type: 'PDF', date: '2026-03-30', status: 'Ready' },
    { title: 'Technical System Debt Analysis', type: 'PDF', date: '2026-04-01', status: 'Ready' },
    { title: 'Quality Excellence Benchmark', type: 'PDF', date: '2026-04-10', status: 'Draft' },
    { title: 'Infrastructure Validation Log', type: 'PDF', date: '2026-03-15', status: 'Ready' },
  ];

  const filteredReports = activeFilter
    ? reports.filter(r => r.status === activeFilter)
    : reports;

  const stats = {
    total: reports.length,
    ready: reports.filter(r => r.status === 'Ready').length,
    draft: reports.filter(r => r.status === 'Draft').length,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      <div className="flex justify-between items-end pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-merck-indigo/10 flex items-center justify-center">
            <FileBarChart className="w-5 h-5 text-merck-indigo" strokeWidth={1.8} />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display">Global Reports</h2>
            <p className="text-xs text-slate-400 font-medium">Generate, view and export regulatory compliance reports</p>
          </div>
        </div>
        <button className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-merck-indigo/20" style={{ background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)' }}>
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setActiveFilter(null)}
          className={cn(
            "p-6 rounded-[1.5rem] border shadow-sm relative overflow-hidden group text-left transition-all",
            !activeFilter 
              ? "bg-merck-indigo border-merck-indigo shadow-lg shadow-merck-indigo/20 scale-[1.02]" 
              : "bg-white border-merck-indigo/10 bg-merck-indigo/[0.02] hover:border-merck-indigo/30"
          )}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <FileBarChart className={cn("w-4 h-4", !activeFilter ? "text-white/70" : "text-merck-indigo")} strokeWidth={1.8} />
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", !activeFilter ? "text-white/70" : "text-merck-indigo")}>Total Archive</p>
            </div>
            <p className={cn("text-3xl font-bold font-display", !activeFilter ? "text-white" : "text-slate-900")}>{stats.total}</p>
            <p className={cn("text-[9px] font-semibold uppercase tracking-wider mt-1.5 opacity-80", !activeFilter ? "text-white/60" : "text-slate-400")}>All Generated Records</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            !activeFilter ? "bg-white/20 scale-150" : "bg-merck-indigo/5 group-hover:scale-150"
          )}></div>
        </button>

        <button 
          onClick={() => setActiveFilter(activeFilter === 'Ready' ? null : 'Ready')}
          className={cn(
            "p-6 rounded-[1.5rem] border shadow-sm relative overflow-hidden group text-left transition-all",
            activeFilter === 'Ready' 
              ? "bg-merck-green border-merck-green shadow-lg shadow-merck-green/20 scale-[1.02]" 
              : "bg-white border-merck-green/10 bg-merck-green/[0.02] hover:border-merck-green/30"
          )}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className={cn("w-4 h-4", activeFilter === 'Ready' ? "text-white/70" : "text-merck-green")} strokeWidth={1.8} />
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", activeFilter === 'Ready' ? "text-white/70" : "text-merck-green")}>Published</p>
            </div>
            <p className={cn("text-3xl font-bold font-display", activeFilter === 'Ready' ? "text-white" : "text-slate-900")}>{stats.ready}</p>
            <p className={cn("text-[9px] font-semibold uppercase tracking-wider mt-1.5 opacity-80", activeFilter === 'Ready' ? "text-white/60" : "text-slate-400")}>Verified & Exportable</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            activeFilter === 'Ready' ? "bg-white/20 scale-150" : "bg-merck-green/5 group-hover:scale-150"
          )}></div>
        </button>

        <button 
          onClick={() => setActiveFilter(activeFilter === 'Draft' ? null : 'Draft')}
          className={cn(
            "p-6 rounded-[1.5rem] border shadow-sm relative overflow-hidden group text-left transition-all",
            activeFilter === 'Draft' 
              ? "bg-amber-500 border-amber-500 shadow-lg shadow-amber-500/20 scale-[1.02]" 
              : "bg-white border-amber-500/10 bg-amber-500/[0.02] hover:border-amber-500/30"
          )}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className={cn("w-4 h-4", activeFilter === 'Draft' ? "text-white/70" : "text-amber-600")} strokeWidth={1.8} />
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", activeFilter === 'Draft' ? "text-white/70" : "text-amber-600")}>Drafts</p>
            </div>
            <p className={cn("text-3xl font-bold font-display", activeFilter === 'Draft' ? "text-white" : "text-slate-900")}>{stats.draft}</p>
            <p className={cn("text-[9px] font-semibold uppercase tracking-wider mt-1.5 opacity-80", activeFilter === 'Draft' ? "text-white/60" : "text-slate-400")}>Pending Final Review</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            activeFilter === 'Draft' ? "bg-white/20 scale-150" : "bg-amber-500/5 group-hover:scale-150"
          )}></div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="merck-card p-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display italic mb-6">Available Templates</h3>
            <div className="space-y-4">
              {['General Compliance Health', 'Audit Trail Analysis', 'Division Wise Risk Map', 'CAPA Performance Matrix'].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-merck-indigo/20 hover:bg-merck-indigo/[0.01] transition-all cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-merck-indigo/5 transition-colors">
                      <FileText className="w-4 h-4 text-slate-400 group-hover:text-merck-indigo transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 font-display">{item}</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-300 group-hover:text-merck-indigo transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-slate-200 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:border-merck-indigo/30 hover:text-merck-indigo transition-all">
              Request Custom Template
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="merck-card overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display italic">Recent Generative Output</h3>
                {activeFilter && (
                  <span className="px-2 py-0.5 bg-merck-indigo/5 text-merck-indigo text-[9px] font-bold rounded-full border border-merck-indigo/10 mb-0.5">Status: {activeFilter}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-300 hover:text-merck-indigo transition-colors">
                   <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {filteredReports.map((report, idx) => (
                <div key={idx} className="flex items-center justify-between p-8 hover:bg-merck-indigo/[0.01] transition-colors group">
                  <div className="flex items-center space-x-5">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all",
                      report.status === 'Ready' ? "bg-merck-green/5 border-merck-green/10" : "bg-slate-50 border-slate-100"
                    )}>
                      <FileDown className={cn("w-6 h-6", report.status === 'Ready' ? "text-merck-green" : "text-slate-400")} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 font-display group-hover:text-merck-indigo transition-colors">{report.title}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{report.type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Created {report.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <Badge variant={report.status === 'Ready' ? 'success' : 'neutral'} className="px-3 py-1 text-[9px] uppercase tracking-widest">
                      {report.status}
                    </Badge>
                    <button className="text-[10px] font-bold text-merck-indigo uppercase tracking-widest hover:text-merck-magenta transition-colors underline underline-offset-4 decoration-merck-indigo/30">
                      Download
                    </button>
                  </div>
                </div>
              ))}
              {filteredReports.length === 0 && (
                <div className="p-20 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No reports found matching your criteria</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
               <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-merck-indigo transition-colors">
                  View full documentation archive
               </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
