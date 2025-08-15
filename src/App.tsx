import { useState } from 'react';
import { 
  SettingsProvider, 
  Button, 
  Modal, 
  LoadingSpinner,
  Switch,
  useSettings 
} from '@jonmatum/react-mfe-shell';
import './App.css';

function TestComponents() {
  const { settings, updateSettings } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingTest = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <header className="text-center mb-12">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            React MFE Shell Test App
          </h1>
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            Testing components from @jonmatum/react-mfe-shell
          </p>
          <p className="text-sm text-gray-500">
            Current theme: <span style={{ fontWeight: '600' }}>{settings.theme}</span>
          </p>
        </header>

        <div className="grid">
          {/* Button Tests */}
          <div className="card">
            <h2>Button Components</h2>
            <div className="space-y-4">
              <Button variant="primary" onClick={() => console.log('Primary clicked')}>
                Primary Button
              </Button>
              <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
                Secondary Button
              </Button>
              <Button variant="ghost" onClick={() => console.log('Ghost clicked')}>
                Ghost Button
              </Button>
              <Button 
                variant="primary" 
                disabled
                onClick={() => console.log('Disabled clicked')}
              >
                Disabled Button
              </Button>
            </div>
          </div>

          {/* Modal Test */}
          <div className="card">
            <h2>Modal Component</h2>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Test Modal"
            >
              <div style={{ padding: '1rem' }}>
                <p style={{ marginBottom: '1rem' }}>
                  This is a test modal from the MFE Shell! It supports:
                </p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                  <li>Keyboard navigation (ESC to close)</li>
                  <li>Click outside to close</li>
                  <li>Accessible focus management</li>
                  <li>Dark mode support</li>
                </ul>
                <div className="flex justify-between space-x-2">
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </div>

          {/* Loading Spinner Test */}
          <div className="card">
            <h2>Loading Spinner</h2>
            <div className="space-y-4">
              <Button variant="primary" onClick={handleLoadingTest}>
                Test Loading (2s)
              </Button>
              {isLoading && (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span>Loading...</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm">Small</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="md" />
                  <span className="text-sm">Medium</span>
                </div>
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="lg" />
                  <span className="text-sm">Large</span>
                </div>
              </div>
            </div>
          </div>

          {/* Switch Test */}
          <div className="card">
            <h2>Switch Component</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <Switch
                  checked={settings.theme === 'dark'}
                  onChange={toggleTheme}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Notifications</span>
                <Switch
                  checked={true}
                  onChange={() => console.log('Notifications toggled')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-save</span>
                <Switch
                  checked={false}
                  onChange={() => console.log('Auto-save toggled')}
                />
              </div>
            </div>
          </div>

          {/* Settings Test */}
          <div className="card">
            <h2>Settings Context</h2>
            <div className="space-y-2">
              <div className="text-sm">
                <span style={{ fontWeight: '500' }}>Theme:</span>
                <span style={{ marginLeft: '0.5rem' }}>{settings.theme}</span>
              </div>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => updateSettings({ theme: 'light' })}
                >
                  Light Theme
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => updateSettings({ theme: 'dark' })}
                >
                  Dark Theme
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => updateSettings({ theme: 'system' })}
                >
                  System Theme
                </Button>
              </div>
            </div>
          </div>

          {/* Integration Test */}
          <div className="card">
            <h2>Integration Test</h2>
            <p className="text-sm mb-4">
              All components working together with shared theme and state management.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" />
                <span className="text-sm">Shared styling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={true} onChange={() => {}} />
                <span className="text-sm">Consistent components</span>
              </div>
              <Button variant="primary">
                Unified design system
              </Button>
            </div>
          </div>
        </div>

        <footer className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Built with @jonmatum/react-mfe-shell v3.0.0
          </p>
          <p className="text-gray-500 text-xs" style={{ marginTop: '0.25rem' }}>
            Micro Frontend Shell • Atomic Design • TypeScript
          </p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <TestComponents />
    </SettingsProvider>
  );
}

export default App;
