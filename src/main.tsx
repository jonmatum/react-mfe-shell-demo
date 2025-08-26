import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import our custom styles
import './index.css'
import App from './App.tsx'

// Apply theme class to document based on system preference or stored preference
function applyTheme() {
  const stored = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (stored === 'dark' || (stored === 'system' && systemPrefersDark) || (!stored && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Apply theme on load
applyTheme();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
