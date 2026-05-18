export type Division = 'R&D' | 'Quality' | 'Commercial' | 'Medical' | 'Manufacturing' | 'DDIT';
export type Criticality = 'Critical' | 'Major' | 'Minor';
export type ObservationStatus = 'Open' | 'Closed' | 'In Progress';
export type AuditType = 'Internal' | 'External';
export type AuditOutcome = 'No Findings' | 'Minor Findings' | 'Major Findings' | 'Critical Findings';
export type PRStatus = 'Completed' | 'Pending' | 'Overdue';

export interface Observation {
  id: string;
  type: 'Audit' | 'PR';
  criticality: Criticality;
  status: ObservationStatus;
  description: string;
  dueDate: string;
  owner: string;
}

export interface CAPA {
  id: string;
  observationId: string;
  description: string;
  owner: string;
  deadline: string;
  status: 'Draft' | 'Approved' | 'In Implementation' | 'Verified' | 'Closed';
}

export interface AuditRecord {
  id: string;
  date: string;
  type: AuditType;
  outcome: AuditOutcome;
  auditor: string;
  observations: number;
}

export interface PeriodicReview {
  year: number;
  status: PRStatus;
  completionDate?: string;
  observationsCount: number;
}

export interface Application {
  id: string;
  name: string;
  rdid: string;
  division: Division;
  subDivision: string;
  owner: string;
  platform: string;
  ddit: string;
  lastAuditDate: string;
  lastAuditType: AuditType;
  lastAuditOutcome: AuditOutcome;
  prStatus: PRStatus;
  observations: Observation[];
  auditHistory: AuditRecord[];
  prHistory: PeriodicReview[];
  capas: CAPA[];
}
