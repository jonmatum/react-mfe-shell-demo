import packageJson from '../../package.json';

// Get the React MFE Shell version dynamically
export function getReactMfeShellVersion(): string {
  try {
    const dependencies = (packageJson.dependencies as Record<string, string>) || {};
    const devDependencies = (packageJson.devDependencies as Record<string, string>) || {};

    const version =
      dependencies['@jonmatum/react-mfe-shell'] ||
      devDependencies['@jonmatum/react-mfe-shell'] ||
      'latest';

    // Remove the ^ or ~ prefix if present
    return version.replace(/^[\^~]/, '');
  } catch (error) {
    console.warn('Could not determine React MFE Shell version:', error);
    return 'latest';
  }
}

// Get the current app version
export function getAppVersion(): string {
  return packageJson.version || '1.0.0';
}

// Get the current year for copyright
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
