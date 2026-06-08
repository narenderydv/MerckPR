import React from 'react';
import { Application } from '../../types';
import { Badge } from '../ui/Badge';
import { ArrowLeft, CheckCircle2, History, AlertTriangle, Download } from 'lucide-react';
import { motion } from 'motion/react';

interface AuditReadinessDetailsProps {
  application: Application;
  onBack: () => void;
}

export const AuditReadinessDetails = ({ application, onBack }: AuditReadinessDetailsProps) => {
  const handleExportReadiness = () => {
    const headers = [
      'Observation ID', 
      'Description', 
      'Criticality', 
      'Status', 
      'Action Owner', 
      'Source Document', 
      'No. of Findings', 
      'Comments'
    ];
    const csvRows = [headers.join(',')];
    
    application.observations.forEach(obs => {
      const sourceDoc = obs.type === 'Audit' ? 'EMA-2025 Audit Report' : 'PR-2026 Assessment';
      const noOfFindings = 1;
      csvRows.push([
        obs.id, 
        `"${obs.description.replace(/"/g, '""')}"`, 
        obs.criticality, 
        obs.status, 
        `"${obs.owner}"`, 
        `"${sourceDoc}"`, 
        noOfFindings, 
        '""' // Comments column at the end
      ].join(','));
    });
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${application.name}_readiness_report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Audit Readiness — {application.name}</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              System ID: <span className="font-mono">{application.id}</span> | Owner: {application.owner} | Division: {application.division}
            </p>
          </div>
        </div>

        <button 
          onClick={handleExportReadiness} 
          className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 opacity-50" strokeWidth={1.8} />
          Export Readiness CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Audit</p>
          <p className="text-lg font-bold text-slate-900">{application.lastAuditDate || 'N/A'}</p>
          <Badge className="mt-2" variant={application.lastAuditOutcome === 'No Findings' ? 'success' : 'danger'}>
            {application.lastAuditOutcome || 'N/A'}
          </Badge>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PR Status</p>
          <p className="text-lg font-bold text-slate-900">{application.prStatus}</p>
          <Badge className="mt-2" variant={
            application.prStatus === 'Completed' ? 'success' :
            application.prStatus === 'In Progress' ? 'info' :
            application.prStatus === 'In Review' ? 'warning' :
            application.prStatus === 'To be Initiated' ? 'neutral' :
            'danger'
          }>
            {application.prStatus}
          </Badge>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Observations</p>
          <p className="text-lg font-bold text-slate-900">{application.observations.filter(o => o.status !== 'Closed').length}</p>
          <p className="text-xs text-slate-500 mt-1">Out of {application.observations.length} total</p>
        </div>
      </div>

      {/* Observations Detail Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center space-x-2 bg-slate-50/50">
          <AlertTriangle className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">System Observations & Findings</h3>
        </div>
        <div className="overflow-x-auto">
          {application.observations && application.observations.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Criticality</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action Owner</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source Document</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">No. of Findings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {application.observations.map(obs => (
                  <tr key={obs.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-slate-700">{obs.id}</td>
                    <td className="px-6 py-4 text-xs text-slate-600 max-w-md">{obs.description}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={
                        obs.criticality === 'Critical' ? 'danger' :
                        obs.criticality === 'Major' ? 'warning' :
                        'info'
                      } className="uppercase tracking-wider text-[9px] px-2 py-0.5">{obs.criticality}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={obs.status === 'Closed' ? 'success' : 'neutral'} className="uppercase tracking-wider text-[9px] px-2 py-0.5">{obs.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-700 font-semibold">{obs.owner}</td>
                    <td className="px-6 py-4 text-xs text-slate-600 font-medium">{obs.type === 'Audit' ? 'EMA-2025 Audit Report' : 'PR-2026 Assessment'}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-700 text-center">1</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">No observations recorded for this system.</div>
          )}
        </div>
      </div>

      {/* Audit History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center space-x-2 bg-slate-50/50">
          <History className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-display">Audit History</h3>
        </div>
        <div className="overflow-x-auto">
          {application.auditHistory && application.auditHistory.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Outcome</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auditor</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Findings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {application.auditHistory.map(audit => (
                  <tr key={audit.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-semibold text-slate-700">{audit.date}</td>
                    <td className="px-6 py-4"><Badge variant="info">{audit.type}</Badge></td>
                    <td className="px-6 py-4">
                      <Badge variant={audit.outcome === 'No Findings' ? 'success' : 'danger'}>{audit.outcome}</Badge>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">{audit.auditor}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-700 text-center">{audit.observations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">No audit history available.</div>
          )}
        </div>
      </div>

    </motion.div>
  );
};
