import { MOCK_APPLICATIONS } from './mockData';

export const DASHBOARD_STATS = {
  totalApplications: 128,
  reviewedCurrentYear: 92,
  pendingReviews: 21,
  overdueReviews: 15,
  criticalObservations: 5,
  majorObservations: 18,
  minorObservations: 32
};

export const OBSERVATION_CRITICALITY_CHART = [
  { name: 'Critical', value: 5, color: '#eb3c96' }, // merck-magenta
  { name: 'Major', value: 18, color: '#f97316' },  
  { name: 'Minor', value: 32, color: '#ffc800' }   // merck-yellow
];

export const STATUS_OVERVIEW_CHART = [
  { name: 'Completed', value: 92, color: '#008c44' }, // merck-green
  { name: 'Pending', value: 21, color: '#0090ff' },   // merck-cyan
  { name: 'Overdue', value: 15, color: '#503291' }    // merck-indigo
];

export const AUDIT_HISTORY_DUMMY = MOCK_APPLICATIONS.flatMap(app => 
  app.auditHistory.map(audit => ({
    ...audit,
    appName: app.name,
    appId: app.id
  }))
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
