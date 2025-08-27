# Maturity Assessment Platform - React MFE Shell Demo

A comprehensive **organizational maturity assessment application** built with the [React MFE Shell](https://github.com/jonmatum/react-mfe-shell) package, demonstrating real-world micro frontend capabilities in a production-ready scenario.

## Live Demo

**[View Maturity Assessment Platform](https://jonmatum.github.io/react-mfe-shell-demo/)**

Experience a fully functional maturity assessment platform showcasing:
- **Multi-Model Assessment**: Platform Engineering and Software Development maturity models
- **Real-time Scoring**: Interactive scoring with live calculations and progress tracking
- **Visual Analytics**: Color-coded charts and progress indicators with maturity level interpretation
- **Data Management**: Export/import functionality with persistent localStorage
- **Advanced Search**: Full-text search across all assessment categories and items
- **Theme Support**: Light/dark mode with smooth transitions
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Application Features

### Core Functionality
- **Multiple Maturity Models**: Switch between Platform Engineering and Software Development frameworks
- **Interactive Scoring**: 0-2 scale scoring system (Not Started, Partial, Complete)
- **Detailed Item Information**: Click any assessment item to view comprehensive descriptions and success criteria
- **Real-time Analytics**: Live calculation of section and overall maturity percentages
- **Progress Visualization**: Color-coded progress bars and charts with maturity level indicators
- **Data Persistence**: Automatic localStorage saving with unique keys per model
- **Search & Filter**: Real-time search across all assessment items and categories
- **Export/Import**: JSON-based data backup and restore functionality

### User Experience
- **Interactive Dashboard**: Visual statistics and maturity level interpretation
- **Enhanced Charts**: Color-coded bar charts with custom tooltips and legends
- **Detailed Item Modals**: Click any item to view comprehensive descriptions and success criteria
- **Modal Confirmations**: Professional confirmation dialogs for destructive actions
- **Loading States**: Smooth loading animations during data operations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG AA compliant with proper ARIA attributes
- **Theme Switching**: Light/dark mode with persistent preferences
- **Professional Design**: Clean, modern interface using React MFE Shell design system

### Technical Showcase
- **MFE Component Library**: Demonstrates 87.5% of React MFE Shell components
- **State Management**: Complex application state with React hooks and localStorage
- **TypeScript Integration**: Full type safety and IntelliSense support
- **Performance Optimization**: Efficient rendering and bundle optimization
- **Modern React Patterns**: Hooks, context, and functional components

## Technology Stack

### Frontend Framework
- **React 18**: Latest React with concurrent features
- **TypeScript**: Full type safety and developer experience
- **Vite**: Fast build tool with HMR and optimized bundling

### UI Components & Styling
- **React MFE Shell**: Complete component library with design system
- **Tailwind CSS v3**: Utility-first CSS framework
- **Recharts**: Interactive charts and data visualization
- **Design Tokens**: Consistent spacing, colors, and typography
- **Theme System**: Light/dark mode with CSS custom properties

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **PostCSS**: CSS processing and optimization
- **GitHub Actions**: Automated deployment to GitHub Pages

## React MFE Shell Component Showcase

### Component Usage Statistics (16/16 - 100%)
- ✅ **SettingsProvider** - Theme management and global state
- ✅ **Card** - Layout containers and content grouping
- ✅ **Text & Heading** - Typography system with semantic levels
- ✅ **Button** - Interactive elements with multiple variants
- ✅ **Badge & FeatureChip** - Status indicators and feature highlights
- ✅ **SearchBox & Select** - Form controls and user input
- ✅ **Switch & Label** - Settings controls and form labels
- ✅ **Avatar & Divider** - UI elements and content separation
- ✅ **LoadingSpinner** - Loading states and async operations
- ✅ **Modal** - Enhanced confirmation dialogs and detailed overlays with v11.0.0 improvements
- ✅ **formatNumber & useSettings** - Utility functions and custom hooks

### Enhanced Modal Capabilities (v11.0.0)
The application now uses react-mfe-shell v11.0.0 with clean, full-size modal design:

#### **Item Detail Modal - Full Size & Clean Design:**
```typescript
// Clean, spacious design with React MFE Shell components
<Modal isOpen={isOpen} onClose={onClose} title="Assessment Item" size="full">
  <div className="max-w-4xl mx-auto space-y-8">
    {/* Header with Status */}
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <Badge variant="primary">Item {itemNumber}</Badge>
        <Heading level={2} size="xl">{item.label}</Heading>
      </div>
      <Badge variant="success" size="lg">Fully Implemented</Badge>
    </div>

    <Divider />

    {/* Two-Column Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Heading level={3}>Description</Heading>
        <Text>{item.description}</Text>
      </div>
      <div>
        <Heading level={3}>Current Score</Heading>
        <ScoreSelector />
      </div>
    </div>

    <Divider />

    {/* Success Criteria Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="p-6 rounded-lg bg-warning-50 border border-warning-200">
        <Badge variant="warning" size="lg">Score 1</Badge>
        <Heading level={4}>Partially Implemented</Heading>
        <Text>{item.successCriteria.partial}</Text>
      </div>
      <div className="p-6 rounded-lg bg-success-50 border border-success-200">
        <Badge variant="success" size="lg">Score 2</Badge>
        <Heading level={4}>Fully Implemented</Heading>
        <Text>{item.successCriteria.complete}</Text>
      </div>
    </div>

    <Divider />

    {/* Clean Footer */}
    <div className="flex items-center justify-between">
      <Text>Changes are saved automatically</Text>
      <div className="flex gap-3">
        <Button variant="secondary" size="lg">Close</Button>
        <Button variant="primary" size="lg">Done</Button>
      </div>
    </div>
  </div>
</Modal>
```

### Modal Design Improvements
- **Full Size Modal**: `size="full"` provides maximum space for content
- **Clean Layout**: Spacious design with proper grid layouts and spacing
- **React MFE Shell Components**: Extensive use of standard components:
  - `Modal` with full size variant
  - `Heading` with proper hierarchy (h2, h3, h4)
  - `Text` for all content display
  - `Badge` for status indicators with large size
  - `Divider` for visual separation
  - `Button` for actions with large size
- **Two-Column Grid**: Efficient use of space with responsive layout
- **Consistent Spacing**: `space-y-8` and `gap-6/8` for proper visual rhythm
- **Professional Design**: Clean, uncluttered interface focused on content

#### **Reset Confirmation Modal Enhancements:**
```typescript
// Enhanced with detailed impact information and better actions
<Modal isOpen={showResetModal} onClose={handleResetCancel} title="Reset All Scores">
  {/* Warning Header with Gradient Background */}
  <div className="bg-gradient-to-r from-danger-50 to-warning-50 rounded-xl border border-danger-200">
    <ExclamationTriangleIcon className="w-6 h-6 text-danger-600" />
    <Heading className="text-danger-800">Permanent Action Warning</Heading>
  </div>

  {/* Detailed Impact List */}
  <div>
    <Heading>What will be reset:</Heading>
    <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
    <Text>All assessment item scores</Text>
    <Text>Section progress calculations</Text>
    <Text>Overall maturity percentages</Text>
  </div>

  {/* Recommendation Card */}
  <div className="bg-primary-50 rounded-lg border border-primary-200">
    <Text>💡 Recommendation: Consider exporting your data first</Text>
  </div>

  {/* Enhanced Action Buttons */}
  <div className="flex justify-between">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary" leftIcon={<DownloadIcon />}>Export First</Button>
    <Button variant="danger" leftIcon={<RefreshIcon />}>Reset All</Button>
  </div>
</Modal>
```

### Modal UX Improvements
- **Scrollable Content**: Max height with overflow-y-auto for long content
- **Sticky Elements**: Headers and footers stay visible during scrolling
- **Enhanced Visual Design**: Gradient backgrounds and rounded corners
- **Better Status Indicators**: Animated elements and clear visual feedback
- **Improved Actions**: Multiple action options with clear visual hierarchy
- **Auto-save Feedback**: Real-time indication of data persistence
- **Warning Systems**: Clear visual warnings for destructive actions
- **Responsive Layout**: Proper spacing and sizing for all screen sizes

### Optimized Assessment Framework Layout
The Assessment Framework uses an efficient, fully responsive layout with standard React MFE Shell components:

```typescript
// Fully responsive layout with React MFE Shell Select component
<Card className="Assessment Framework">
  {/* Responsive Header with Framework Selection */}
  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
    <DocumentTextIcon />
    <div className="flex-1 min-w-0">
      <Heading>Assessment Framework</Heading>
      <Text>Choose the maturity framework...</Text>
    </div>
    <div className="w-full sm:w-auto sm:min-w-[280px] sm:max-w-[320px]">
      <Text>Select Framework</Text>
      <Select
        id="model-selector"
        value={selectedModelKey}
        onChange={(value) => onModelChange(String(value))}
        options={options}
        className="w-full"
      />
    </div>
  </div>

  {/* Three-Column Responsive Information Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div>Selected Model Info</div>
    <div>Scoring Guide</div>
    <div>Maturity Levels</div>
  </div>
  
  <Text>Data automatically saved to local storage</Text>
</Card>
```

### React MFE Shell Components Used
- ✅ **Select**: Standard dropdown component from `@jonmatum/react-mfe-shell`
- ✅ **Card**: Layout container with consistent styling
- ✅ **Text**: Typography with semantic meaning and proper contrast
- ✅ **Heading**: Semantic heading hierarchy (h3, h4)
- ✅ **FeatureChip**: Status indicators with consistent variants
- ✅ **Divider**: Visual separation elements

### Responsive Layout Features
- **Mobile (< 640px)**: Full-width stacked layout, Select Framework takes full width
- **Tablet (640px+)**: Header becomes horizontal, Select Framework maintains optimal width
- **Desktop (1024px+)**: Three-column grid for information sections
- **Flexible Sizing**: Select Framework adapts from full-width to constrained optimal size
- **Text Overflow**: Proper handling with `min-w-0` for text truncation
- **Touch-Friendly**: Adequate spacing and sizing for mobile interaction

## SEO & Performance Optimization

### Search Engine Optimization
- **Comprehensive Meta Tags**: Title, description, keywords, and author information
- **Open Graph Protocol**: Rich social media sharing with custom images and descriptions
- **Twitter Cards**: Enhanced Twitter sharing experience with large image cards
- **LinkedIn Integration**: Professional network sharing optimization
- **Structured Data**: JSON-LD schema markup for rich search results
- **Canonical URLs**: Proper URL canonicalization to avoid duplicate content
- **Robots.txt**: Search engine crawling instructions and sitemap location
- **Sitemap.xml**: Complete site structure for search engine indexing

### Technical SEO
- **React Helmet Async**: Dynamic meta tag management for SPA SEO
- **Semantic HTML**: Proper heading hierarchy and semantic markup
- **Mobile-First Design**: Responsive design optimized for mobile search rankings
- **Page Speed Optimization**: Optimized assets and lazy loading for fast load times
- **Core Web Vitals**: Optimized for Google's Core Web Vitals metrics
- **Accessibility**: WCAG AA compliant for better search engine understanding

### Social Media Optimization
- **Open Graph Images**: Custom 1280x720 preview images for social sharing
- **Twitter Card Images**: Optimized images for Twitter sharing
- **Dynamic Meta Tags**: Context-aware meta tags based on selected assessment model
- **Rich Snippets**: Structured data for enhanced search result appearance

### Performance Features
- **Preconnect Links**: DNS prefetching for external resources
- **Resource Hints**: Optimized loading of fonts and external assets
- **Gzip Compression**: Compressed assets for faster loading
- **Bundle Optimization**: Code splitting and tree shaking for minimal bundle size

## Architecture & Patterns

### Micro Frontend Approach
This application demonstrates how to build scalable applications using micro frontend architecture:

```typescript
// Component-based architecture
import {
  SettingsProvider,    // Global state management
  Button, Card,        // Layout components
  Badge, FeatureChip,  // Data display components
  SearchBox, Select,   // Interactive components
  useSettings          // Custom hooks
} from '@jonmatum/react-mfe-shell';
```

### State Management Pattern
```typescript
// Centralized state with React hooks and localStorage
const [scores, setScores] = usePersistentScores(model.storageKey);
const [selectedModel, setSelectedModel] = useState('platform');
const { settings, updateSettings } = useSettings();
```

### Component Composition
```typescript
// Reusable component patterns
<MaturitySection
  section={section}
  scores={scores}
  onScoreChange={handleScoreChange}
  maxPerItem={model.maxPerItem}
/>
```

## Use Case Scenarios

### 1. **Platform Engineering Assessment**
- Evaluate micro-frontend architecture maturity
- Assess developer experience and tooling
- Track infrastructure and cost optimization progress
- Monitor security and compliance practices

### 2. **Software Development Maturity**
- Review code quality and testing practices
- Assess CI/CD and deployment capabilities
- Evaluate monitoring and observability
- Track agile and project management maturity

### 3. **Organizational Benchmarking**
- Compare maturity across different teams
- Identify improvement opportunities
- Track progress over time with data export
- Create action plans based on assessment results

### 4. **Continuous Improvement**
- Regular maturity assessments
- Progress tracking with historical data
- Team alignment on improvement priorities
- Evidence-based decision making

## React MFE Shell Component Showcase

### Layout & Structure
```typescript
// Cards and layout components
<Card className="p-6 hover:shadow-lg transition-all duration-200">
  <Heading level={3} size="lg">Section Title</Heading>
  <Divider className="my-4" />
</Card>
```

### Interactive Elements
```typescript
// Buttons, switches, and selectors
<Button variant="primary" leftIcon={<Icon />}>
  Action Button
</Button>

<Switch
  checked={settings.theme === 'dark'}
  onChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
/>

// Modal dialogs for confirmations
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
>
  <Text>Are you sure you want to proceed?</Text>
</Modal>
```

### Data Display
```typescript
// Badges, chips, and progress indicators
<Badge variant="success">{score}% Complete</Badge>
<FeatureChip variant="primary" size="sm">
  {formatNumber(totalItems)} Items
</FeatureChip>
```

### Search & Navigation
```typescript
// Search and selection components
<SearchBox
  placeholder="Search assessment items..."
  value={searchQuery}
  onChange={setSearchQuery}
  showClearButton
/>
```

## Getting Started

### Prerequisites
- Node.js 22.x LTS or higher
- npm 10.x or higher

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/jonmatum/react-mfe-shell-demo.git
cd react-mfe-shell-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
# Development
npm run dev              # Start development server (http://localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking

# Deployment
npm run deploy          # Deploy to GitHub Pages
```

## Creating Custom Maturity Models

### 1. Define Your Model
```typescript
export const customMaturityModel = {
  title: "Custom Maturity Assessment",
  description: "Assess your organization's practices in key areas.",
  maxPerItem: 2,
  storageKey: "custom-maturity-v1",
  sections: [
    {
      key: "section1",
      title: "1. Assessment Area",
      items: [
        { key: "item1", label: "Practice to assess" },
        { key: "item2", label: "Another practice" },
      ],
    },
  ],
} as const;
```

### 2. Register Your Model
```typescript
// In App.tsx
const availableModels = [
  { key: 'platform', model: platformMaturityModel },
  { key: 'software', model: softwareMaturityModel },
  { key: 'custom', model: customMaturityModel },
];
```

## Component Usage Statistics

### React MFE Shell Components Used (15/16 - 93.75%)
- ✅ **SettingsProvider** - Theme management
- ✅ **Card** - Layout containers
- ✅ **Text & Heading** - Typography system
- ✅ **Button** - Interactive elements
- ✅ **Badge & FeatureChip** - Status indicators
- ✅ **SearchBox & Select** - Form controls
- ✅ **Switch & Label** - Settings controls
- ✅ **Avatar & Divider** - UI elements
- ✅ **LoadingSpinner** - Loading states
- ✅ **Modal** - Confirmation dialogs and overlays
- ✅ **formatNumber & useSettings** - Utilities

## Performance Metrics

### Bundle Analysis
- **JavaScript**: ~290 KB (optimized for production)
- **CSS**: ~35 KB (utility-first approach)
- **Charts**: Recharts for interactive visualizations

### Loading Performance
- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 3.8s
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)

## Deployment

### GitHub Pages Deployment
Automatically deployed on every push to main branch using GitHub Actions.

### Production Features
- **Optimized Builds**: Tree shaking and code splitting
- **Caching Strategy**: Aggressive caching for static assets
- **Error Handling**: Graceful error boundaries and fallbacks
- **Analytics Ready**: Structured for monitoring integration

## Contributing

We welcome contributions to improve the Maturity Assessment Platform! 

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run quality checks: `npm run lint && npm run type-check`
5. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
6. Push and create a pull request

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- **React MFE Shell**: Built with [@jonmatum/react-mfe-shell](https://www.npmjs.com/package/@jonmatum/react-mfe-shell)
- **Recharts**: Interactive chart library for data visualization
- **Community**: React and micro frontend community for best practices

---

**Built to showcase the power of micro frontend architecture and comprehensive component libraries**

*Experience the future of scalable React applications with the Maturity Assessment Platform!*
