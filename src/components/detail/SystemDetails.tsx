import React, { useState, useMemo } from 'react';
import { Application, Observation, CAPA } from '../../types';
import { Badge } from '../ui/Badge';
import { 
  ArrowLeft, 
  ShieldAlert, 
  User, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface SystemDetailsProps {
  application: Application;
  onBack: () => void;
}

export const SystemDetails = ({ application, onBack }: SystemDetailsProps) => {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCriticality, setFilterCriticality] = useState('');
  const [filterOwner, setFilterOwner] = useState('');
  const [sortConfig, setSortConfig] = useState<{key: keyof Observation, direction: 'asc' | 'desc'} | null>(null);

  const categories = Array.from(new Set(application.observations.map(o => o.type)));
  const criticalities = Array.from(new Set(application.observations.map(o => o.criticality)));
  const owners = Array.from(new Set(application.observations.map(o => o.owner)));

  const filteredAndSortedObservations = useMemo(() => {
    let filtered = application.observations;
    if (filterText) {
      const lower = filterText.toLowerCase();
      filtered = filtered.filter(obs => 
        obs.id.toLowerCase().includes(lower) ||
        obs.type.toLowerCase().includes(lower) ||
        obs.criticality.toLowerCase().includes(lower) ||
        obs.description.toLowerCase().includes(lower) ||
        obs.owner.toLowerCase().includes(lower)
      );
    }
    if (filterCategory) {
      filtered = filtered.filter(obs => obs.type === filterCategory);
    }
    if (filterCriticality) {
      filtered = filtered.filter(obs => obs.criticality === filterCriticality);
    }
    if (filterOwner) {
      filtered = filtered.filter(obs => obs.owner === filterOwner);
    }

    if (sortConfig !== null) {
      filtered = [...filtered].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filtered;
  }, [application.observations, filterText, filterCategory, filterCriticality, filterOwner, sortConfig]);

  const handleSort = (key: keyof Observation) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight font-display">{application.name}</h1>
              <Badge variant={
                application.prStatus === 'Completed' ? 'success' : 
                application.prStatus === 'In Progress' ? 'info' : 
                application.prStatus === 'In Review' ? 'warning' : 
                application.prStatus === 'To be Initiated' ? 'neutral' : 
                'danger'
              }>{application.prStatus}</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              System ID: <span className="font-mono">{application.id}</span> | Global RDID: <span className="font-mono">{application.rdid}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-3 space-y-6">

          {/* Observations Tracking */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(107,63,160,0.03), 0 4px 16px rgba(107,63,160,0.03)' }}>
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-slate-400" strokeWidth={1.8} />
                <h3 className="text-sm font-bold text-slate-800 tracking-tight font-display">Observations Detail</h3>
              </div>
              <div className="flex items-center space-x-3">
                <select 
                  value={filterCategory} 
                  onChange={e => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-slate-50 cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select 
                  value={filterCriticality} 
                  onChange={e => setFilterCriticality(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-slate-50 cursor-pointer"
                >
                  <option value="">All Criticalities</option>
                  {criticalities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select 
                  value={filterOwner} 
                  onChange={e => setFilterOwner(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium text-slate-700 bg-slate-50 cursor-pointer"
                >
                  <option value="">All Owners</option>
                  {owners.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs w-48 focus:outline-none focus:ring-2 focus:ring-merck-indigo/20 font-medium placeholder:text-slate-400"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              {filteredAndSortedObservations.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors rounded-tl-xl" onClick={() => handleSort('id')}>Observation ID</th>
                      <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('type')}>Category</th>
                      <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('criticality')}>Criticality</th>
                      <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => handleSort('owner')}>Owner</th>
                      <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors rounded-tr-xl" onClick={() => handleSort('dueDate')}>Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredAndSortedObservations.map((obs) => (
                      <tr key={obs.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold font-mono text-merck-indigo bg-merck-indigo/5 px-2.5 py-1 rounded-lg border border-merck-indigo/10">{obs.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold text-slate-700">{obs.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={
                            obs.criticality === 'Critical' ? 'danger' : 
                            obs.criticality === 'Major' ? 'warning' : 'info'
                          }>{obs.criticality}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-700 font-medium max-w-md">{obs.description}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase">
                            <User className="w-3 h-3 mr-1" />
                            {obs.owner}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-xs text-slate-500 font-medium whitespace-nowrap">
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {obs.dueDate}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-100 mx-auto mb-4" />
                  <p className="text-slate-400 text-sm font-medium">No active observations found for this system</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
