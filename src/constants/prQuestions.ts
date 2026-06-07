export interface PRQuestionCitation {
  id: string;
  source: string;
  section?: string;
}

export interface ReviewerComment {
  id: string;
  reviewer: string;
  timestamp: string;
  comment: string;
}

export interface PRQuestion {
  id: string;
  number: number;
  category: string;
  question: string;
  reviewerType: string;
  aiAnswer: string;
  citations: PRQuestionCitation[];
}

export const PR_QUESTIONS: PRQuestion[] = [
  {
    id: 'PRQ-01',
    number: 1,
    category: 'Previous PR report',
    question: 'Review the previous Periodic Review Report for the system or if not available yet, the most recent Validation Report. Verify that any corrective actions from previous PR or open issues listed in the VR have been resolved.*',
    reviewerType: 'RDQ & ITQA',
    aiAnswer: `Previous Year PR report has been reviewed. Last year open Observations has been moved to this year PR record. Criticality of these observations have been raised. References of the observations have been moved to this year record.
<<Provide references of last year PR record and all the open Observation IDs from last year or system validation report in case of first PR>>`,
    citations: [
      { id: 'PRC-01', source: 'PR Checklist 2025', section: 'Question 1' }
    ]
  },
  {
    id: 'PRQ-02',
    number: 2,
    category: 'Vendor Management',
    question: 'Verify that vendor/assessment has been conducted?',
    reviewerType: 'RDQA',
    aiAnswer: `Vendor assessment/audit has been conducted on date <<date reference>>.
<<Add reference of audit/assessment report>>`,
    citations: [
      { id: 'PRC-02', source: 'PR Checklist 2025', section: 'Question 2' }
    ]
  },
  {
    id: 'PRQ-03',
    number: 3,
    category: 'Vendor Management',
    question: 'Verify that vendor oversight plan has been defined or vendor oversight activities have been described?',
    reviewerType: 'RDQA',
    aiAnswer: `Vendor oversight activities have been defined in Vendor Oversight Plan <<or Business Operations Manual>>. These activities are conducted as per the defined schedule. Results of the activities performed are recorded.
<<Add reference of vendor oversight plan/BOM and reference of meeting minutes of sessions conducted with vendor>>`,
    citations: [
      { id: 'PRC-03', source: 'PR Checklist 2025', section: 'Question 3' }
    ]
  },
  {
    id: 'PRQ-04',
    number: 4,
    category: 'Vendor Management',
    question: 'Verify that SLA/MSA has been created with the vendor or/and IT team, is up to date and reflects KPIs.',
    reviewerType: 'RDQA',
    aiAnswer: `SLA/MSA with vendor was created on date <<date reference>>, It is stored in <<system where it is uploaded>> and is still valid. <<Add reference of SLA/MSA and system>>
SLA with IT team exists and is available and up to date.
SLA describes the KPIs based on which system performance is monitored.`,
    citations: [
      { id: 'PRC-04', source: 'PR Checklist 2025', section: 'Question 4' }
    ]
  },
  {
    id: 'PRQ-05',
    number: 5,
    category: 'Validation',
    question: 'Review the system validation documentation. Verify that all documentation is complete, up-to-date, and available. Verify that any outstanding actions have been addressed. Verify that the system inventory list entry is up to date.*',
    reviewerType: 'RDQA',
    aiAnswer: `All the system validation documents have been reviewed. Documents are still up to date and complete.
System inventory list is up to date
<<Add references of VP, VR and BOM>>`,
    citations: [
      { id: 'PRC-05', source: 'PR Checklist 2025', section: 'Question 5' }
    ]
  },
  {
    id: 'PRQ-06',
    number: 6,
    category: 'Qualification',
    question: 'Review the system qualification documentation. Verify that all documentation is complete, up to date, and available. Verify that any outstanding actions have been addressed.',
    reviewerType: 'ITQA',
    aiAnswer: `All the system qualification documents have been reviewed. Documents are still up to date and complete.
<<Add references of QP, QR and Tech Specs and BSID>>`,
    citations: [
      { id: 'PRC-06', source: 'PR Checklist 2025', section: 'Question 6' }
    ]
  },
  {
    id: 'PRQ-07',
    number: 7,
    category: 'Procedures & Training',
    question: 'Review any SOPs, guidelines and working instructions related to the system established during validation. Verify that these are trained, followed and up to date.*',
    reviewerType: 'RDQA',
    aiAnswer: `<<WI/Admin Manual/ SOP reference>> has been reviewed and it is up to date as per the latest procedures. Individuals are trained on SOP through HR4YOU training. Trainings are verified before users are provided access to system.`,
    citations: [
      { id: 'PRC-07', source: 'PR Checklist 2025', section: 'Question 7' }
    ]
  },
  {
    id: 'PRQ-08',
    number: 8,
    category: 'Change Control',
    question: 'Review the system change control documentation. Verify whether all changes have been closed contemporaneously after system implementation or change implementation and assess whether there have been any changes to the intended use of the system.*',
    reviewerType: 'RDQA to check for business changes and ITQA to check for IT changes.',
    aiAnswer: `For this PR period, reviewed the changes and the related validation documents. All the change activitites have been performed as per the defined process. All the change requests and related change actions are captured in Veeva QMS and can be searched with CS Name or system ID <<add the system ID>>.
Intended use of the system has not been changed
Related RFCs created for the change is also attached.
RFCs are reviewed by QO
<<attach the RFC and CS changes linked sheets>>`,
    citations: [
      { id: 'PRC-08', source: 'PR Checklist 2025', section: 'Question 8' }
    ]
  },
  {
    id: 'PRQ-09',
    number: 9,
    category: 'Operations & Maintenance',
    question: 'Review the current system-specific operating and maintenance procedures. Verify that they are up to date and reflect current practice.*',
    reviewerType: 'RDQA',
    aiAnswer: `Reviewed the procedures / activities highlighted in BOM. Procedures defined are still valid, they reflect the currebt practice and followed for operational phase.
<<Add reference of BOM>>`,
    citations: [
      { id: 'PRC-09', source: 'PR Checklist 2025', section: 'Question 9' }
    ]
  },
  {
    id: 'PRQ-10',
    number: 10,
    category: 'Audit Trail',
    question: 'Review the latest audit trail review report. Verify that the audit trail review has been conducted as described in the operational manual or audit trail review plan.*',
    reviewerType: 'RDQA',
    aiAnswer: `Audit Trail review plan exists and audit trail review activity has been performed as per the defined schedule. Based on this audit trail review report has been created and open actions have been recorded in the report.

<<Add reference of audit trail review plan and audit trail review report>>`,
    citations: [
      { id: 'PRC-10', source: 'PR Checklist 2025', section: 'Question 10' }
    ]
  },
  {
    id: 'PRQ-11',
    number: 11,
    category: 'Audit Readiness',
    question: 'Review any audits carried out for the system and life-cycle documentation. Verify that any observations have been addressed.*',
    reviewerType: 'RDQA',
    aiAnswer: `System audit was performed on date <<date reference>>. Observations are created and will be closed as per the defined timelines in Obs record.
<<add the reference of audit record>>`,
    citations: [
      { id: 'PRC-11', source: 'PR Checklist 2025', section: 'Question 11' }
    ]
  },
  {
    id: 'PRQ-12',
    number: 12,
    category: 'Incident Management',
    question: 'Review incident- and problem records and maintenance logs Verify that the records have been handled according to the defined processes.*',
    reviewerType: 'ITQA',
    aiAnswer: `Incidents are reviewed in weekly meeting. Details are recored in sharepoint notebook.
Incident details are provided to function heads on monthly basis. These reports are maintained in tool Splunk.
<<refernce of sharepoint and Splunk tool>>`,
    citations: [
      { id: 'PRC-12', source: 'PR Checklist 2025', section: 'Question 12' }
    ]
  },
  {
    id: 'PRQ-13',
    number: 13,
    category: 'Backup & Restore',
    question: 'Review backup and restore logs. Verify that procedures are being followed and backups are being performed and periodically tested.*',
    reviewerType: 'RDQA',
    aiAnswer: `Back up and restore activities are performed as per the defined procedures in BOM. Evidences have been reviewed.

<<attach the references of backup and restore logs>>`,
    citations: [
      { id: 'PRC-13', source: 'PR Checklist 2025', section: 'Question 13' }
    ]
  },
  {
    id: 'PRQ-14',
    number: 14,
    category: 'Archival',
    question: 'Verify that records and data from the system have been archived properly and can be accessed as needed.*',
    reviewerType: 'RDQA',
    aiAnswer: `Archival procedures as defined in BOM are followed.
<<Add reference of document where archival procedures are defined>>`,
    citations: [
      { id: 'PRC-14', source: 'PR Checklist 2025', section: 'Question 14' }
    ]
  },
  {
    id: 'PRQ-15',
    number: 15,
    category: 'Training',
    question: 'Verify that a role based training concept exists and that is up to date',
    reviewerType: 'RDQA',
    aiAnswer: `Role based training exists and they are defined in the document <<specify the document where training details are added>>. Trainings can be done in HR4YOU portal <<update if trainings are performed through other means>>
<<add the reference of document where trainig details are described>>`,
    citations: [
      { id: 'PRC-15', source: 'PR Checklist 2025', section: 'Question 15' }
    ]
  },
  {
    id: 'PRQ-16',
    number: 16,
    category: 'Access Control',
    question: 'Verify that the user access review has been performed and unauthorized users (e.g. left the company, or changed the function), no longer have access to the system.',
    reviewerType: 'RDQA',
    aiAnswer: `User access review has been performed on the date <<add the date reference>>. This is as per the frequency defined in BOM. Based on the review SNOW ticket has been raised to remove the users which no longer need access to the system.
<<add the reference of user access review report>>. Also, access is SSO enabled, in case user leaves the company, access will be disabled.`,
    citations: [
      { id: 'PRC-16', source: 'PR Checklist 2025', section: 'Question 16' }
    ]
  },
  {
    id: 'PRQ-17',
    number: 17,
    category: 'Access Control',
    question: 'Verify that only trained users have access to the system  (business users as well as system admins).',
    reviewerType: 'RDQA',
    aiAnswer: `Access to the system is provided only if the trainings are completed. This check is automated with SNOW access form.`,
    citations: [
      { id: 'PRC-17', source: 'PR Checklist 2025', section: 'Question 17' }
    ]
  },
  {
    id: 'PRQ-18',
    number: 18,
    category: 'Disaster Recovery',
    question: 'Review the system Disaster Recovery Plan. Verify that the DR plan is up to date and reflects current practice. Review testing of the DR plan.*',
    reviewerType: 'RDQA',
    aiAnswer: `DR is performed based on the SLA level defined in HPSM. This frequency is defined in IP SOP <<add the reference of IT SOP for DR>>. Last DR was performed on date <<date reference>>. DR report has been created and approved
<<add reference of DR Plan and DR report as well as reference of BOM>>`,
    citations: [
      { id: 'PRC-18', source: 'PR Checklist 2025', section: 'Question 18' }
    ]
  },
  {
    id: 'PRQ-19',
    number: 19,
    category: 'Business Continuity',
    question: 'Review the System Business Continuity Plan (BCP). Verify that the BCP is up to date and reflects current practice.*',
    reviewerType: 'RDQA',
    aiAnswer: `BCP exists and is up-to date.
<<Reference of document where BCP has been described.>>`,
    citations: [
      { id: 'PRC-19', source: 'PR Checklist 2025', section: 'Question 19' }
    ]
  },
  {
    id: 'PRQ-20',
    number: 20,
    category: 'Defect Management',
    question: 'Review any deferred or open defects (which are not resolved in the current release cycle). Is there a proper justification added for them? Are they reviewed and handled?',
    reviewerType: 'RDQA',
    aiAnswer: `<<number of defects>> have been deferred for the system in the last release. IT has been agreed that these defects will be implemented or resolved in the next change request <<or mention the agreed timeline>>
OR
<<number of defects>> have been deferred for the system in the last release. Risk assessment has been performed for these defects and it has been agreed that defects will be closed and Business has accepted the associated risk. This risk assessment has been added against the system in VVQMS.

<<Add the details of deferred defects>>`,
    citations: [
      { id: 'PRC-20', source: 'PR Checklist 2025', section: 'Question 20' }
    ]
  },
  {
    id: 'PRQ-21',
    number: 21,
    category: 'Deviation Management',
    question: 'Review status of all Computerized system related Deviations & non-conformances and  corresponding actions.',
    reviewerType: 'RDQA',
    aiAnswer: `There were <<number of Deviations>> opened for the system during this PR period. All the deviation has been closed post closure of related change actions.
OR
There were <<number of Deviations>> opened for the system during this PR period. <<number of Deviations>> deviations are open which is in progress and will closed by <<due date>>

<<References of all deviations along with description and required change action>>`,
    citations: [
      { id: 'PRC-21', source: 'PR Checklist 2025', section: 'Question 21' }
    ]
  },
  {
    id: 'PRQ-22',
    number: 22,
    category: 'Qualification Deviations',
    question: 'Review status of all qualification related Deviations & non-conformances and  corresponding actions.',
    reviewerType: 'ITQA',
    aiAnswer: `<<References of all deviations>>`,
    citations: [
      { id: 'PRC-22', source: 'PR Checklist 2025', section: 'Question 22' }
    ]
  }
];
