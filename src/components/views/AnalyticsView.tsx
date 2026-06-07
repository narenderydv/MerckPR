import React, { useState } from 'react';
import { CompliancePieChart, CriticalityBarChart } from '../dashboard/ComplianceCharts';
import { ObservationTrendChart } from '../dashboard/ObservationTrendChart';
import { 
  STATUS_OVERVIEW_CHART, 
  OBSERVATION_CRITICALITY_CHART,
  DASHBOARD_STATS
} from '../../constants/dashboardData';
import { Activity, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { ReportsView } from './ReportsView';

export const AnalyticsView = () => {
  const [activeSegment, setActiveSegment] = useState('');

  return (
    <div className="space-y-6">

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Applications" 
          value={DASHBOARD_STATS.totalApplications} 
          icon={Activity}
          description="Monitored in GxP scope"
          onClick={() => setActiveSegment('')}
          isActive={!activeSegment}
        />
        <StatCard 
          label="Reviewed (2026)" 
          value={DASHBOARD_STATS.reviewedCurrentYear} 
          trend={12}
          icon={CheckCircle2}
          description="Periodic reviews completed"
          onClick={() => setActiveSegment('Completed')}
          isActive={activeSegment === 'Completed'}
        />
        <StatCard 
          label="Pending Reviews" 
          value={DASHBOARD_STATS.pendingReviews} 
          icon={Clock}
          description="Due in next 90 days"
          onClick={() => setActiveSegment('Pending')}
          isActive={activeSegment === 'Pending'}
        />
        <StatCard 
          label="Overdue Reviews" 
          value={DASHBOARD_STATS.overdueReviews} 
          trend={-5}
          icon={AlertCircle}
          description="Requires immediate action"
          onClick={() => setActiveSegment('Overdue')}
          isActive={activeSegment === 'Overdue'}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompliancePieChart 
          data={STATUS_OVERVIEW_CHART} 
          onSegmentClick={(name) => setActiveSegment(prev => prev === name ? '' : name)}
          activeSegment={activeSegment}
        />
        <CriticalityBarChart data={OBSERVATION_CRITICALITY_CHART} />
      </div>

      {/* Trend Chart */}
      <ObservationTrendChart />

      {/* Divider */}
      <div className="h-px bg-slate-200/60 my-8" />

      {/* Reports Section */}
      <ReportsView />
    </div>
  );
};
