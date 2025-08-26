import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  trackingId?: string;
  enabled?: boolean;
}

export function GoogleAnalytics({ 
  trackingId = 'G-XXXXXXXXXX', // Replace with actual GA4 tracking ID
  enabled = false // Set to true when ready to track
}: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!enabled || !trackingId) return;

    // Initialize Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    script.async = true;
    document.head.appendChild(script);

    // Configure gtag
    window.gtag = window.gtag || function() {
      (window.gtag.q = window.gtag.q || []).push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src*="${trackingId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [trackingId, enabled]);

  if (!enabled || !trackingId) return null;

  return (
    <Helmet>
      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </script>
    </Helmet>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
