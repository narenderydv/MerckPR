import React from 'react';
import { Settings, Shield, Users, Globe, Bell, Lock, Database } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const SettingsView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">System Configuration</h2>
          <p className="text-xs text-slate-500 font-medium">Manage global platform settings and compliance parameters</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="info" className="px-3 py-1">v2.4.0-Enterprise</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {['General', 'User Access', 'Audit Config', 'Notifications', 'API & Integration', 'Advanced'].map((tab, idx) => (
            <button 
              key={tab}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                idx === 0 ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Access Control</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                <div>
                  <p className="text-xs font-bold text-slate-900">Enforce Multi-Factor Authentication (MFA)</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Requires all users to verify identity via authenticator app or email</p>
                </div>
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 h-4 w-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-6 border-b border-slate-50">
                <div>
                  <p className="text-xs font-bold text-slate-900">Automatic Session Timeout</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">Idle time before user is logged out (Recommended: 30 mins)</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-bold text-slate-700">
                  <option>15 mins</option>
                  <option selected>30 mins</option>
                  <option>60 mins</option>
                </select>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900 mb-4">Division Management</p>
                <div className="flex flex-wrap gap-2">
                  {['R&D', 'Quality', 'Manufacturing', 'DDIT', 'Commercial'].map((div) => (
                    <span key={div} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 flex items-center">
                      {div}
                      <Lock className="w-2.5 h-2.5 ml-2 text-slate-300" />
                    </span>
                  ))}
                  <button className="px-3 py-1 bg-white border border-dashed border-slate-300 rounded-full text-[10px] font-bold text-blue-600 hover:border-blue-500 transition-colors">
                    + Register Division
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Database className="w-5 h-5 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Storage & Metadata</h3>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 max-w-sm">Manage global system identifiers (ID prefix, RDID format) and archival settings for old review data.</p>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50">
                Manage Config
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
