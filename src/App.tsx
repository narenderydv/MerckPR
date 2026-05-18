/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { StatCard } from './components/dashboard/StatCard';
import { CompliancePieChart, CriticalityBarChart } from './components/dashboard/ComplianceCharts';
import { ObservationTrendChart } from './components/dashboard/ObservationTrendChart';
import { ApplicationTable } from './components/dashboard/ApplicationTable';
import { SystemDetails } from './components/detail/SystemDetails';
import { FilterBar } from './components/dashboard/FilterBar';
import { 
  DASHBOARD_STATS, 
  STATUS_OVERVIEW_CHART, 
  OBSERVATION_CRITICALITY_CHART 
} from './constants/dashboardData';
import { MOCK_APPLICATIONS } from './constants/mockData';
import { Application } from './types';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

import { PeriodicReviews } from './components/views/PeriodicReviews';
import { AuditLogRegistry } from './components/views/AuditLogRegistry';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AdminControls } from './components/views/AdminControls';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardView, setDashboardView] = useState<'pr' | 'audit'>('pr');
  
  // Filter State
  const [filters, setFilters] = useState({
    year: '',
    division: '',
    search: '',
    prStatus: ''
  });

  const filteredApplications = useMemo(() => {
    return MOCK_APPLICATIONS.filter(app => {
      const appYear = app.prHistory?.[0]?.year?.toString() || (app.lastAuditDate ? app.lastAuditDate.substring(0, 4) : '');
      const matchYear = !filters.year || appYear === filters.year;
      const matchDivision = !filters.division || app.division === filters.division;
      const matchStatus = !filters.prStatus || app.prStatus === filters.prStatus;
      const searchLower = filters.search.toLowerCase();
      const matchSearch = !filters.search || 
        app.name.toLowerCase().includes(searchLower) || 
        app.id.toLowerCase().includes(searchLower) || 
        app.rdid.toLowerCase().includes(searchLower);
      
      return matchYear && matchDivision && matchSearch && matchStatus;
    });
  }, [filters]);

  const breadcrumb = useMemo(() => {
    const base = ['ReviewIQ'];
    if (selectedApp) return [...base, 'Dashboard', selectedApp.name];
    if (activeSection === 'dashboard') return [...base, 'Dashboard'];
    if (activeSection === 'analytics') return [...base, 'Analytics'];
    if (activeSection === 'audits') return [...base, 'Audit Readiness'];
    if (activeSection === 'admin') return [...base, 'Admin Controls'];
    return [...base, activeSection.charAt(0).toUpperCase() + activeSection.slice(1)];
  }, [activeSection, selectedApp]);

  const getPageTitle = () => {
    if (selectedApp) return "System Profile";
    switch (activeSection) {
      case 'dashboard': return "PR Executive Dashboard";
      case 'analytics': return "Compliance Analytics";
      case 'reviews': return "Periodic Reviews";
      case 'audits': return "Audit Readiness";
      case 'reports': return "Global Reports";
      case 'admin': return "Admin Controls";
      case 'settings': return "Settings";
      default: return "ReviewIQ";
    }
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      prStatus: prev.prStatus === status ? '' : status
    }));
  };

  const handleAppSelect = (app: Application) => {
    setSelectedApp(app);
  };

  const clearSelection = () => {
    setSelectedApp(null);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex bg-slate-50 p-1 rounded-2xl w-fit border border-slate-100">
        <button
          onClick={() => setDashboardView('pr')}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300",
            dashboardView === 'pr' 
              ? "text-white" 
              : "text-slate-500 hover:text-slate-700 hover:bg-white"
          )}
          style={dashboardView === 'pr' ? {
            background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
            boxShadow: '0 4px 16px rgba(107,63,160,0.25)'
          } : undefined}
        >
          Periodic Review
        </button>
        <button
          onClick={() => setDashboardView('audit')}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300",
            dashboardView === 'audit' 
              ? "text-white" 
              : "text-slate-500 hover:text-slate-700 hover:bg-white"
          )}
          style={dashboardView === 'audit' ? {
            background: 'linear-gradient(135deg, #7B4FB8, #4A2D7A)',
            boxShadow: '0 4px 16px rgba(107,63,160,0.25)'
          } : undefined}
        >
          Audit Readiness
        </button>
      </div>

      {dashboardView === 'pr' ? (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="Total Applications" 
              value={DASHBOARD_STATS.totalApplications} 
              icon={Activity}
              description="Monitored in GxP scope"
              onClick={() => handleStatusFilter('')}
              isActive={!filters.prStatus}
            />
            <StatCard 
              label="Reviewed (2026)" 
              value={DASHBOARD_STATS.reviewedCurrentYear} 
              trend={12}
              icon={CheckCircle2}
              description="Periodic reviews completed"
              onClick={() => handleStatusFilter('Completed')}
              isActive={filters.prStatus === 'Completed'}
            />
            <StatCard 
              label="Pending Reviews" 
              value={DASHBOARD_STATS.pendingReviews} 
              icon={Clock}
              description="Due in next 90 days"
              onClick={() => handleStatusFilter('Pending')}
              isActive={filters.prStatus === 'Pending'}
            />
            <StatCard 
              label="Overdue Reviews" 
              value={DASHBOARD_STATS.overdueReviews} 
              trend={-5}
              icon={AlertCircle}
              description="Requires immediate action"
              onClick={() => handleStatusFilter('Overdue')}
              isActive={filters.prStatus === 'Overdue'}
            />
          </div>

      {/* Filters & Recent Activity */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Dashboard View Options</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Filtered: {filteredApplications.length} Systems</p>
        </div>
        <FilterBar 
          filters={filters} 
          setFilters={setFilters} 
          onClear={() => setFilters({ year: '', division: '', search: '', prStatus: '' })} 
        />
          <ApplicationTable 
            applications={filteredApplications} 
            onRowClick={handleAppSelect} 
          />
        </div>
      </>
      ) : (
        <AuditLogRegistry />
      )}
    </div>
  );


  const renderContent = () => {
    if (selectedApp) {
      return <SystemDetails application={selectedApp} onBack={clearSelection} />;
    }

    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'analytics':
        return <AnalyticsView />;
      case 'reviews':
        return <PeriodicReviews />;
      case 'audits':
        return <AuditLogRegistry />;
      case 'reports':
        return <ReportsView />;
      case 'admin':
        return <AdminControls />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <ShieldCheck className="w-12 h-12 text-slate-200 mb-4" />
            <p className="text-sm font-semibold text-slate-500">Feature Currently Under Development</p>
          </div>
        );
    }
  };


  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={(s) => {
          setActiveSection(s);
          setSelectedApp(null);
        }} 
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuToggle={toggleSidebar} 
          title={getPageTitle()}
          breadcrumb={breadcrumb}
        />
        
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedApp ? `details-${selectedApp.id}` : activeSection}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>


      </div>
    </div>
  );
}
