export const platformMaturityModel = {
  title: 'Platform Engineering Maturity Model',
  description:
    'Score each item 0 (Not Started), 1 (Partial), 2 (Complete). Calculations update in real time.',
  maxPerItem: 2,
  storageKey: 'platform-maturity-scoring-v1',
  sections: [
    {
      key: 'arch',
      title: '1. Architecture & Micro-Frontends',
      items: [
        {
          key: 'appShell',
          label: 'App Shell built with branding and navigation',
          description:
            'A centralized application shell that provides consistent branding, navigation, and layout structure across all micro-frontends. This serves as the foundation for a unified user experience.',
          successCriteria: {
            partial:
              'Basic shell exists with some branding elements, but navigation or layout consistency may be incomplete',
            complete:
              'Fully functional app shell with complete branding, responsive navigation, and consistent layout patterns used across all micro-frontends',
          },
        },
        {
          key: 'routing',
          label: 'Client-side routing with lazy loading',
          description:
            'Implementation of efficient client-side routing that supports lazy loading of micro-frontend modules to optimize performance and reduce initial bundle size.',
          successCriteria: {
            partial:
              'Basic routing implemented but lazy loading may be incomplete or not optimized',
            complete:
              'Full client-side routing with optimized lazy loading, code splitting, and efficient bundle management',
          },
        },
        {
          key: 'stateManagement',
          label: 'Shared state management between micro-frontends',
          description:
            'A robust system for managing shared state across different micro-frontends while maintaining proper isolation and avoiding conflicts.',
          successCriteria: {
            partial:
              'Basic state sharing exists but may have isolation issues or limited functionality',
            complete:
              'Comprehensive state management with proper isolation, event-driven communication, and conflict resolution',
          },
        },
        {
          key: 'designSystem',
          label: 'Design system with reusable components',
          description:
            'A comprehensive design system that provides reusable UI components, design tokens, and guidelines to ensure consistency across all micro-frontends.',
          successCriteria: {
            partial:
              'Some reusable components exist but design system may be incomplete or inconsistently applied',
            complete:
              'Full design system with comprehensive component library, design tokens, documentation, and consistent usage across all applications',
          },
        },
        {
          key: 'crossTeamComm',
          label: 'Cross-team communication protocols',
          description:
            'Established protocols and standards for communication between different teams working on micro-frontends, including API contracts and integration guidelines.',
          successCriteria: {
            partial:
              'Some communication protocols exist but may be informal or inconsistently followed',
            complete:
              'Well-defined, documented communication protocols with clear API contracts, integration standards, and regular cross-team coordination',
          },
        },
      ],
    },
    {
      key: 'devex',
      title: '2. Developer Experience & Tooling',
      items: [
        {
          key: 'localDev',
          label: 'Local development environment setup',
          description:
            'Streamlined setup process for local development environments that allows developers to quickly start working on micro-frontends with minimal configuration.',
          successCriteria: {
            partial:
              'Local development setup exists but may require manual configuration or have some complexity',
            complete:
              'Fully automated local development setup with one-command initialization, hot reloading, and comprehensive development tools',
          },
        },
        {
          key: 'hotReload',
          label: 'Hot reloading and fast refresh',
          description:
            'Implementation of hot reloading and fast refresh capabilities to provide immediate feedback during development and improve developer productivity.',
          successCriteria: {
            partial: 'Basic hot reloading works but may be slow or unreliable in some scenarios',
            complete:
              'Fast, reliable hot reloading with state preservation and comprehensive fast refresh across all micro-frontends',
          },
        },
        {
          key: 'debugging',
          label: 'Debugging tools and error boundaries',
          description:
            'Comprehensive debugging tools and error boundary implementations that help developers identify and resolve issues quickly across micro-frontends.',
          successCriteria: {
            partial:
              'Basic debugging tools available but error handling may be incomplete or inconsistent',
            complete:
              'Advanced debugging tools with comprehensive error boundaries, detailed error reporting, and integration with development tools',
          },
        },
        {
          key: 'testing',
          label: 'Testing framework integration',
          description:
            'Integrated testing frameworks that support unit, integration, and end-to-end testing across micro-frontends with shared testing utilities and best practices.',
          successCriteria: {
            partial:
              'Basic testing setup exists but coverage or integration between micro-frontends may be limited',
            complete:
              'Comprehensive testing framework with high coverage, cross-micro-frontend integration tests, and automated testing pipelines',
          },
        },
        {
          key: 'documentation',
          label: 'Developer documentation and onboarding',
          description:
            'Comprehensive documentation and onboarding materials that help new developers understand the micro-frontend architecture and contribute effectively.',
          successCriteria: {
            partial: 'Some documentation exists but may be incomplete or outdated',
            complete:
              'Comprehensive, up-to-date documentation with interactive examples, onboarding guides, and architectural decision records',
          },
        },
      ],
    },
    {
      key: 'cicd',
      title: '3. CI/CD & Deployment',
      items: [
        {
          key: 'independentDeploy',
          label: 'Independent deployment pipelines',
          description:
            'Separate deployment pipelines for each micro-frontend that allow teams to deploy independently without affecting other applications.',
          successCriteria: {
            partial:
              'Some independent deployment capability exists but may have dependencies or limitations',
            complete:
              'Fully independent deployment pipelines with zero dependencies, automated testing, and rollback capabilities',
          },
        },
        {
          key: 'versionManagement',
          label: 'Version management and compatibility',
          description:
            'Robust version management system that handles compatibility between different versions of micro-frontends and shared dependencies.',
          successCriteria: {
            partial:
              'Basic versioning exists but compatibility management may be manual or incomplete',
            complete:
              'Automated version management with compatibility checking, semantic versioning, and automated dependency updates',
          },
        },
        {
          key: 'rollback',
          label: 'Automated rollback mechanisms',
          description:
            'Automated systems for rolling back deployments when issues are detected, ensuring system stability and quick recovery from problems.',
          successCriteria: {
            partial: 'Manual rollback processes exist but automation may be limited',
            complete:
              'Fully automated rollback mechanisms with health checks, automatic failure detection, and zero-downtime rollbacks',
          },
        },
        {
          key: 'blueGreen',
          label: 'Blue-green or canary deployments',
          description:
            'Advanced deployment strategies like blue-green or canary deployments that minimize risk and allow for safe, gradual rollouts of new versions.',
          successCriteria: {
            partial:
              'Basic deployment strategies implemented but may not cover all scenarios or be fully automated',
            complete:
              'Comprehensive blue-green or canary deployment strategies with automated traffic routing, monitoring, and rollback triggers',
          },
        },
        {
          key: 'envPromotion',
          label: 'Environment promotion workflows',
          description:
            'Structured workflows for promoting code changes through different environments (dev, staging, production) with appropriate gates and validations.',
          successCriteria: {
            partial:
              'Basic environment promotion exists but workflows may be manual or lack comprehensive validation',
            complete:
              'Fully automated environment promotion with comprehensive testing gates, approval workflows, and audit trails',
          },
        },
      ],
    },
    {
      key: 'infra',
      title: '4. Infrastructure & Performance',
      items: [
        {
          key: 'cdn',
          label: 'CDN and edge caching strategies',
          description:
            'Implementation of Content Delivery Network (CDN) and edge caching to optimize performance and reduce latency for micro-frontend assets.',
          successCriteria: {
            partial:
              'Basic CDN setup exists but caching strategies may not be optimized for micro-frontends',
            complete:
              'Comprehensive CDN strategy with optimized caching policies, edge computing capabilities, and performance monitoring',
          },
        },
        {
          key: 'bundleOptimization',
          label: 'Bundle optimization and code splitting',
          description:
            'Advanced bundle optimization techniques including code splitting, tree shaking, and dynamic imports to minimize bundle sizes and improve loading performance.',
          successCriteria: {
            partial:
              'Basic bundle optimization implemented but may not be comprehensive across all micro-frontends',
            complete:
              'Advanced bundle optimization with automated code splitting, tree shaking, and performance budgets across all applications',
          },
        },
        {
          key: 'loadBalancing',
          label: 'Load balancing and auto-scaling',
          description:
            'Infrastructure setup for load balancing and auto-scaling to handle varying traffic loads and ensure high availability of micro-frontend applications.',
          successCriteria: {
            partial: 'Basic load balancing exists but auto-scaling may be manual or limited',
            complete:
              'Comprehensive load balancing with intelligent auto-scaling, health checks, and traffic distribution optimization',
          },
        },
        {
          key: 'monitoring',
          label: 'Performance monitoring and alerting',
          description:
            'Comprehensive monitoring systems that track performance metrics across micro-frontends and provide alerting for performance degradation.',
          successCriteria: {
            partial:
              'Basic monitoring exists but may lack comprehensive coverage or intelligent alerting',
            complete:
              'Advanced performance monitoring with real-time metrics, intelligent alerting, and automated performance optimization',
          },
        },
        {
          key: 'resourceOptimization',
          label: 'Resource optimization and lazy loading',
          description:
            'Optimization of resource loading including lazy loading of components, images, and other assets to improve initial page load times.',
          successCriteria: {
            partial:
              'Some resource optimization implemented but may not be comprehensive or automated',
            complete:
              'Comprehensive resource optimization with intelligent lazy loading, prefetching strategies, and automated performance optimization',
          },
        },
      ],
    },
    {
      key: 'security',
      title: '5. Security & Compliance',
      items: [
        {
          key: 'authentication',
          label: 'Centralized authentication and authorization',
          description:
            'Unified authentication and authorization system that works across all micro-frontends while maintaining security boundaries and user experience.',
          successCriteria: {
            partial:
              'Basic authentication exists but may have inconsistencies or security gaps across micro-frontends',
            complete:
              'Comprehensive centralized authentication with SSO, proper authorization boundaries, and consistent security policies',
          },
        },
        {
          key: 'csp',
          label: 'Content Security Policy implementation',
          description:
            'Implementation of Content Security Policy (CSP) headers and configurations to prevent XSS attacks and other security vulnerabilities.',
          successCriteria: {
            partial:
              'Basic CSP implemented but may not cover all scenarios or be consistently applied',
            complete:
              'Comprehensive CSP implementation with strict policies, regular auditing, and automated compliance checking',
          },
        },
        {
          key: 'secretsManagement',
          label: 'Secrets management and environment variables',
          description:
            'Secure management of secrets, API keys, and environment variables across micro-frontends with proper encryption and access controls.',
          successCriteria: {
            partial:
              'Basic secrets management exists but may have security gaps or manual processes',
            complete:
              'Comprehensive secrets management with encryption, automated rotation, audit trails, and zero-trust access controls',
          },
        },
        {
          key: 'vulnerabilityScanning',
          label: 'Automated vulnerability scanning',
          description:
            'Automated systems for scanning dependencies and code for security vulnerabilities with integration into CI/CD pipelines.',
          successCriteria: {
            partial: 'Some vulnerability scanning exists but may not be comprehensive or automated',
            complete:
              'Comprehensive automated vulnerability scanning with dependency checking, code analysis, and automated remediation workflows',
          },
        },
        {
          key: 'complianceAuditing',
          label: 'Compliance auditing and reporting',
          description:
            'Systems for tracking compliance with security standards and regulations, with automated reporting and audit trail capabilities.',
          successCriteria: {
            partial: 'Basic compliance tracking exists but may be manual or incomplete',
            complete:
              'Comprehensive compliance auditing with automated reporting, continuous monitoring, and regulatory compliance tracking',
          },
        },
      ],
    },
    {
      key: 'cost',
      title: '6. Cost Optimization & Governance',
      items: [
        {
          key: 'resourceMonitoring',
          label: 'Resource usage monitoring and optimization',
          description:
            'Monitoring and optimization of infrastructure resources to ensure cost-effective operation while maintaining performance and reliability.',
          successCriteria: {
            partial: 'Basic resource monitoring exists but optimization may be manual or reactive',
            complete:
              'Comprehensive resource monitoring with automated optimization, cost forecasting, and proactive resource management',
          },
        },
        {
          key: 'costAllocation',
          label: 'Cost allocation and chargeback models',
          description:
            'Systems for tracking and allocating infrastructure costs to different teams or projects, enabling better cost management and accountability.',
          successCriteria: {
            partial: 'Basic cost tracking exists but allocation may be approximate or manual',
            complete:
              'Detailed cost allocation with automated chargeback models, cost center tracking, and comprehensive financial reporting',
          },
        },
        {
          key: 'governancePolicies',
          label: 'Governance policies and standards',
          description:
            'Established governance policies and standards for micro-frontend development, deployment, and operations to ensure consistency and compliance.',
          successCriteria: {
            partial:
              'Some governance policies exist but may not be comprehensive or consistently enforced',
            complete:
              'Comprehensive governance framework with automated policy enforcement, compliance checking, and regular policy reviews',
          },
        },
        {
          key: 'budgetManagement',
          label: 'Budget management and forecasting',
          description:
            'Systems for managing budgets and forecasting costs related to micro-frontend infrastructure and development resources.',
          successCriteria: {
            partial: 'Basic budget tracking exists but forecasting may be limited or manual',
            complete:
              'Advanced budget management with accurate forecasting, automated alerts, and cost optimization recommendations',
          },
        },
        {
          key: 'vendorManagement',
          label: 'Vendor and license management',
          description:
            'Management of third-party vendors, licenses, and dependencies used across micro-frontends to optimize costs and ensure compliance.',
          successCriteria: {
            partial:
              'Basic vendor tracking exists but license management may be manual or incomplete',
            complete:
              'Comprehensive vendor and license management with automated tracking, compliance monitoring, and cost optimization',
          },
        },
      ],
    },
  ],
} as const;
