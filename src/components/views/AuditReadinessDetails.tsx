import React from 'react';
import { Application } from '../../types';
import { Badge } from '../ui/Badge';
import { ArrowLeft, CheckCircle2, History, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface AuditReadinessDetailsProps {
  application: Application;
  onBack: () => void;
}

export const AuditReadinessDetails = ({ application, onBack }: AuditReadinessDetailsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header Area */}
      <div className="flex items-center space-x-4 mb-6">
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
          <Badge className="mt-2" variant={application.prStatus === 'Completed' ? 'success' : application.prStatus === 'Pending' ? 'info' : 'danger'}>
            {application.prStatus}
          </Badge>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Observations</p>
          <p className="text-lg font-bold text-slate-900">{application.observations.filter(o => o.status !== 'Closed').length}</p>
          <p className="text-xs text-slate-500 mt-1">Out of {application.observations.length} total</p>
        </div>
      </div>

      {/* Audit History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center space-x-2 bg-slate-50/50">
          <History className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Audit History</h3>
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
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Findings</th>
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
                    <td className="px-6 py-4 text-xs font-bold text-slate-700">{audit.observations}</td>
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
