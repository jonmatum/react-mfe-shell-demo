import { useState, useEffect } from 'react';
import { Button, Card, Text, Heading } from '@jonmatum/react-mfe-shell';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install prompt
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      // Hide the install prompt
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't clear deferredPrompt in case user changes their mind
  };

  if (!showInstallPrompt) return null;

  return (
    <Card className="fixed bottom-4 right-4 max-w-sm z-50 shadow-lg border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-blue-50">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <Heading level={4} size="sm" className="text-text-primary mb-1">
              Install App
            </Heading>
            <Text className="text-xs text-text-secondary mb-3">
              Install Maturity Assessment Platform for quick access and offline use
            </Text>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleInstallClick}
                className="text-xs px-3 py-1.5"
              >
                Install
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDismiss}
                className="text-xs px-3 py-1.5"
              >
                Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
