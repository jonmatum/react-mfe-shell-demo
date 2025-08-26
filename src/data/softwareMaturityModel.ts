export const softwareMaturityModel = {
  title: 'Software Development Maturity Model',
  description:
    'Assess your software development practices across key areas. Score each item 0 (Not Started), 1 (Partial), 2 (Complete).',
  maxPerItem: 2,
  storageKey: 'software-maturity-scoring-v1',
  sections: [
    {
      key: 'codeQuality',
      title: '1. Code Quality & Standards',
      items: [
        {
          key: 'codingStandards',
          label: 'Coding standards and style guides established',
          description:
            'Comprehensive coding standards and style guides that ensure consistent code quality and maintainability across the development team.',
          successCriteria: {
            partial:
              'Basic coding standards exist but may not be comprehensive or consistently enforced',
            complete:
              'Comprehensive coding standards with automated enforcement, style guides, and team-wide adoption',
          },
        },
        {
          key: 'codeReviews',
          label: 'Mandatory code reviews for all changes',
          description:
            'Systematic code review process that ensures all code changes are reviewed by peers before being merged into the main branch.',
          successCriteria: {
            partial:
              'Code reviews happen for most changes but process may not be consistent or comprehensive',
            complete:
              'Mandatory code reviews for all changes with clear review criteria, automated checks, and documented approval process',
          },
        },
        {
          key: 'staticAnalysis',
          label: 'Static code analysis tools integrated',
          description:
            'Integration of static code analysis tools that automatically detect code quality issues, security vulnerabilities, and maintainability problems.',
          successCriteria: {
            partial:
              'Some static analysis tools are used but integration may be incomplete or not comprehensive',
            complete:
              'Comprehensive static analysis with multiple tools, automated reporting, and integration into CI/CD pipeline',
          },
        },
        {
          key: 'linting',
          label: 'Automated linting and formatting',
          description:
            'Automated tools for code linting and formatting that ensure consistent code style and catch common errors during development.',
          successCriteria: {
            partial:
              'Basic linting tools are configured but may not cover all code or be consistently applied',
            complete:
              'Comprehensive automated linting and formatting with pre-commit hooks, IDE integration, and CI/CD enforcement',
          },
        },
        {
          key: 'documentation',
          label: 'Code documentation standards enforced',
          description:
            'Standards and practices for code documentation including inline comments, API documentation, and architectural decision records.',
          successCriteria: {
            partial: 'Some documentation standards exist but enforcement may be inconsistent',
            complete:
              'Comprehensive documentation standards with automated checks, templates, and regular documentation reviews',
          },
        },
      ],
    },
    {
      key: 'testing',
      title: '2. Testing & Quality Assurance',
      items: [
        {
          key: 'unitTesting',
          label: 'Comprehensive unit test coverage',
          description:
            'Systematic unit testing approach that ensures high code coverage and reliable test suites for all critical functionality.',
          successCriteria: {
            partial: 'Unit tests exist for some components but coverage may be incomplete',
            complete:
              'Comprehensive unit test coverage (>80%) with automated reporting and quality gates',
          },
        },
        {
          key: 'integrationTesting',
          label: 'Integration and API testing',
          description:
            'Testing strategy that covers integration points between different components and external APIs to ensure system reliability.',
          successCriteria: {
            partial:
              'Some integration tests exist but coverage of critical paths may be incomplete',
            complete:
              'Comprehensive integration testing covering all critical paths, API contracts, and system interactions',
          },
        },
        {
          key: 'e2eTesting',
          label: 'End-to-end testing automation',
          description:
            'Automated end-to-end testing that validates complete user workflows and system functionality from a user perspective.',
          successCriteria: {
            partial: 'Basic E2E tests exist but may not cover all critical user journeys',
            complete:
              'Comprehensive E2E test suite covering all critical user journeys with reliable automation and reporting',
          },
        },
        {
          key: 'performanceTesting',
          label: 'Performance and load testing',
          description:
            'Regular performance and load testing to ensure the application meets performance requirements under various load conditions.',
          successCriteria: {
            partial: 'Some performance testing is done but may not be comprehensive or regular',
            complete:
              'Comprehensive performance testing with automated load tests, performance budgets, and continuous monitoring',
          },
        },
        {
          key: 'testAutomation',
          label: 'Test automation in CI/CD pipeline',
          description:
            'Integration of automated testing into the CI/CD pipeline to ensure quality gates and prevent regressions.',
          successCriteria: {
            partial: 'Some test automation exists in CI/CD but coverage may be incomplete',
            complete:
              'Comprehensive test automation with quality gates, parallel execution, and detailed reporting in CI/CD',
          },
        },
      ],
    },
    {
      key: 'cicd',
      title: '3. CI/CD & DevOps',
      items: [
        {
          key: 'continuousIntegration',
          label: 'Continuous integration setup',
          description:
            'Automated continuous integration system that builds, tests, and validates code changes on every commit.',
          successCriteria: {
            partial:
              'Basic CI setup exists but may not include all necessary checks or be fully automated',
            complete:
              'Comprehensive CI with automated builds, tests, security scans, and quality gates on every commit',
          },
        },
        {
          key: 'continuousDeployment',
          label: 'Automated deployment pipelines',
          description:
            'Automated deployment pipelines that enable reliable and consistent deployments across different environments.',
          successCriteria: {
            partial:
              'Some deployment automation exists but may require manual intervention or lack comprehensive testing',
            complete:
              'Fully automated deployment pipelines with comprehensive testing, rollback capabilities, and zero-downtime deployments',
          },
        },
        {
          key: 'environmentManagement',
          label: 'Environment management and promotion',
          description:
            'Systematic management of different environments (dev, staging, production) with proper promotion workflows.',
          successCriteria: {
            partial:
              'Multiple environments exist but promotion process may be manual or inconsistent',
            complete:
              'Comprehensive environment management with automated promotion, environment parity, and proper access controls',
          },
        },
        {
          key: 'infrastructureAsCode',
          label: 'Infrastructure as Code implementation',
          description:
            'Infrastructure management using code-based approaches that enable version control, reproducibility, and automation.',
          successCriteria: {
            partial: 'Some infrastructure is managed as code but coverage may be incomplete',
            complete:
              'Comprehensive Infrastructure as Code with version control, automated provisioning, and environment consistency',
          },
        },
        {
          key: 'monitoringAlerting',
          label: 'Monitoring and alerting systems',
          description:
            'Comprehensive monitoring and alerting systems that provide visibility into application performance and system health.',
          successCriteria: {
            partial: 'Basic monitoring exists but alerting may be incomplete or not comprehensive',
            complete:
              'Comprehensive monitoring with intelligent alerting, dashboards, and proactive issue detection',
          },
        },
      ],
    },
    {
      key: 'security',
      title: '4. Security & Compliance',
      items: [
        {
          key: 'securityScanning',
          label: 'Automated security vulnerability scanning',
          description:
            'Automated tools and processes for identifying security vulnerabilities in code, dependencies, and infrastructure.',
          successCriteria: {
            partial: 'Some security scanning exists but may not be comprehensive or automated',
            complete:
              'Comprehensive automated security scanning with dependency checks, SAST/DAST tools, and remediation workflows',
          },
        },
        {
          key: 'accessControl',
          label: 'Access control and authentication',
          description:
            'Robust access control systems that ensure proper authentication, authorization, and principle of least privilege.',
          successCriteria: {
            partial:
              'Basic access controls exist but may not follow security best practices consistently',
            complete:
              'Comprehensive access control with multi-factor authentication, role-based access, and regular access reviews',
          },
        },
        {
          key: 'dataProtection',
          label: 'Data protection and encryption',
          description:
            'Implementation of data protection measures including encryption at rest and in transit, and proper data handling procedures.',
          successCriteria: {
            partial:
              'Some data protection measures exist but may not be comprehensive or consistently applied',
            complete:
              'Comprehensive data protection with encryption, data classification, and compliance with privacy regulations',
          },
        },
        {
          key: 'incidentResponse',
          label: 'Security incident response plan',
          description:
            'Documented and tested procedures for responding to security incidents, including detection, containment, and recovery.',
          successCriteria: {
            partial:
              'Basic incident response procedures exist but may not be comprehensive or regularly tested',
            complete:
              'Comprehensive incident response plan with regular testing, clear procedures, and post-incident reviews',
          },
        },
        {
          key: 'complianceAuditing',
          label: 'Compliance monitoring and auditing',
          description:
            'Systems and processes for monitoring compliance with security standards and regulations, with regular auditing.',
          successCriteria: {
            partial: 'Some compliance monitoring exists but may not be comprehensive or automated',
            complete:
              'Comprehensive compliance monitoring with automated auditing, regular assessments, and remediation tracking',
          },
        },
      ],
    },
    {
      key: 'agile',
      title: '5. Agile & Project Management',
      items: [
        {
          key: 'agileMethodology',
          label: 'Agile development methodology adoption',
          description:
            'Implementation of agile development practices including iterative development, regular retrospectives, and adaptive planning.',
          successCriteria: {
            partial:
              'Some agile practices are followed but implementation may be inconsistent or incomplete',
            complete:
              'Comprehensive agile methodology with regular sprints, retrospectives, and continuous improvement practices',
          },
        },
        {
          key: 'projectTracking',
          label: 'Project tracking and visibility',
          description:
            'Systems and processes for tracking project progress, managing backlogs, and providing visibility to stakeholders.',
          successCriteria: {
            partial: 'Basic project tracking exists but visibility or accuracy may be limited',
            complete:
              'Comprehensive project tracking with real-time visibility, automated reporting, and stakeholder dashboards',
          },
        },
        {
          key: 'requirementsManagement',
          label: 'Requirements management and traceability',
          description:
            'Systematic approach to managing requirements including documentation, traceability, and change management.',
          successCriteria: {
            partial:
              'Basic requirements management exists but traceability or change management may be incomplete',
            complete:
              'Comprehensive requirements management with full traceability, change control, and stakeholder approval processes',
          },
        },
        {
          key: 'stakeholderCommunication',
          label: 'Stakeholder communication and feedback',
          description:
            'Regular communication channels and feedback mechanisms with stakeholders to ensure alignment and continuous improvement.',
          successCriteria: {
            partial:
              'Some stakeholder communication exists but may not be regular or comprehensive',
            complete:
              'Comprehensive stakeholder communication with regular updates, feedback sessions, and collaborative planning',
          },
        },
        {
          key: 'riskManagement',
          label: 'Risk identification and management',
          description:
            'Proactive identification and management of project risks with mitigation strategies and contingency planning.',
          successCriteria: {
            partial:
              'Some risk management practices exist but may not be systematic or comprehensive',
            complete:
              'Comprehensive risk management with regular assessments, mitigation strategies, and contingency planning',
          },
        },
      ],
    },
  ],
} as const;
