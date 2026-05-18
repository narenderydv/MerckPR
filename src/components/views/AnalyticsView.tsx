import React, { useState } from 'react';
import { CompliancePieChart, CriticalityBarChart } from '../dashboard/ComplianceCharts';
import { ObservationTrendChart } from '../dashboard/ObservationTrendChart';
import { 
  STATUS_OVERVIEW_CHART, 
  OBSERVATION_CRITICALITY_CHART,
  DASHBOARD_STATS
} from '../../constants/dashboardData';
import { BarChart3, TrendingUp, PieChart, Activity, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';

export const AnalyticsView = () => {
  const [activeSegment, setActiveSegment] = useState('');

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-merck-indigo/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-merck-indigo" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">Compliance Analytics</h2>
            <p className="text-xs text-slate-400 font-medium">Visual insights into review status, observations, and trends</p>
          </div>
        </div>
      </div>

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
    </div>
  );
};
