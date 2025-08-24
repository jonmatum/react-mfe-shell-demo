import { useState } from 'react';
import { 
  SettingsProvider, 
  Button, 
  Modal, 
  LoadingSpinner,
  Switch,
  Input,
  Badge,
  Avatar,
  Card,
  Text,
  Label,
  Divider,
  useSettings
} from '@jonmatum/react-mfe-shell';

// Demo Header Component
function DemoHeader() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <header className="bg-surface-primary border-b border-border-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar 
              src="https://github.com/jonmatum.png" 
              alt="Jonatan Mata" 
              size="md" 
            />
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                React MFE Shell Demo
              </h1>
              <Text variant="caption" className="text-text-secondary">
                Comprehensive Component Showcase v6.1.0
              </Text>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="success" size="sm">
              Latest Version
            </Badge>
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme-switch" className="text-sm">
                {settings.theme === 'dark' ? '🌙' : '☀️'} Theme
              </Label>
              <Switch
                id="theme-switch"
                checked={settings.theme === 'dark'}
                onChange={() => updateSettings({ 
                  theme: settings.theme === 'dark' ? 'light' : 'dark' 
                })}
                size="sm"
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Button Showcase Component
function ButtonShowcase() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  
  const handleAsyncAction = (buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Button Components
      </h2>
      
      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="xs">Extra Small</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">Extra Large</Button>
          </div>
        </div>

        {/* States */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              loading={loadingStates.async1}
              onClick={() => handleAsyncAction('async1')}
            >
              {loadingStates.async1 ? 'Processing...' : 'Async Action'}
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button 
              variant="success" 
              loading={loadingStates.async2}
              onClick={() => handleAsyncAction('async2')}
            >
              {loadingStates.async2 ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Input Showcase Component
function InputShowcase() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    search: '',
    disabled: 'Cannot edit this'
  });

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Input Components
      </h2>
      
      <div className="space-y-6 max-w-md">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          error={formData.password.length > 0 && formData.password.length < 8 ? 'Password must be at least 8 characters' : undefined}
        />
        
        <Input
          label="Search"
          type="search"
          placeholder="Search components..."
          value={formData.search}
          onChange={(e) => setFormData(prev => ({ ...prev, search: e.target.value }))}
        />
        
        <Input
          label="Disabled Input"
          value={formData.disabled}
          disabled
        />
      </div>
    </Card>
  );
}

// Badge Showcase Component
function BadgeShowcase() {
  const [removedBadges, setRemovedBadges] = useState<Set<string>>(new Set());
  
  const handleRemoveBadge = (badgeId: string) => {
    setRemovedBadges(prev => new Set([...prev, badgeId]));
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Badge Components
      </h2>
      
      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Sizes</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="md">Medium</Badge>
            <Badge variant="primary" size="lg">Large</Badge>
          </div>
        </div>

        {/* Removable Badges */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Removable Badges</h3>
          <div className="flex flex-wrap gap-3">
            {!removedBadges.has('tag1') && (
              <Badge 
                variant="primary" 
                removable 
                onRemove={() => handleRemoveBadge('tag1')}
              >
                React
              </Badge>
            )}
            {!removedBadges.has('tag2') && (
              <Badge 
                variant="success" 
                removable 
                onRemove={() => handleRemoveBadge('tag2')}
              >
                TypeScript
              </Badge>
            )}
            {!removedBadges.has('tag3') && (
              <Badge 
                variant="warning" 
                removable 
                onRemove={() => handleRemoveBadge('tag3')}
              >
                Tailwind
              </Badge>
            )}
          </div>
          {removedBadges.size > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setRemovedBadges(new Set())}
              className="mt-2"
            >
              Reset Badges
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Avatar Showcase Component
function AvatarShowcase() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Avatar Components
      </h2>
      
      <div className="space-y-8">
        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Sizes</h3>
          <div className="flex items-center gap-4">
            <Avatar size="xs" src="https://github.com/jonmatum.png" alt="Jonatan Mata" />
            <Avatar size="sm" src="https://github.com/jonmatum.png" alt="Jonatan Mata" />
            <Avatar size="md" src="https://github.com/jonmatum.png" alt="Jonatan Mata" />
            <Avatar size="lg" src="https://github.com/jonmatum.png" alt="Jonatan Mata" />
            <Avatar size="xl" src="https://github.com/jonmatum.png" alt="Jonatan Mata" />
          </div>
        </div>

        {/* Fallbacks */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Fallback Initials</h3>
          <div className="flex items-center gap-4">
            <Avatar size="md" alt="Jonatan Mata" />
            <Avatar size="md" alt="Full-Stack Engineer" />
            <Avatar size="md" alt="React Developer" />
            <Avatar size="md" alt="MFE Architect" />
          </div>
        </div>
      </div>
    </Card>
  );
}

// Loading Spinner Showcase Component
function LoadingSpinnerShowcase() {
  const [isLoading, setIsLoading] = useState(false);
  
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Loading Spinner Components
      </h2>
      
      <div className="space-y-8">
        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Sizes</h3>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <LoadingSpinner size="xs" />
              <Text variant="caption" className="mt-2 block">Extra Small</Text>
            </div>
            <div className="text-center">
              <LoadingSpinner size="sm" />
              <Text variant="caption" className="mt-2 block">Small</Text>
            </div>
            <div className="text-center">
              <LoadingSpinner size="md" />
              <Text variant="caption" className="mt-2 block">Medium</Text>
            </div>
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <Text variant="caption" className="mt-2 block">Large</Text>
            </div>
            <div className="text-center">
              <LoadingSpinner size="xl" />
              <Text variant="caption" className="mt-2 block">Extra Large</Text>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Colors</h3>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <LoadingSpinner color="primary" />
              <Text variant="caption" className="mt-2 block">Primary</Text>
            </div>
            <div className="text-center">
              <LoadingSpinner color="success" />
              <Text variant="caption" className="mt-2 block">Success</Text>
            </div>
            <div className="text-center">
              <LoadingSpinner color="warning" />
              <Text variant="caption" className="mt-2 block">Warning</Text>
            </div>
            <div className="text-center">
              <LoadingSpinner color="danger" />
              <Text variant="caption" className="mt-2 block">Danger</Text>
            </div>
          </div>
        </div>

        {/* With Text */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">With Text</h3>
          <div className="space-y-4">
            <Button variant="primary" onClick={simulateLoading} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Start Loading Demo'}
            </Button>
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <LoadingSpinner size="lg" text="Processing your request..." />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Switch Showcase Component
function SwitchShowcase() {
  const [switches, setSwitches] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false
  });

  const updateSwitch = (key: keyof typeof switches) => {
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Switch Components
      </h2>
      
      <div className="space-y-8">
        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Sizes</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch size="sm" checked={true} onChange={() => {}} />
              <Text variant="caption">Small</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Switch size="md" checked={true} onChange={() => {}} />
              <Text variant="caption">Medium</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Switch size="lg" checked={true} onChange={() => {}} />
              <Text variant="caption">Large</Text>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Colors</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch color="primary" checked={true} onChange={() => {}} />
              <Text variant="caption">Primary</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Switch color="success" checked={true} onChange={() => {}} />
              <Text variant="caption">Success</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Switch color="warning" checked={true} onChange={() => {}} />
              <Text variant="caption">Warning</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Switch color="danger" checked={true} onChange={() => {}} />
              <Text variant="caption">Danger</Text>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Interactive Settings</h3>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <Text variant="caption" className="text-text-secondary block">
                  Receive notifications about updates
                </Text>
              </div>
              <Switch
                checked={switches.notifications}
                onChange={() => updateSwitch('notifications')}
                color="primary"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-save</Label>
                <Text variant="caption" className="text-text-secondary block">
                  Automatically save your work
                </Text>
              </div>
              <Switch
                checked={switches.autoSave}
                onChange={() => updateSwitch('autoSave')}
                color="success"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics</Label>
                <Text variant="caption" className="text-text-secondary block">
                  Help improve our service
                </Text>
              </div>
              <Switch
                checked={switches.analytics}
                onChange={() => updateSwitch('analytics')}
                color="warning"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Modal Showcase Component
function ModalShowcase() {
  const [modals, setModals] = useState({
    basic: false,
    confirmation: false,
    form: false
  });

  const [formData, setFormData] = useState({ name: '', email: '' });

  const openModal = (type: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [type]: true }));
  };

  const closeModal = (type: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [type]: false }));
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Modal Components
      </h2>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={() => openModal('basic')}>
            Basic Modal
          </Button>
          <Button variant="warning" onClick={() => openModal('confirmation')}>
            Confirmation Modal
          </Button>
          <Button variant="success" onClick={() => openModal('form')}>
            Form Modal
          </Button>
        </div>

        {/* Basic Modal */}
        <Modal
          isOpen={modals.basic}
          onClose={() => closeModal('basic')}
          title="Basic Modal"
        >
          <div className="p-6">
            <Text variant="body" className="mb-4">
              This is a basic modal demonstrating the modal component capabilities:
            </Text>
            <ul className="list-disc list-inside space-y-2 mb-6 text-text-secondary">
              <li>Keyboard navigation (ESC to close)</li>
              <li>Click outside to close</li>
              <li>Focus management</li>
              <li>Accessible ARIA attributes</li>
              <li>Theme-aware styling</li>
            </ul>
            <div className="flex justify-end">
              <Button variant="primary" onClick={() => closeModal('basic')}>
                Close
              </Button>
            </div>
          </div>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          isOpen={modals.confirmation}
          onClose={() => closeModal('confirmation')}
          title="Confirm Action"
        >
          <div className="p-6">
            <Text variant="body" className="mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </Text>
            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => closeModal('confirmation')}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => closeModal('confirmation')}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>

        {/* Form Modal */}
        <Modal
          isOpen={modals.form}
          onClose={() => closeModal('form')}
          title="User Information"
        >
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="ghost" onClick={() => closeModal('form')}>
                Cancel
              </Button>
              <Button 
                variant="success" 
                onClick={() => {
                  console.log('Form submitted:', formData);
                  closeModal('form');
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Card>
  );
}

// Typography Showcase Component
function TypographyShowcase() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-text-primary">
        Typography Components
      </h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Text Variants</h3>
          <div className="space-y-3">
            <Text variant="body">
              This is body text. It's perfect for paragraphs and longer content. 
              The typography system ensures consistent spacing and readability across all themes.
            </Text>
            <Text variant="caption" className="text-text-secondary">
              This is caption text - smaller and typically used for metadata, 
              descriptions, or supplementary information.
            </Text>
          </div>
        </div>

        <Divider />

        <div>
          <h3 className="text-lg font-semibold mb-4 text-text-primary">Colors</h3>
          <div className="space-y-2">
            <Text color="primary">Primary colored text</Text>
            <Text color="secondary">Secondary colored text</Text>
            <Text color="success">Success colored text</Text>
            <Text color="warning">Warning colored text</Text>
            <Text color="danger">Danger colored text</Text>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Main Demo Component
function DemoApp() {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-background-primary transition-colors duration-200">
      <DemoHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-primary">
            React MFE Shell v6.1.0
          </h1>
          <Text variant="body" className="text-text-secondary max-w-3xl mx-auto mb-6">
            A comprehensive demonstration of all components and capabilities in the 
            React Micro Frontend Shell. This demo showcases atomic design principles, 
            theme management, accessibility features, and TypeScript integration.
          </Text>
          <div className="flex justify-center space-x-4">
            <Badge variant="primary">React 19</Badge>
            <Badge variant="success">TypeScript</Badge>
            <Badge variant="warning">Tailwind CSS</Badge>
            <Badge variant="secondary">Atomic Design</Badge>
          </div>
        </div>

        <div className="space-y-12">
          <ButtonShowcase />
          <InputShowcase />
          <BadgeShowcase />
          <AvatarShowcase />
          <LoadingSpinnerShowcase />
          <SwitchShowcase />
          <ModalShowcase />
          <TypographyShowcase />
        </div>

        <footer className="mt-16 py-8 border-t border-border-primary">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-4">
              <Avatar 
                src="https://github.com/jonmatum.png" 
                alt="Jonatan Mata" 
                size="sm" 
              />
              <div className="text-left">
                <Text variant="caption" className="font-medium">
                  Built by Jonatan Mata
                </Text>
                <Text variant="caption" className="text-text-secondary">
                  Full-Stack Engineer
                </Text>
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 text-sm">
              <Badge variant="secondary" size="sm">
                @jonmatum/react-mfe-shell v6.1.0
              </Badge>
              <Badge variant="primary" size="sm">
                Current Theme: {settings.theme}
              </Badge>
            </div>
            
            <Text variant="caption" className="text-text-secondary">
              Micro Frontend Shell • Atomic Design • Accessibility First • TypeScript
            </Text>
          </div>
        </footer>
      </main>
    </div>
  );
}

// Root App Component
function App() {
  return (
    <SettingsProvider>
      <DemoApp />
    </SettingsProvider>
  );
}

export default App;
