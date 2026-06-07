import React, { useState, useMemo, useRef } from 'react';
import { MOCK_APPLICATIONS } from '../../constants/mockData';
import { Download, Search, Calendar, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { Application } from '../../types';
import { AuditReadinessDetails } from './AuditReadinessDetails';
import { motion } from 'motion/react';

// Build flat audit-readiness rows from mock data
const buildRows = () => {
  return MOCK_APPLICATIONS.map(app => {
    const goLiveDate = app.lastAuditDate
      ? new Date(new Date(app.lastAuditDate).getTime() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
      : '';
    const hasGoLive = !!goLiveDate;

    // Overall Compliance: average of closed observations ratio and PR completion status
    const totalObs = app.observations.length;
    const closedObs = app.observations.filter(o => o.status === 'Closed').length;
    const correctness = totalObs > 0 ? Math.round((closedObs / totalObs) * 100) : 100;
    const completeness = app.prStatus === 'Completed' ? 100 : ['In Progress', 'In Review'].includes(app.prStatus) ? 60 : app.prStatus === 'To be Initiated' ? 10 : 30;
    const overallCompliance = Math.round((correctness + completeness) / 2);

    // Most critical observation
    const criticals = app.observations.filter(o => o.criticality === 'Critical').length;
    const majors = app.observations.filter(o => o.criticality === 'Major').length;
    const minors = app.observations.filter(o => o.criticality === 'Minor').length;
    const topCriticality = criticals > 0 ? 'Critical' : majors > 0 ? 'Major' : minors > 0 ? 'Minor' : 'None';

    return {
      appId: app.id,
      name: app.name,
      owner: app.owner,
      goLiveDate,
      lastAuditDate: app.lastAuditDate,
      overallCompliance,
      observations: totalObs,
      criticality: topCriticality,
      category: hasGoLive ? 'Run' : 'Project',
      division: app.division,
      originalApp: app,
    };
  });
};

export const AuditLogRegistry = () => {
  const [selectedAuditApp, setSelectedAuditApp] = useState<Application | null>(null);
  const [searchText, setSearchText] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [critFilter, setCritFilter] = useState('');

  const allRows = useMemo(() => buildRows(), []);

  const filteredRows = useMemo(() => {
    return allRows.filter(r => {
      // Search
      const s = searchText.toLowerCase();
      const matchSearch = !searchText ||
        r.appId.toLowerCase().includes(s) ||
        r.name.toLowerCase().includes(s) ||
        r.owner.toLowerCase().includes(s);

      // Date range on lastAuditDate
      const auditDate = r.lastAuditDate ? new Date(r.lastAuditDate) : null;
      const matchFrom = !dateFrom || (auditDate && auditDate >= new Date(dateFrom));
      const matchTo = !dateTo || (auditDate && auditDate <= new Date(dateTo));

      // Category
      const matchCat = !catFilter || r.category === catFilter;

      // Criticality
      const matchCrit = !critFilter || r.criticality === critFilter;

      return matchSearch && matchFrom && matchTo && matchCat && matchCrit;
    });
  }, [allRows, searchText, dateFrom, dateTo, catFilter, critFilter]);

  const handleExport = () => {
    const headers = ['App ID', 'System Name', 'System Owner', 'Go Live Date', 'Last Audit Date', 'Overall Compliance %', 'Observations', 'Criticality', 'Category'];
    const csvRows = [headers.join(',')];
    filteredRows.forEach(r => {
      csvRows.push([r.appId, `"${r.name}"`, `"${r.owner}"`, r.goLiveDate, r.lastAuditDate, r.overallCompliance, r.observations, r.criticality, r.category].join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_readiness_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasActiveFilters = searchText || dateFrom || dateTo || catFilter || critFilter;

  const clearAll = () => {
    setSearchText('');
    setDateFrom('');
    setDateTo('');
    setCatFilter('');
    setCritFilter('');
  };

  if (selectedAuditApp) {
    return <AuditReadinessDetails application={selectedAuditApp} onBack={() => setSelectedAuditApp(null)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* Header (Export CSV only, title & icon removed) */}
      <div className="flex justify-end pb-2">
        <button onClick={handleExport} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all">
          <Download className="w-3.5 h-3.5 opacity-50" strokeWidth={1.8} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filters</p>
          {hasActiveFilters && (
            <button onClick={clearAll} className="flex items-center space-x-1 text-[10px] font-bold text-merck-magenta hover:underline uppercase tracking-wider">
              <X className="w-3 h-3" /><span>Clear All</span>
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Search</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="App ID, name, owner..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Date From */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Audit Date From</label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Date To */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Audit Date To</label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-white cursor-pointer"
            >
              <option value="">All</option>
              <option value="Run">Run</option>
              <option value="Project">Project</option>
            </select>
          </div>

          {/* Criticality */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Criticality</label>
            <select
              value={critFilter}
              onChange={e => setCritFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-white cursor-pointer"
            >
              <option value="">All</option>
              <option value="Critical">Critical</option>
              <option value="Major">Major</option>
              <option value="Minor">Minor</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        {/* Active filter tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
            {searchText && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-indigo/5 text-merck-indigo text-[10px] font-bold border border-merck-indigo/10">
                Search: "{searchText}" <button onClick={() => setSearchText('')} className="ml-1"><X className="w-3 h-3" /></button>
              </span>
            )}
            {dateFrom && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-cyan/5 text-merck-cyan text-[10px] font-bold border border-merck-cyan/10">
                From: {dateFrom} <button onClick={() => setDateFrom('')} className="ml-1"><X className="w-3 h-3" /></button>
              </span>
            )}
            {dateTo && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-cyan/5 text-merck-cyan text-[10px] font-bold border border-merck-cyan/10">
                To: {dateTo} <button onClick={() => setDateTo('')} className="ml-1"><X className="w-3 h-3" /></button>
              </span>
            )}
            {catFilter && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-green/5 text-merck-green text-[10px] font-bold border border-merck-green/10">
                Category: {catFilter} <button onClick={() => setCatFilter('')} className="ml-1"><X className="w-3 h-3" /></button>
              </span>
            )}
            {critFilter && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-merck-magenta/5 text-merck-magenta text-[10px] font-bold border border-merck-magenta/10">
                Criticality: {critFilter} <button onClick={() => setCritFilter('')} className="ml-1"><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="merck-card overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display italic">Audit Readiness Registry</h3>
          <p className="text-[10px] font-bold text-slate-400">{filteredRows.length} systems</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">App ID</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">System Owner</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Go Live Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Last Audit Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display text-center">Overall Compliance</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display text-center">Observations</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display text-center">Criticality</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display text-center">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRows.map(r => (
                <tr key={r.appId} className="group hover:bg-merck-indigo/[0.01] transition-colors">
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-merck-indigo transition-colors font-display">{r.name}</p>
                    <p className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-tighter mt-0.5">{r.appId}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-700">{r.owner}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{r.goLiveDate || '—'}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-600">{r.lastAuditDate || '—'}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className={cn(
                        "text-sm font-bold font-display",
                        r.overallCompliance >= 80 ? "text-merck-green" : r.overallCompliance >= 50 ? "text-amber-500" : "text-merck-magenta"
                      )}>{r.overallCompliance}%</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className={cn(
                          "h-full rounded-full transition-all",
                          r.overallCompliance >= 80 ? "bg-merck-green" : r.overallCompliance >= 50 ? "bg-amber-400" : "bg-merck-magenta"
                        )} style={{ width: `${r.overallCompliance}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {r.observations > 0 ? (
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-merck-magenta/10 text-merck-magenta text-xs font-bold border border-merck-magenta/20 mx-auto">
                        {r.observations}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-xs font-bold">0</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <Badge variant={
                      r.criticality === 'Critical' ? 'danger' :
                      r.criticality === 'Major' ? 'warning' :
                      r.criticality === 'Minor' ? 'info' : 'success'
                    } className="px-2.5 py-0.5 text-[9px] uppercase tracking-wider">
                      {r.criticality}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      r.category === 'Run'
                        ? "bg-merck-green/5 text-merck-green border-merck-green/15"
                        : "bg-merck-cyan/5 text-merck-cyan border-merck-cyan/15"
                    )}>{r.category}</span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button 
                      onClick={() => setSelectedAuditApp(r.originalApp)} 
                      className="px-4 py-1.5 text-[10px] font-bold text-merck-indigo bg-merck-indigo/5 rounded-full uppercase tracking-wider hover:bg-merck-indigo hover:text-white transition-all whitespace-nowrap"
                    >
                      Check Readiness
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <p className="text-sm text-slate-400 font-medium">No systems match the selected filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
