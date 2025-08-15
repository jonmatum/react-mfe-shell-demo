# React MFE Shell Test App

[![CI](https://github.com/jonmatum/react-mfe-shell-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/jonmatum/react-mfe-shell-demo/actions/workflows/ci.yml)
[![Release](https://github.com/jonmatum/react-mfe-shell-demo/actions/workflows/release-please.yml/badge.svg)](https://github.com/jonmatum/react-mfe-shell-demo/actions/workflows/release-please.yml)

**[Live Demo](https://jonmatum.github.io/react-mfe-shell-demo/)**

This is a comprehensive test application for the `@jonmatum/react-mfe-shell` package. It demonstrates all the components and features available in the MFE Shell with automated releases and GitHub Pages deployment.

## Features Tested

### Components
- **Button**: All variants (primary, secondary, ghost) and states
- **Modal**: Accessible modal with keyboard navigation and backdrop click
- **LoadingSpinner**: Different sizes and loading states
- **Switch**: Toggle switches with proper state management

### Context & State Management
- **SettingsProvider**: Global settings management
- **Theme Management**: Light, dark, and system theme modes
- **useSettings Hook**: Access and update global settings

### Design System
- **Atomic Design**: Components following atomic design principles
- **Tailwind CSS**: Consistent styling with the MFE Shell
- **Dark Mode**: Full dark mode support with system preference detection
- **Accessibility**: WCAG AA compliant components

## Getting Started

### Prerequisites
- Node.js 22.x LTS (jod) or higher
- npm 10.x or higher

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

The app demonstrates:

1. **Component Library**: All available components with different variants
2. **Theme Switching**: Toggle between light, dark, and system themes
3. **State Management**: Global settings that persist across components
4. **Integration**: How components work together in a real application

## Package Information

- **Package**: `@jonmatum/react-mfe-shell@3.0.0`
- **Repository**: https://github.com/jonmatum/react-mfe-shell
- **Documentation**: https://github.com/jonmatum/react-mfe-shell/wiki

## Test Scenarios

### Manual Testing
1. **Theme Switching**: Use the switch to toggle between themes
2. **Modal Interaction**: Open modal, test keyboard navigation (ESC, Tab)
3. **Button States**: Test all button variants and disabled states
4. **Loading States**: Trigger loading spinner with different sizes
5. **Responsive Design**: Test on different screen sizes

### Integration Testing
- All components share the same theme context
- Settings persist across page refreshes
- Components maintain consistent styling
- Accessibility features work across all components

## Development

This test app uses:
- **Vite**: Fast development server and build tool
- **React 18**: Latest React features
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **@jonmatum/react-mfe-shell**: The MFE Shell package being tested

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This application is automatically deployed to GitHub Pages on every release. The deployment process:

1. **Automated Releases**: Uses [release-please](https://github.com/googleapis/release-please) to automatically create releases based on conventional commits
2. **GitHub Pages**: Automatically deploys the built application to GitHub Pages when a new release is created
3. **CI/CD Pipeline**: Runs tests, linting, and builds on every push and pull request

### Release Process

1. Make changes using conventional commit messages (e.g., `feat:`, `fix:`, `docs:`)
2. Push to the `main` branch
3. Release Please will automatically create a PR with version bump and changelog
4. Merge the release PR to trigger a new release and deployment

### Manual Deployment

To deploy manually to GitHub Pages:

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```
