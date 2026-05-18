import React, { useState } from 'react';
import { 
  Users, Shield, Key, Bell, Database, Globe, 
  ChevronRight, ToggleLeft, ToggleRight, Lock,
  UserPlus, Settings, AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { motion } from 'motion/react';

const USERS_DATA = [
  { name: 'Dr. Elena Fisher', email: 'elena.fisher@merck.com', role: 'Global Admin', status: 'Active', lastLogin: '2026-05-18' },
  { name: 'Dr. James Okafor', email: 'james.okafor@merck.com', role: 'Reviewer', status: 'Active', lastLogin: '2026-05-17' },
  { name: 'Maria Santos', email: 'maria.santos@merck.com', role: 'Contributor', status: 'Active', lastLogin: '2026-05-16' },
  { name: 'Chen Wei', email: 'chen.wei@merck.com', role: 'Reviewer', status: 'Inactive', lastLogin: '2026-04-20' },
  { name: 'Anika Patel', email: 'anika.patel@merck.com', role: 'Contributor', status: 'Active', lastLogin: '2026-05-18' },
  { name: 'Robert Müller', email: 'robert.muller@merck.com', role: 'Auditor', status: 'Active', lastLogin: '2026-05-15' },
];

const AUDIT_LOGS = [
  { action: 'User role updated', user: 'Dr. Elena Fisher', target: 'Chen Wei → Reviewer', time: '2 hours ago' },
  { action: 'System access revoked', user: 'System', target: 'Legacy LIMS Portal', time: '5 hours ago' },
  { action: 'New user invited', user: 'Dr. Elena Fisher', target: 'sarah.kim@merck.com', time: '1 day ago' },
  { action: 'MFA policy enabled', user: 'System', target: 'All users', time: '2 days ago' },
  { action: 'Data export triggered', user: 'Robert Müller', target: 'Q1 Audit Readiness', time: '3 days ago' },
];

export const AdminControls = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'audit'>('users');
  const [notifyOnReview, setNotifyOnReview] = useState(true);
  const [autoAssign, setAutoAssign] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);

  const tabs = [
    { id: 'users' as const, label: 'User Management', icon: Users },
    { id: 'roles' as const, label: 'Roles & Permissions', icon: Shield },
    { id: 'audit' as const, label: 'Activity Log', icon: Database },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* Header */}
      <div className="flex justify-between items-end pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-merck-indigo/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-merck-indigo" strokeWidth={1.8} />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-display">Admin Controls</h2>
            <p className="text-xs text-slate-400 font-medium">Manage users, roles, permissions and platform settings</p>
          </div>
        </div>
        <button 
          className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-merck-indigo/20" 
          style={{ background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)' }}
        >
          <UserPlus className="w-3.5 h-3.5" strokeWidth={2} />
          Invite User
        </button>
      </div>

      {/* Quick Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="merck-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-merck-indigo/[0.06] flex items-center justify-center">
              <Bell className="w-4 h-4 text-merck-indigo" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Review Notifications</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Email on new reviews</p>
            </div>
          </div>
          <button onClick={() => setNotifyOnReview(!notifyOnReview)}>
            {notifyOnReview 
              ? <ToggleRight className="w-7 h-7 text-merck-indigo" strokeWidth={1.8} /> 
              : <ToggleLeft className="w-7 h-7 text-slate-300" strokeWidth={1.8} />}
          </button>
        </div>

        <div className="merck-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-merck-indigo/[0.06] flex items-center justify-center">
              <Globe className="w-4 h-4 text-merck-indigo" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Auto-assign Reviewers</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Based on division</p>
            </div>
          </div>
          <button onClick={() => setAutoAssign(!autoAssign)}>
            {autoAssign 
              ? <ToggleRight className="w-7 h-7 text-merck-indigo" strokeWidth={1.8} /> 
              : <ToggleLeft className="w-7 h-7 text-slate-300" strokeWidth={1.8} />}
          </button>
        </div>

        <div className="merck-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-merck-indigo/[0.06] flex items-center justify-center">
              <Lock className="w-4 h-4 text-merck-indigo" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">MFA Enforcement</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Multi-factor auth</p>
            </div>
          </div>
          <button onClick={() => setMfaEnabled(!mfaEnabled)}>
            {mfaEnabled 
              ? <ToggleRight className="w-7 h-7 text-merck-indigo" strokeWidth={1.8} /> 
              : <ToggleLeft className="w-7 h-7 text-slate-300" strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-slate-50 p-1 rounded-2xl w-fit border border-slate-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-2",
              activeTab === tab.id 
                ? "text-white" 
                : "text-slate-500 hover:text-slate-700 hover:bg-white"
            )}
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
              boxShadow: '0 4px 16px rgba(107,63,160,0.25)'
            } : undefined}
          >
            <tab.icon className="w-3.5 h-3.5" strokeWidth={1.8} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'users' && (
        <div className="merck-card overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight font-display">Registered Users</h3>
            <span className="px-2.5 py-0.5 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-semibold border border-slate-100">{USERS_DATA.length} users</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Last Login</th>
                  <th className="px-8 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {USERS_DATA.map((user, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className={cn(
                        "text-[10px] font-semibold px-2.5 py-1 rounded-lg border",
                        user.role === 'Global Admin' ? "bg-merck-indigo/5 text-merck-indigo border-merck-indigo/10" :
                        user.role === 'Auditor' ? "bg-amber-50 text-amber-600 border-amber-200/50" :
                        "bg-slate-50 text-slate-500 border-slate-100"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <Badge variant={user.status === 'Active' ? 'success' : 'neutral'}>{user.status}</Badge>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-xs text-slate-500 font-medium">{user.lastLogin}</span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="text-[10px] font-semibold text-merck-indigo hover:text-merck-deep transition-colors opacity-0 group-hover:opacity-100">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { role: 'Global Admin', desc: 'Full access to all features, settings, and user management', permissions: ['Manage Users', 'Configure Settings', 'View All Data', 'Export Reports', 'Delete Records'], count: 1 },
            { role: 'Reviewer', desc: 'Review and approve periodic review submissions', permissions: ['Review Submissions', 'Add Comments', 'View Assigned Systems', 'Export Reports'], count: 2 },
            { role: 'Contributor', desc: 'Create and submit periodic review questionnaires', permissions: ['Submit Reviews', 'Upload Evidence', 'View Own Systems'], count: 2 },
            { role: 'Auditor', desc: 'Read-only access to audit readiness and compliance data', permissions: ['View Audit Data', 'Export Reports', 'View Analytics'], count: 1 },
          ].map(r => (
            <div key={r.role} className="merck-card p-6 hover:shadow-lg hover:shadow-merck-indigo/[0.04] transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-merck-indigo/[0.06] flex items-center justify-center">
                    <Key className="w-4 h-4 text-merck-indigo" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 font-display">{r.role}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{r.count} user{r.count > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-merck-indigo transition-colors" strokeWidth={1.8} />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{r.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {r.permissions.map(p => (
                  <span key={p} className="text-[9px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="merck-card overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight font-display">Recent Activity</h3>
            <span className="text-[10px] font-medium text-slate-400">Last 7 days</span>
          </div>
          <div className="divide-y divide-slate-50">
            {AUDIT_LOGS.map((log, idx) => (
              <div key={idx} className="px-8 py-5 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-merck-indigo/[0.06] flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5 text-merck-indigo" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800">{log.action}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    by <span className="text-slate-500 font-medium">{log.user}</span> · {log.target}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
