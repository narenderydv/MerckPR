import React, { useState, useMemo } from 'react';
import { Application, PRStatus } from '../../types';
import { MOCK_APPLICATIONS } from '../../constants/mockData';
import { Badge } from '../ui/Badge';
import { Calendar, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FilterBar } from '../dashboard/FilterBar';
import { InitiatePeriodicReview } from './InitiatePeriodicReview';
import { motion } from 'motion/react';

export const PeriodicReviews = () => {
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [selectedReviewApp, setSelectedReviewApp] = useState<Application | null>(null);
  const [filters, setFilters] = useState({
    year: '',
    division: '',
    search: '',
    prStatus: ''
  });

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      prStatus: prev.prStatus === status ? '' : status
    }));
  };

  const handlePhaseChange = (appId: string, newPhase: PRStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          prStatus: newPhase,
          prHistory: app.prHistory?.map((h, idx) => idx === 0 ? { ...h, status: newPhase } : h) || []
        };
      }
      return app;
    }));
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const appYear = app.prHistory?.[0]?.year?.toString() || (app.lastAuditDate ? app.lastAuditDate.substring(0, 4) : '');
      const matchYear = !filters.year || appYear === filters.year;
      const matchDivision = !filters.division || app.division === filters.division;
      const matchStatus = !filters.prStatus || 
        app.prStatus === filters.prStatus || 
        (filters.prStatus === 'Pending' && ['To be Initiated', 'In Progress', 'In Review'].includes(app.prStatus));
      const searchLower = filters.search.toLowerCase();
      const matchSearch = !filters.search || 
        app.name.toLowerCase().includes(searchLower) || 
        app.id.toLowerCase().includes(searchLower) || 
        app.rdid.toLowerCase().includes(searchLower);
      
      return matchYear && matchDivision && matchSearch && matchStatus;
    });
  }, [applications, filters]);

  if (selectedReviewApp) {
    // Pass the latest application data from state
    const currentApp = applications.find(a => a.id === selectedReviewApp.id) || selectedReviewApp;
    return <InitiatePeriodicReview application={currentApp} onBack={() => setSelectedReviewApp(null)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => handleStatusFilter('Completed')}
          className={cn(
            "p-6 rounded-[1.5rem] border relative overflow-hidden group text-left transition-all",
            filters.prStatus === 'Completed' 
              ? "border-transparent shadow-lg scale-[1.02]" 
              : "bg-white border-merck-green/10 hover:border-merck-green/30"
          )}
          style={filters.prStatus === 'Completed' ? {
            background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
            boxShadow: '0 8px 24px rgba(107,63,160,0.3)'
          } : undefined}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className={cn("w-4 h-4", filters.prStatus === 'Completed' ? "text-white/70" : "text-merck-green")} strokeWidth={1.8} />
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", filters.prStatus === 'Completed' ? "text-white/70" : "text-merck-green")}>Completed</p>
            </div>
            <p className={cn("text-3xl font-bold font-display", filters.prStatus === 'Completed' ? "text-white" : "text-slate-900")}>42</p>
            <p className={cn("text-[9px] font-semibold uppercase tracking-wider mt-1.5 opacity-80", filters.prStatus === 'Completed' ? "text-white/60" : "text-slate-400")}>Q1-Q2 Compliance Target</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            filters.prStatus === 'Completed' ? "bg-white/20 scale-150" : "bg-merck-green/5 group-hover:scale-150"
          )}></div>
        </button>
        
        <button 
          onClick={() => handleStatusFilter('Pending')}
          className={cn(
            "p-6 rounded-[1.5rem] border relative overflow-hidden group text-left transition-all",
            filters.prStatus === 'Pending' 
              ? "border-transparent shadow-lg scale-[1.02]" 
              : "bg-white border-merck-cyan/10 hover:border-merck-cyan/30"
          )}
          style={filters.prStatus === 'Pending' ? {
            background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
            boxShadow: '0 8px 24px rgba(107,63,160,0.3)'
          } : undefined}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className={cn("w-4 h-4", filters.prStatus === 'Pending' ? "text-white/70" : "text-merck-cyan")} strokeWidth={1.8} />
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", filters.prStatus === 'Pending' ? "text-white/70" : "text-merck-cyan")}>Pending</p>
            </div>
            <p className={cn("text-3xl font-bold font-display", filters.prStatus === 'Pending' ? "text-white" : "text-slate-900")}>18</p>
            <p className={cn("text-[9px] font-semibold uppercase tracking-wider mt-1.5 opacity-80", filters.prStatus === 'Pending' ? "text-white/60" : "text-slate-400")}>Due Within 30 Days</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            filters.prStatus === 'Pending' ? "bg-white/20 scale-150" : "bg-merck-cyan/5 group-hover:scale-150"
          )}></div>
        </button>
        
        <button 
          onClick={() => handleStatusFilter('Overdue')}
          className={cn(
            "p-6 rounded-[1.5rem] border relative overflow-hidden group text-left transition-all",
            filters.prStatus === 'Overdue' 
              ? "border-transparent shadow-lg scale-[1.02]" 
              : "bg-white border-merck-magenta/10 hover:border-merck-magenta/30"
          )}
          style={filters.prStatus === 'Overdue' ? {
            background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
            boxShadow: '0 8px 24px rgba(107,63,160,0.3)'
          } : undefined}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={cn("w-4 h-4", filters.prStatus === 'Overdue' ? "text-white/70" : "text-merck-magenta")} strokeWidth={1.8} />
              <p className={cn("text-[9px] font-bold uppercase tracking-[0.2em]", filters.prStatus === 'Overdue' ? "text-white/70" : "text-merck-magenta")}>Overdue</p>
            </div>
            <p className={cn("text-3xl font-bold font-display", filters.prStatus === 'Overdue' ? "text-white" : "text-slate-900")}>07</p>
            <p className={cn("text-[9px] font-semibold uppercase tracking-wider mt-1.5 opacity-80", filters.prStatus === 'Overdue' ? "text-white/60" : "text-slate-400")}>Critical Attention Req.</p>
          </div>
          <div className={cn(
            "absolute -right-4 -top-4 w-20 h-20 rounded-full blur-2xl transition-transform duration-700",
            filters.prStatus === 'Overdue' ? "bg-white/20 scale-150" : "bg-merck-magenta/5 group-hover:scale-150"
          )}></div>
        </button>
      </div>

      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onClear={() => setFilters({ year: '', division: '', search: '', prStatus: '' })} 
      />

      <div className="merck-card overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display italic">Active Periodic Review Queue</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">System</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Review Owner & Functional Area</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Last review Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Next Due Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display text-center">Reference Year</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display text-center">Review Phase</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">No of Observation</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Target Completion Date</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right font-display">Navigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredApps.slice(0, 10).map((app) => (
                <tr key={app.id} className="group hover:bg-merck-indigo/[0.01] transition-colors cursor-pointer">
                  <td className="px-8 py-5">
                  <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-merck-indigo transition-colors font-display">{app.name}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 opacity-70 tracking-tight">BSN ID: {app.id}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-tighter">RDID: {app.rdid}</span>
                    </div>
                  </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{app.owner}</span>
                      <span className="text-[10px] text-merck-cyan font-bold uppercase tracking-widest mt-0.5">{app.division}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{app.lastAuditDate}</span>
                      <span className={cn(
                        "text-[9px] font-bold uppercase tracking-wider mt-0.5",
                        app.lastAuditOutcome === 'No Findings' ? "text-merck-green" : "text-merck-magenta"
                      )}>{app.lastAuditOutcome}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-700">
                      {app.lastAuditDate ? `${parseInt(app.lastAuditDate.split('-')[0]) + 1}-${app.lastAuditDate.split('-')[1]}-${app.lastAuditDate.split('-')[2]}` : 'N/A'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      {app.prHistory?.[0]?.year || 'N/A'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <select
                      value={app.prStatus}
                      onChange={(e) => handlePhaseChange(app.id, e.target.value as PRStatus)}
                      className={cn(
                        "appearance-none inline-flex items-center px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border text-center font-display cursor-pointer focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 transition-all text-center",
                        app.prStatus === 'Completed' ? 'bg-merck-green/8 text-merck-green border-merck-green/15 focus:ring-merck-green/30' :
                        app.prStatus === 'In Progress' ? 'bg-merck-indigo/6 text-merck-indigo border-merck-indigo/12 focus:ring-merck-indigo/30' :
                        app.prStatus === 'In Review' ? 'bg-orange-50 text-orange-600 border-orange-200/50 focus:ring-orange-200/30' :
                        app.prStatus === 'To be Initiated' ? 'bg-slate-50 text-slate-500 border-slate-200/50 focus:ring-slate-200/30' :
                        'bg-merck-magenta/8 text-merck-magenta border-merck-magenta/15 focus:ring-merck-magenta/30' // Overdue
                      )}
                    >
                      <option value="To be Initiated">To be Initiated</option>
                      <option value="In Progress">In Progress</option>
                      <option value="In Review">In Review</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col space-y-1 text-[10px] font-bold">
                      <div className="flex justify-between items-center w-full min-w-[80px]">
                        <span className="text-slate-500 uppercase tracking-wider">Total:</span>
                        <span className="text-slate-800 bg-slate-100 px-1.5 rounded">{app.observations.length}</span>
                      </div>
                      <div className="flex justify-between items-center w-full min-w-[80px]">
                        <span className="text-slate-500 uppercase tracking-wider">Active:</span>
                        <span className="text-merck-cyan bg-merck-cyan/10 px-1.5 rounded">{app.observations.filter(o => o.status !== 'Closed').length}</span>
                      </div>
                      <div className="flex justify-between items-center w-full min-w-[80px]">
                        <span className="text-slate-500 uppercase tracking-wider">Closed:</span>
                        <span className="text-merck-green bg-merck-green/10 px-1.5 rounded">{app.observations.filter(o => o.status === 'Closed').length}</span>
                      </div>
                      <div className="flex justify-between items-center w-full min-w-[80px]">
                        <span className="text-slate-500 uppercase tracking-wider">Overdue:</span>
                        <span className={
                          app.observations.filter(o => o.status !== 'Closed' && new Date(o.dueDate) < new Date()).length > 0 
                            ? "text-merck-magenta bg-merck-magenta/10 px-1.5 rounded" 
                            : "text-slate-400 bg-slate-50 px-1.5 rounded"
                        }>
                          {app.observations.filter(o => o.status !== 'Closed' && new Date(o.dueDate) < new Date()).length}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center text-xs font-bold text-slate-600">
                      <Calendar className="w-3.5 h-3.5 mr-2 text-merck-cyan opacity-40" />
                      Dec 31, {app.prHistory?.[0]?.year || '2026'}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button onClick={() => setSelectedReviewApp(app)} className="px-4 py-2 text-[10px] font-semibold text-white rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 hover:shadow-lg hover:shadow-merck-indigo/20" style={{ background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)' }}>
                       Open Checklist
                       <ArrowRight className="w-3 h-3" strokeWidth={2} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 border-t border-slate-50 bg-slate-50/30">
          <button className="text-[10px] font-bold text-merck-cyan uppercase tracking-widest hover:underline transition-all">View Extended Archive →</button>
        </div>
      </div>
    </motion.div>
  );
};
