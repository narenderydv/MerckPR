import { Application } from '../types';

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'APP-001',
    name: 'LIMS-X',
    rdid: 'RD-7781',
    division: 'R&D',
    subDivision: 'RQS',
    owner: 'Dr. Sharma',
    platform: 'LabWare',
    ddit: 'DDTech-Alpha',
    lastAuditDate: '2025-11-12',
    lastAuditType: 'External',
    lastAuditOutcome: 'Minor Findings',
    prStatus: 'In Progress',
    observations: [
      {
        id: 'OBS-01',
        type: 'Audit',
        criticality: 'Critical',
        status: 'Open',
        description: 'Unauthorized access to raw data files detected in storage volume B.',
        dueDate: '2026-05-10',
        owner: 'James Wilson'
      },
      {
        id: 'OBS-02',
        type: 'PR',
        criticality: 'Major',
        status: 'Closed',
        description: 'User access matrix not updated after departmental reorganization.',
        dueDate: '2026-02-15',
        owner: 'Sita Ram'
      }
    ],
    auditHistory: [
      { id: 'AUD-101', date: '2025-11-12', type: 'External', outcome: 'Minor Findings', auditor: 'EMA Inspectorate', observations: 3 },
      { id: 'AUD-88', date: '2024-06-20', type: 'Internal', outcome: 'No Findings', auditor: 'Global Quality', observations: 0 }
    ],
    prHistory: [
      { year: 2026, status: 'In Progress', observationsCount: 1 },
      { year: 2025, status: 'Completed', completionDate: '2025-03-15', observationsCount: 4 }
    ],
    capas: [
      { id: 'CAPA-445', observationId: 'OBS-01', description: 'Implement encrypted storage volumes and restricted ACLs.', owner: 'IT Security Team', deadline: '2026-06-01', status: 'Approved' }
    ]
  },
  {
    id: 'APP-002',
    name: 'SAP-QMS',
    rdid: 'RD-8922',
    division: 'Quality',
    subDivision: 'CMS DDTech',
    owner: 'Sarah Connor',
    platform: 'SAP S/4HANA',
    ddit: 'DDTech-Enterprise',
    lastAuditDate: '2026-01-05',
    lastAuditType: 'Internal',
    lastAuditOutcome: 'No Findings',
    prStatus: 'Completed',
    observations: [
      {
        id: 'OBS-03',
        type: 'Audit',
        criticality: 'Minor',
        status: 'Closed',
        description: 'Document signature configuration setting had an incorrect timestamp offset.',
        dueDate: '2026-04-10',
        owner: 'Sarah Connor'
      }
    ],
    auditHistory: [
      { id: 'AUD-105', date: '2026-01-05', type: 'Internal', outcome: 'No Findings', auditor: 'Internal QA', observations: 0 }
    ],
    prHistory: [
      { year: 2026, status: 'Completed', completionDate: '2026-01-10', observationsCount: 0 }
    ],
    capas: []
  },
  {
    id: 'APP-003',
    name: 'ClinicalVault',
    rdid: 'RD-1120',
    division: 'Commercial',
    subDivision: 'GDO',
    owner: 'Robert Chen',
    platform: 'Veeva Vault',
    ddit: 'DDTech-Commercial',
    lastAuditDate: '2024-08-15',
    lastAuditType: 'External',
    lastAuditOutcome: 'Major Findings',
    prStatus: 'Overdue',
    observations: [
      {
        id: 'OBS-09',
        type: 'Audit',
        criticality: 'Major',
        status: 'In Progress',
        description: 'Audit trail logs missing for archive operations in Q3 2024.',
        dueDate: '2026-04-15',
        owner: 'Elena Gilbert'
      }
    ],
    auditHistory: [
      { id: 'AUD-72', date: '2024-08-15', type: 'External', outcome: 'Major Findings', auditor: 'FDA', observations: 6 }
    ],
    prHistory: [
      { year: 2026, status: 'Overdue', observationsCount: 2 }
    ],
    capas: [
      { id: 'CAPA-991', observationId: 'OBS-09', description: 'Patch log rotation script and verify archive consistency.', owner: 'DevOps', deadline: '2026-05-30', status: 'In Implementation' }
    ]
  },
  {
    id: 'APP-004',
    name: 'InfraFlow',
    rdid: 'RD-2234',
    division: 'DDIT',
    subDivision: 'Platform',
    owner: 'Marcus Aurelius',
    platform: 'ServiceNow',
    ddit: 'DDTech-Core',
    lastAuditDate: '2026-02-28',
    lastAuditType: 'Internal',
    lastAuditOutcome: 'No Findings',
    prStatus: 'Completed',
    observations: [
      {
        id: 'OBS-04',
        type: 'PR',
        criticality: 'Minor',
        status: 'Closed',
        description: 'Routine backup logs for November 2025 were stored on a secondary server before confirmation.',
        dueDate: '2026-03-15',
        owner: 'Marcus Aurelius'
      }
    ],
    auditHistory: [],
    prHistory: [{ year: 2026, status: 'Completed', observationsCount: 0 }],
    capas: []
  },
  {
    id: 'APP-005',
    name: 'PharmaCompliance 360',
    rdid: 'RD-5566',
    division: 'Quality',
    subDivision: 'RQS',
    owner: 'Linda Hamilton',
    platform: 'OpenText',
    ddit: 'DDTech-Enterprise',
    lastAuditDate: '2025-05-15',
    lastAuditType: 'External',
    lastAuditOutcome: 'Critical Findings',
    prStatus: 'Overdue',
    observations: [
      {
        id: 'OBS-99',
        type: 'Audit',
        criticality: 'Critical',
        status: 'Open',
        description: 'Validation documentation for version 4.2 missing for 3 core modules.',
        dueDate: '2026-03-01',
        owner: 'Linda Hamilton'
      }
    ],
    auditHistory: [{ id: 'AUD-99', date: '2025-05-15', type: 'External', outcome: 'Critical Findings', auditor: 'MHRA', observations: 12 }],
    prHistory: [{ year: 2026, status: 'Overdue', observationsCount: 5 }],
    capas: []
  },
  {
    id: 'APP-006',
    name: 'GenoLink',
    rdid: 'RD-007',
    division: 'R&D',
    subDivision: 'GDO',
    owner: 'Natasha Romanoff',
    platform: 'AWS HealthOmics',
    ddit: 'DDTech-Alpha',
    lastAuditDate: '2025-12-01',
    lastAuditType: 'Internal',
    lastAuditOutcome: 'Minor Findings',
    prStatus: 'To be Initiated',
    observations: [
      {
        id: 'OBS-05',
        type: 'Audit',
        criticality: 'Major',
        status: 'Open',
        description: 'Insufficient encryption key rotation policy document approval signature.',
        dueDate: '2026-08-30',
        owner: 'Natasha Romanoff'
      }
    ],
    auditHistory: [],
    prHistory: [{ year: 2026, status: 'To be Initiated', observationsCount: 1 }],
    capas: []
  }
];
