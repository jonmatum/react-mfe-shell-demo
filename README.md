# React MFE Shell Demo Application

A comprehensive demonstration application showcasing all components and capabilities of the [@jonmatum/react-mfe-shell](https://www.npmjs.com/package/@jonmatum/react-mfe-shell) package.

## 🚀 Live Demo

**[View Live Demo](https://jonmatum.github.io/react-mfe-shell-demo/)**

## 📋 What's Demonstrated

This demo application provides a complete showcase of the React MFE Shell v6.1.0, including:

### 🧩 **Component Library**

#### **Atoms (Basic Building Blocks)**
- **Button Components**: All variants (primary, secondary, success, warning, danger, ghost), sizes (xs-xl), and states (loading, disabled)
- **Input Components**: Text inputs with labels, validation, error states, and different types (email, password, search)
- **Badge Components**: Status indicators with variants, sizes, and removable functionality
- **Avatar Components**: Profile pictures with fallback initials, multiple sizes, and GitHub integration
- **LoadingSpinner Components**: Animated spinners with sizes, colors, and text support
- **Switch Components**: Toggle switches with sizes, colors, and interactive settings
- **Typography Components**: Text variants, colors, and semantic styling

#### **Molecules (Component Combinations)**
- **Modal Components**: Accessible dialogs with different use cases (basic, confirmation, form modals)
- **Card Components**: Layout containers with proper spacing and theming

#### **Organisms (Complex Combinations)**
- **Interactive Settings Panel**: Real-world switch usage examples
- **Form Examples**: Complete form implementations with validation
- **Navigation Header**: Sticky header with theme switching and user profile

### 🎨 **Design System Features**

#### **Theme Management**
- **Light/Dark Mode**: Seamless theme switching with persistent preferences
- **System Theme**: Automatic detection and following of system preferences
- **Theme-Aware Components**: All components adapt to theme changes
- **Smooth Transitions**: Animated theme transitions for better UX

#### **Design Tokens**
- **Color System**: Semantic color palette with theme variants
- **Typography Scale**: Consistent text sizing and spacing
- **Component Variants**: Standardized component variations
- **Accessibility**: WCAG AA compliant color contrasts

### ♿ **Accessibility Features**

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Responsive Design**: Mobile-first approach with consistent breakpoints

### 🛠 **Technical Implementation**

- **React 19**: Latest React features and performance optimizations
- **TypeScript**: Full type safety and IntelliSense support
- **Tailwind CSS**: Utility-first styling with design token integration
- **Vite**: Fast development and optimized production builds
- **Atomic Design**: Structured component hierarchy and reusability

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 22.x LTS or higher
- npm 10.x or higher

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/jonmatum/react-mfe-shell-demo.git
cd react-mfe-shell-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📦 Package Integration

This demo uses the latest version of the React MFE Shell:

```json
{
  "dependencies": {
    "@jonmatum/react-mfe-shell": "^6.1.0"
  }
}
```

### Basic Usage Example

```tsx
import React from 'react';
import { 
  SettingsProvider, 
  Button, 
  Input, 
  Badge,
  useSettings 
} from '@jonmatum/react-mfe-shell';

function MyApp() {
  return (
    <SettingsProvider>
      <MyComponent />
    </SettingsProvider>
  );
}

function MyComponent() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <div className="p-4 space-y-4">
      <Button 
        variant="primary"
        onClick={() => updateSettings({ 
          theme: settings.theme === 'light' ? 'dark' : 'light' 
        })}
      >
        Toggle Theme
      </Button>
      
      <Input 
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      
      <Badge variant="success">
        Active
      </Badge>
    </div>
  );
}
```

## 🎯 Demo Sections

### 1. **Button Showcase**
- Complete button variant demonstration
- Size variations from extra-small to extra-large
- Interactive loading states and async actions
- Disabled state examples

### 2. **Input Showcase**
- Form input examples with validation
- Different input types (email, password, search)
- Error states and helper text
- Disabled input demonstration

### 3. **Badge Showcase**
- All badge variants and colors
- Size demonstrations
- Interactive removable badges with reset functionality

### 4. **Avatar Showcase**
- Size progression demonstration
- Real GitHub profile integration
- Fallback initial generation examples

### 5. **Loading Spinner Showcase**
- Size and color variations
- Interactive loading simulation
- Text integration examples

### 6. **Switch Showcase**
- Size and color demonstrations
- Real-world settings panel implementation
- Interactive state management

### 7. **Modal Showcase**
- Basic modal with accessibility features
- Confirmation dialog patterns
- Form modal with input integration

### 8. **Typography Showcase**
- Text component variants
- Color system demonstration
- Semantic text usage

## 🔧 Configuration

### Tailwind CSS Integration

The demo includes proper Tailwind configuration for design token integration:

```javascript
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@jonmatum/react-mfe-shell/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Design token integration
      colors: {
        primary: { /* ... */ },
        success: { /* ... */ },
        // Theme-aware colors
        'background-primary': 'rgb(var(--color-background-primary) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
      }
    }
  }
}
```

## 🚀 Deployment

This demo is automatically deployed to GitHub Pages on every push to the main branch.

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to your hosting platform
# The built files are in the `dist` directory
```

## 📚 Documentation

- **[Main Package Documentation](https://github.com/jonmatum/react-mfe-shell)**
- **[Component API Reference](https://github.com/jonmatum/react-mfe-shell#component-library)**
- **[Design Tokens Guide](https://github.com/jonmatum/react-mfe-shell/docs/design-tokens.md)**
- **[Implementation Guide](https://github.com/jonmatum/react-mfe-shell/docs/implementation-guide.md)**

## 🤝 Contributing

This demo application serves as both a testing ground and documentation for the React MFE Shell package. Contributions are welcome!

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-demo`
3. Make your changes
4. Test the demo: `npm run dev`
5. Build for production: `npm run build`
6. Commit your changes: `git commit -m "feat: add amazing demo feature"`
7. Push and create a pull request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Jonatan Mata** - Full-Stack Engineer
- GitHub: [@jonmatum](https://github.com/jonmatum)
- Package: [@jonmatum/react-mfe-shell](https://www.npmjs.com/package/@jonmatum/react-mfe-shell)

---

**Built with ❤️ for the micro frontend community**

*Showcasing the power of atomic design, accessibility-first development, and modern React patterns.*
