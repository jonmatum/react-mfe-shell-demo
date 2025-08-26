import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import {
  SettingsProvider,
  Text,
  Heading,
  Avatar,
  Divider,
  FeatureChip,
  useSettings,
} from '@jonmatum/react-mfe-shell';
import { MaturityScoring } from './components/MaturityScoring';
import { ModelSelector } from './components/ModelSelector';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { SEO } from './components/SEO';
import { platformMaturityModel } from './data/platformMaturityModel';
import { softwareMaturityModel } from './data/softwareMaturityModel';
import { getReactMfeShellVersion, getCurrentYear } from './utils/packageInfo';

// Available maturity models
const availableModels = [
  { key: 'platform', model: platformMaturityModel },
  { key: 'software', model: softwareMaturityModel },
];

// Theme toggle icons
const SunIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (checked: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => (
  <button
    onClick={() => onToggle(!isDark)}
    className="p-2 rounded-lg hover:bg-surface-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
  >
    {isDark ? (
      <SunIcon className="w-5 h-5 text-text-secondary hover:text-text-primary transition-colors" />
    ) : (
      <MoonIcon className="w-5 h-5 text-text-secondary hover:text-text-primary transition-colors" />
    )}
  </button>
);

function AppContent() {
  const { settings, updateSettings } = useSettings();
  const [selectedModelKey, setSelectedModelKey] = useState('platform');

  const selectedModel =
    availableModels.find((m) => m.key === selectedModelKey)?.model || platformMaturityModel;
  const mfeShellVersion = getReactMfeShellVersion();
  const currentYear = getCurrentYear();

  return (
    <div className="min-h-screen bg-background-primary">
      {/* SEO Configuration */}
      <SEO 
        title={`${selectedModel.title} - Maturity Assessment Platform`}
        description={`${selectedModel.description} Evaluate your organization's practices with our comprehensive assessment tool featuring interactive scoring and real-time analytics.`}
        keywords={[
          'maturity assessment',
          'organizational maturity',
          selectedModelKey === 'platform' ? 'platform engineering' : 'software development',
          selectedModelKey === 'platform' ? 'micro frontend' : 'code quality',
          selectedModelKey === 'platform' ? 'architecture' : 'testing practices',
          'react',
          'assessment tool',
          'evaluation platform',
          'development practices',
          'engineering maturity'
        ]}
      />
      
      {/* Enhanced Header with Theme Toggle */}
      <header className="bg-surface-primary border-b border-border-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Avatar
                src="https://github.com/jonmatum.png"
                alt="React MFE Shell"
                size="md"
                fallback="MFE"
              />
              <div>
                <Heading level={1} size="lg" className="text-text-primary">
                  Maturity Assessment Platform
                </Heading>
                <Text className="text-text-secondary text-sm">Powered by React MFE Shell</Text>
              </div>
            </div>

            <div className="flex-shrink-0">
              <ThemeToggle
                isDark={settings.theme === 'dark'}
                onToggle={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* App Description */}
        <div className="text-center mb-8">
          <Heading
            level={1}
            variant="display"
            size={{ xs: '3xl', md: '4xl', lg: '5xl' }}
            weight="bold"
            align="center"
            className="mb-6"
          >
            <Text
              as="span"
              variant="display"
              size={{ xs: '3xl', md: '4xl', lg: '5xl' }}
              weight="bold"
            >
              Organizational
            </Text>{' '}
            <Text
              as="span"
              variant="display"
              size={{ xs: '3xl', md: '4xl', lg: '5xl' }}
              weight="bold"
              color="text-primary-600"
            >
              Maturity Assessment
            </Text>
          </Heading>

          <Text
            variant="lead"
            size={{ xs: 'lg', md: 'xl' }}
            align="center"
            color="secondary"
            className="max-w-4xl mx-auto"
          >
            Evaluate your organization's practices across different domains using{' '}
            <Text as="span" variant="lead" weight="semibold" color="primary">
              comprehensive maturity frameworks
            </Text>
            . Track progress, identify{' '}
            <Text as="span" variant="lead" weight="semibold">
              improvement areas
            </Text>
            , and benchmark against{' '}
            <Text as="span" variant="lead" weight="semibold" color="success">
              industry standards
            </Text>
            .
          </Text>

          <div className="flex justify-center gap-2 mt-6">
            <FeatureChip variant="success" size="sm">
              Real-time Scoring
            </FeatureChip>
            <FeatureChip variant="primary" size="sm">
              Data Export
            </FeatureChip>
            <FeatureChip variant="warning" size="sm">
              Multiple Models
            </FeatureChip>
          </div>
        </div>

        <Divider className="mb-8" />

        <ModelSelector
          models={availableModels}
          selectedModelKey={selectedModelKey}
          onModelChange={setSelectedModelKey}
        />

        <MaturityScoring model={selectedModel} />

        {/* Simplified Footer */}
        <footer className="mt-16 pt-8 border-t border-border-primary">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Text className="text-text-secondary text-sm">Built with</Text>
              <a
                href="https://www.npmjs.com/package/@jonmatum/react-mfe-shell"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-105 transition-transform duration-200"
              >
                <FeatureChip variant="primary" size="sm">
                  React MFE Shell v{mfeShellVersion}
                </FeatureChip>
              </a>
            </div>
            <Text className="text-text-tertiary text-xs">
              © {currentYear} Maturity Assessment Platform
            </Text>
          </div>
        </footer>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
