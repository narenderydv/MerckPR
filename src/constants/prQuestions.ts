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
  aiAnswer: string;
  citations: PRQuestionCitation[];
}

export const PR_QUESTIONS: PRQuestion[] = [
  {
    id: 'PRQ-01',
    number: 1,
    category: 'System Validation',
    question: 'Is the system currently operating in a validated state, and has the validation documentation been reviewed and found current?',
    aiAnswer: 'Yes. The system validation package (IQ/OQ/PQ) was last executed on 2025-03-15 and remains current. All validation protocols were executed successfully with no critical deviations. The Validation Summary Report (VSR) was approved by the Quality Unit on 2025-04-01. The system continues to operate within the validated parameters defined in the User Requirements Specification (URS v3.2). No changes have been made that would invalidate the current validation status.',
    citations: [
      { id: 'CIT-01', source: 'GAMP 5', section: 'Appendix D4 – Periodic Review' },
      { id: 'CIT-02', source: 'EU GMP Annex 11', section: 'Section 11 – Periodic Evaluation' },
      { id: 'CIT-03', source: 'SOP-VAL-001', section: 'System Validation Lifecycle' }
    ]
  },
  {
    id: 'PRQ-02',
    number: 2,
    category: 'System Validation',
    question: 'Have all changes to the system since the last periodic review been assessed for their impact on the validated state and appropriately managed through change control?',
    aiAnswer: 'Yes. A total of 7 change requests (CRs) were raised since the last periodic review. All CRs were assessed for GxP impact per SOP-CC-003. Of these, 4 were classified as minor changes requiring no re-validation, 2 required partial re-qualification (OQ addendum), and 1 was a configuration change that required full regression testing. All change records are closed with appropriate documentation and QA sign-off.',
    citations: [
      { id: 'CIT-04', source: 'ICH Q10', section: 'Section 3.2 – Change Management' },
      { id: 'CIT-05', source: 'SOP-CC-003', section: 'Change Control Procedure' },
      { id: 'CIT-06', source: 'GAMP 5', section: 'Appendix M5 – Impact Assessment' }
    ]
  },
  {
    id: 'PRQ-03',
    number: 3,
    category: 'Access Control',
    question: 'Has the user access matrix been reviewed, and are user roles and permissions appropriate and compliant with SOPs?',
    aiAnswer: 'The user access matrix was reviewed on 2025-11-20. Currently, 148 active users are configured across 12 distinct roles. All access assignments align with the defined role-based access control (RBAC) model in SOP-SEC-002. Two accounts belonging to terminated employees were identified and deactivated during this review. Segregation of duties (SoD) checks confirmed no conflicts exist between production and QA approval roles.',
    citations: [
      { id: 'CIT-07', source: 'FDA 21 CFR Part 11', section: '§11.10(d) – Access Controls' },
      { id: 'CIT-08', source: 'EU GMP Annex 11', section: 'Section 12 – Security' },
      { id: 'CIT-09', source: 'SOP-SEC-002', section: 'User Access Management' }
    ]
  },
  {
    id: 'PRQ-04',
    number: 4,
    category: 'Access Control',
    question: 'Are procedures in place for granting, modifying, and revoking user access, including provisions for emergency access?',
    aiAnswer: 'Yes. SOP-SEC-002 defines the full user lifecycle management process including provisioning, modification, and revocation workflows. All access requests are submitted through the IT Service Management portal and require line manager and system owner approval. Emergency access provisions are documented in SOP-SEC-004 and require retrospective QA review within 24 hours. A quarterly access recertification campaign is conducted with results documented in the Access Review Log.',
    citations: [
      { id: 'CIT-10', source: 'FDA 21 CFR Part 11', section: '§11.10(d) – Limited Access' },
      { id: 'CIT-11', source: 'SOP-SEC-004', section: 'Emergency Access Procedure' }
    ]
  },
  {
    id: 'PRQ-05',
    number: 5,
    category: 'Data Integrity',
    question: 'Are adequate controls in place to ensure data integrity throughout the data lifecycle (ALCOA+ principles)?',
    aiAnswer: 'Yes. The system enforces ALCOA+ principles through multiple technical and procedural controls. Audit trails capture all create, modify, and delete operations with timestamps and user identification. Data entry fields include validation rules preventing out-of-range values. Electronic signatures comply with 21 CFR Part 11 requirements. Backup and recovery procedures ensure data availability. A data integrity risk assessment was performed on 2025-06-10 with no critical gaps identified. All original data remains accessible and unaltered in its original form.',
    citations: [
      { id: 'CIT-12', source: 'WHO Data Integrity Guidance', section: 'Section 5 – ALCOA+' },
      { id: 'CIT-13', source: 'FDA Data Integrity Guidance 2018' },
      { id: 'CIT-14', source: 'MHRA GxP Data Integrity Guide', section: 'March 2018 Edition' }
    ]
  },
  {
    id: 'PRQ-06',
    number: 6,
    category: 'Data Integrity',
    question: 'Is the audit trail functionality active, reviewed periodically, and protected from unauthorized modification?',
    aiAnswer: 'Yes. Audit trail functionality is enabled system-wide and captures all GxP-relevant transactions including data creation, modification, deletion, and user login/logout events. The audit trail is stored in a separate, protected database partition with read-only access for QA reviewers. Audit trail review is performed monthly as per SOP-DI-001. No gaps or anomalies were detected in the last 12 months of audit trail records. The audit trail cannot be disabled by standard users; only system administrators with elevated privileges can modify audit trail configurations, and such actions are themselves logged.',
    citations: [
      { id: 'CIT-15', source: 'FDA 21 CFR Part 11', section: '§11.10(e) – Audit Trail' },
      { id: 'CIT-16', source: 'EU GMP Annex 11', section: 'Section 9 – Audit Trail' },
      { id: 'CIT-17', source: 'SOP-DI-001', section: 'Audit Trail Review Procedure' }
    ]
  },
  {
    id: 'PRQ-07',
    number: 7,
    category: 'Electronic Records & Signatures',
    question: 'Does the system comply with 21 CFR Part 11 requirements for electronic records and electronic signatures?',
    aiAnswer: 'Yes. The system has been assessed against 21 CFR Part 11 requirements and maintains compliance. Electronic records include: unique user identification, date/time stamps, and the meaning of each signature. Electronic signatures are linked to their respective records and include two-component authentication (user ID + password). Signature manifestations display the signer\'s name, date/time, and the purpose of the signature (e.g., authorship, review, approval). A Part 11 compliance assessment was last performed on 2025-09-01 with no open findings.',
    citations: [
      { id: 'CIT-18', source: 'FDA 21 CFR Part 11', section: '§11.50 – Signature Manifestations' },
      { id: 'CIT-19', source: 'FDA 21 CFR Part 11', section: '§11.70 – Signature Linking' },
      { id: 'CIT-20', source: 'SOP-ER-001', section: 'Electronic Records & Signatures' }
    ]
  },
  {
    id: 'PRQ-08',
    number: 8,
    category: 'Change Control',
    question: 'Are all system changes documented, assessed for GxP impact, and approved through the change control process before implementation?',
    aiAnswer: 'Yes. All system changes follow the documented change control process defined in SOP-CC-003. Each change request undergoes a formal impact assessment that evaluates effects on validated state, data integrity, regulatory compliance, and business processes. Changes are classified as Minor, Moderate, or Major based on GxP impact. The Change Advisory Board (CAB) reviews all Moderate and Major changes prior to approval. Post-implementation reviews are conducted within 30 days of deployment. No unauthorized changes were detected during this review period.',
    citations: [
      { id: 'CIT-21', source: 'ICH Q10', section: 'Section 3.2.1 – Change Management System' },
      { id: 'CIT-22', source: 'GAMP 5', section: 'Appendix M5 – Operational Change Control' },
      { id: 'CIT-23', source: 'SOP-CC-003', section: 'Change Control Procedure' }
    ]
  },
  {
    id: 'PRQ-09',
    number: 9,
    category: 'Change Control',
    question: 'Have all deviations and incidents related to the system been investigated, documented, and resolved with appropriate CAPA?',
    aiAnswer: 'Yes. During the review period, 3 deviations and 5 incidents were recorded against this system. All were investigated per SOP-DEV-002 with root cause analysis completed. 2 CAPAs were initiated: CAPA-445 (access control enhancement, status: In Implementation) and CAPA-462 (data backup procedure update, status: Closed). Effectiveness checks for closed CAPAs have been completed satisfactorily. No overdue CAPAs remain. Trend analysis shows a 15% reduction in incident frequency compared to the previous review period.',
    citations: [
      { id: 'CIT-24', source: 'ICH Q10', section: 'Section 3.1 – CAPA System' },
      { id: 'CIT-25', source: 'SOP-DEV-002', section: 'Deviation & Incident Management' }
    ]
  },
  {
    id: 'PRQ-10',
    number: 10,
    category: 'Infrastructure & Environment',
    question: 'Is the IT infrastructure supporting the system (servers, networks, databases) qualified and maintained per current standards?',
    aiAnswer: 'Yes. The system operates on qualified infrastructure managed by the Global IT Infrastructure team. Server qualification was performed per SOP-INF-001. The production environment runs on redundant servers with 99.97% uptime in the last 12 months. Database backups are performed daily with weekly integrity checks. Network security is maintained through firewall rules reviewed quarterly. The infrastructure undergoes annual qualification review as part of the IT infrastructure lifecycle management program. All infrastructure components are within their supported lifecycle.',
    citations: [
      { id: 'CIT-26', source: 'GAMP 5', section: 'Appendix O11 – IT Infrastructure' },
      { id: 'CIT-27', source: 'SOP-INF-001', section: 'Infrastructure Qualification' }
    ]
  },
  {
    id: 'PRQ-11',
    number: 11,
    category: 'Infrastructure & Environment',
    question: 'Are disaster recovery (DR) and business continuity plans (BCP) in place, tested, and current for the system?',
    aiAnswer: 'Yes. A Disaster Recovery Plan (DRP) and Business Continuity Plan (BCP) are documented and approved for this system. The Recovery Time Objective (RTO) is 4 hours and Recovery Point Objective (RPO) is 1 hour. The DR plan was last tested on 2025-08-15 with successful recovery within 2.5 hours. BCP tabletop exercises are conducted biannually. The last exercise was performed on 2025-10-20 with all stakeholders participating. Two improvement actions were identified and have been implemented.',
    citations: [
      { id: 'CIT-28', source: 'EU GMP Annex 11', section: 'Section 7.1 – Data Storage & Backup' },
      { id: 'CIT-29', source: 'SOP-DR-001', section: 'Disaster Recovery Procedure' }
    ]
  },
  {
    id: 'PRQ-12',
    number: 12,
    category: 'Security',
    question: 'Have cybersecurity risk assessments been conducted, and are appropriate security controls in place?',
    aiAnswer: 'Yes. A cybersecurity risk assessment was conducted on 2025-07-01 following the NIST Cybersecurity Framework. The assessment identified 2 medium-risk findings, both of which have been remediated. Security controls include: encrypted data transmission (TLS 1.3), encrypted data at rest (AES-256), intrusion detection system (IDS) monitoring, regular vulnerability scanning (monthly), and annual penetration testing. The last penetration test (2025-09-15) revealed no critical or high-severity vulnerabilities. Security patches are applied per the established patch management schedule.',
    citations: [
      { id: 'CIT-30', source: 'NIST Cybersecurity Framework v1.1' },
      { id: 'CIT-31', source: 'EU GMP Annex 11', section: 'Section 12 – Security' },
      { id: 'CIT-32', source: 'SOP-SEC-005', section: 'Cybersecurity Risk Assessment' }
    ]
  },
  {
    id: 'PRQ-13',
    number: 13,
    category: 'Training',
    question: 'Are all users appropriately trained on the system, and is the training documentation current?',
    aiAnswer: 'Yes. All 148 active users have completed the required training curriculum for their assigned roles. Training records are maintained in the Learning Management System (LMS) and are current. The training curriculum includes: initial system training, GxP awareness, data integrity principles, and role-specific functional training. A training needs assessment was conducted on 2025-05-01 and the curriculum was updated to include new features deployed in the latest release. 100% training compliance was achieved within the target timeline.',
    citations: [
      { id: 'CIT-33', source: 'EU GMP Annex 11', section: 'Section 2 – Personnel' },
      { id: 'CIT-34', source: 'SOP-TRN-001', section: 'Training Management' }
    ]
  },
  {
    id: 'PRQ-14',
    number: 14,
    category: 'Documentation',
    question: 'Are all SOPs, work instructions, and supporting documentation for the system current and approved?',
    aiAnswer: 'Yes. A total of 12 SOPs and 8 work instructions are associated with this system. All documents have been reviewed within their defined review cycle (maximum 2 years). The last document review campaign was completed on 2025-10-15. Two SOPs (SOP-OPS-004 and SOP-DI-001) were revised to reflect process improvements. All documents are version-controlled in the Document Management System (DMS) with electronic approval workflows. No expired or draft documents are currently in use for GxP operations.',
    citations: [
      { id: 'CIT-35', source: 'ICH Q10', section: 'Section 3.1 – Documentation System' },
      { id: 'CIT-36', source: 'SOP-DOC-001', section: 'Document Control Procedure' }
    ]
  },
  {
    id: 'PRQ-15',
    number: 15,
    category: 'Vendor Management',
    question: 'Has the system vendor/supplier been assessed, and are service level agreements (SLAs) in place and being met?',
    aiAnswer: 'Yes. The vendor (LabWare Inc.) was last assessed through an on-site audit on 2025-04-20 with a satisfactory outcome. The vendor is listed on the Approved Supplier List (ASL) with a quality rating of "A" (Preferred). A Service Level Agreement (SLA) is in place covering: system availability (99.9% target, 99.97% actual), incident response times (P1: 1hr, P2: 4hr, P3: 8hr), and support coverage (24x7 for critical issues). All SLA metrics have been met during the review period. The vendor maintains ISO 27001 and SOC 2 Type II certifications.',
    citations: [
      { id: 'CIT-37', source: 'EU GMP Chapter 7', section: 'Outsourced Activities' },
      { id: 'CIT-38', source: 'SOP-VM-001', section: 'Vendor Management & Qualification' }
    ]
  },
  {
    id: 'PRQ-16',
    number: 16,
    category: 'Backup & Archival',
    question: 'Are data backup and archival procedures adequate, tested, and compliant with data retention requirements?',
    aiAnswer: 'Yes. Data backup procedures follow a 3-2-1 strategy: 3 copies of data, on 2 different media types, with 1 offsite copy. Daily incremental backups and weekly full backups are performed automatically. Backup integrity is verified through weekly restoration tests on a dedicated test environment. The last successful restoration test was on 2025-12-01. Data retention periods are defined per the corporate retention schedule and comply with regulatory requirements (minimum 7 years for GxP data). Archived data remains accessible and readable in its original format.',
    citations: [
      { id: 'CIT-39', source: 'EU GMP Annex 11', section: 'Section 7.1 – Data Storage' },
      { id: 'CIT-40', source: 'FDA 21 CFR Part 11', section: '§11.10(c) – Record Protection' },
      { id: 'CIT-41', source: 'SOP-BAK-001', section: 'Backup & Recovery Procedure' }
    ]
  },
  {
    id: 'PRQ-17',
    number: 17,
    category: 'Performance & Reliability',
    question: 'Is the system performing within acceptable parameters, and have any performance issues been identified and addressed?',
    aiAnswer: 'Yes. System performance is monitored continuously through APM (Application Performance Monitoring) tools. Key metrics for the review period: average response time 1.2s (target: <3s), system availability 99.97% (target: 99.9%), peak concurrent users handled: 85 (capacity: 200). Two performance incidents were recorded — one related to database query optimization (resolved in 48 hours) and one related to peak-hour login slowness (resolved through load balancer reconfiguration). Capacity planning review indicates the system can support projected growth for the next 18 months.',
    citations: [
      { id: 'CIT-42', source: 'GAMP 5', section: 'Appendix D4 – Operational Monitoring' },
      { id: 'CIT-43', source: 'SOP-OPS-003', section: 'System Monitoring & Performance' }
    ]
  },
  {
    id: 'PRQ-18',
    number: 18,
    category: 'Regulatory Compliance',
    question: 'Have there been any regulatory changes or new guidance that affect the system, and have these been assessed and addressed?',
    aiAnswer: 'Yes. A regulatory intelligence review was conducted on 2025-09-01. Two relevant regulatory updates were identified: (1) Updated EU GMP Annex 11 guidance on cloud computing — assessed with no impact to current operations as the system is hosted on-premise, and (2) FDA draft guidance on AI/ML in pharmaceutical manufacturing — assessed as informational with no immediate action required. Both assessments are documented in the Regulatory Impact Assessment Log. No compliance gaps were identified.',
    citations: [
      { id: 'CIT-44', source: 'EU GMP Annex 11 (Revised 2025)' },
      { id: 'CIT-45', source: 'ICH Q10', section: 'Section 4 – Continual Improvement' }
    ]
  },
  {
    id: 'PRQ-19',
    number: 19,
    category: 'Regulatory Compliance',
    question: 'Are all interfaces and data exchanges with other GxP systems validated and operating correctly?',
    aiAnswer: 'The system has 4 validated interfaces: (1) ERP Integration (SAP) — bi-directional data exchange validated per IQ/OQ-INT-001, (2) Document Management System — automated document retrieval, (3) LIMS reporting interface — validated data export, (4) Email notification service — system alerts. All interfaces were tested during the last integration qualification (2025-06-15). Interface monitoring shows 99.99% message delivery rate. No data integrity issues were detected in interface transactions during the review period. Interface specifications are documented and version-controlled.',
    citations: [
      { id: 'CIT-46', source: 'GAMP 5', section: 'Appendix D7 – Interfaces' },
      { id: 'CIT-47', source: 'SOP-INT-001', section: 'System Interface Management' }
    ]
  },
  {
    id: 'PRQ-20',
    number: 20,
    category: 'Risk Management',
    question: 'Has a risk assessment been performed for the system, and are residual risks acceptable and monitored?',
    aiAnswer: 'Yes. A comprehensive risk assessment was performed using FMEA methodology on 2025-05-20, in accordance with ICH Q9 principles. 28 risk scenarios were evaluated across categories of data integrity, system availability, access control, and compliance. All risks were scored using Severity × Probability × Detectability methodology. No unacceptable residual risks remain. 3 risks are classified as medium and are actively monitored through defined Key Risk Indicators (KRIs). The risk register is reviewed quarterly by the system owner and QA representative.',
    citations: [
      { id: 'CIT-48', source: 'ICH Q9', section: 'Quality Risk Management' },
      { id: 'CIT-49', source: 'GAMP 5', section: 'Appendix M3 – Risk Assessment' },
      { id: 'CIT-50', source: 'SOP-RM-001', section: 'Risk Management Procedure' }
    ]
  },
  {
    id: 'PRQ-21',
    number: 21,
    category: 'Software Lifecycle',
    question: 'Is the system software (including OS, middleware, and application) current, supported by the vendor, and within its defined lifecycle?',
    aiAnswer: 'Yes. All software components are within their supported lifecycle. Application version: v12.4.1 (current supported release). Operating System: Windows Server 2022 (mainstream support until 2026-10). Database: Oracle 19c (premier support until 2027-04). Middleware: Apache Tomcat 10.1 (actively maintained). A software lifecycle review confirmed no end-of-life (EOL) components are in use. An upgrade roadmap is documented for the planned application migration to v13.0 in Q3 2026, with a validated upgrade approach defined.',
    citations: [
      { id: 'CIT-51', source: 'GAMP 5', section: 'Appendix O9 – Software Maintenance' },
      { id: 'CIT-52', source: 'SOP-SW-001', section: 'Software Lifecycle Management' }
    ]
  },
  {
    id: 'PRQ-22',
    number: 22,
    category: 'Overall Assessment',
    question: 'Based on the overall assessment, is the system fit for its intended use, and what is the recommended action for continued operation?',
    aiAnswer: 'Based on the comprehensive periodic review conducted across all assessment domains — validation status, data integrity, access controls, change management, infrastructure, security, compliance, and risk management — the system is deemed FIT FOR INTENDED USE. The system continues to operate within its validated state with no critical findings or unacceptable risks identified. Recommendation: CONTINUE OPERATION with the following improvement actions: (1) Complete CAPA-445 implementation by 2026-06-01, (2) Execute planned upgrade to v13.0 in Q3 2026, (3) Continue quarterly KRI monitoring. The next periodic review is scheduled for Q1 2027.',
    citations: [
      { id: 'CIT-53', source: 'GAMP 5', section: 'Appendix D4 – Periodic Review Conclusion' },
      { id: 'CIT-54', source: 'EU GMP Annex 11', section: 'Section 11 – Periodic Evaluation' },
      { id: 'CIT-55', source: 'ICH Q10', section: 'Section 4 – Continual Improvement' }
    ]
  }
];
