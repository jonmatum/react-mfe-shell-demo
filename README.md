# TaskMaster Pro - Project Management Dashboard

A comprehensive **task management application** built with the [React MFE Shell](https://github.com/jonmatum/react-mfe-shell) package, demonstrating real-world micro frontend capabilities in a production-ready scenario.

## 🚀 Live Demo

**[View TaskMaster Pro](https://jonmatum.github.io/react-mfe-shell-demo/)**

Experience a fully functional project management dashboard showcasing:
- **Task Management**: Create, update, and track project tasks
- **Team Collaboration**: Assign tasks to team members with role-based access
- **Real-time Filtering**: Search and filter tasks by status, priority, and assignee
- **Interactive Dashboard**: Visual statistics and progress tracking
- **Theme Support**: Light/dark mode with smooth transitions
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 📋 Application Features

### Core Functionality
- ✅ **Task CRUD Operations**: Create, read, update, and delete tasks
- ✅ **Status Management**: Todo, In Progress, Completed workflow
- ✅ **Priority System**: High, Medium, Low priority levels with visual indicators
- ✅ **Team Assignment**: Assign tasks to team members with avatar integration
- ✅ **Due Date Tracking**: Visual overdue indicators and date management
- ✅ **Tag System**: Categorize tasks with custom tags
- ✅ **Search & Filter**: Real-time search across tasks, assignees, and descriptions

### User Experience
- ✅ **Interactive Dashboard**: Statistics cards showing project metrics
- ✅ **Modal Workflows**: Task creation and detail views in overlay modals
- ✅ **Loading States**: Smooth loading animations and skeleton screens
- ✅ **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- ✅ **Accessibility**: WCAG AA compliant with proper ARIA attributes
- ✅ **Theme Switching**: Light/dark mode with persistent preferences

### Technical Showcase
- ✅ **MFE Component Library**: Demonstrates all React MFE Shell components
- ✅ **State Management**: Complex application state with React hooks
- ✅ **TypeScript Integration**: Full type safety and IntelliSense support
- ✅ **Performance Optimization**: Efficient rendering and bundle optimization
- ✅ **Modern React Patterns**: Hooks, context, and functional components

## 🛠 Technology Stack

### Frontend Framework
- **React 18**: Latest React with concurrent features
- **TypeScript**: Full type safety and developer experience
- **Vite**: Fast build tool with HMR and optimized bundling

### UI Components & Styling
- **React MFE Shell**: Complete component library with design system
- **Tailwind CSS v3**: Utility-first CSS framework
- **Design Tokens**: Consistent spacing, colors, and typography
- **Theme System**: Light/dark mode with CSS custom properties

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **PostCSS**: CSS processing and optimization
- **GitHub Actions**: Automated deployment to GitHub Pages

## 🏗 Architecture & Patterns

### Micro Frontend Approach
This application demonstrates how to build scalable applications using micro frontend architecture:

```typescript
// Component-based architecture
import {
  SettingsProvider,    // Global state management
  Button, Input,       // Form components
  Modal, Card,         // Layout components
  Badge, Avatar,       // Data display components
  useSettings          // Custom hooks
} from '@jonmatum/react-mfe-shell';
```

### State Management Pattern
```typescript
// Centralized state with React hooks
const [tasks, setTasks] = useState<Task[]>(mockTasks);
const [filter, setFilter] = useState<FilterType>('all');
const { settings, updateSettings } = useSettings();
```

### Component Composition
```typescript
// Reusable component patterns
<TaskCard
  task={task}
  onStatusChange={updateTaskStatus}
  onViewDetails={setSelectedTask}
  getStatusVariant={getStatusVariant}
/>
```

## 📊 Use Case Scenarios

### 1. **Software Development Team**
- Track feature development and bug fixes
- Assign tasks to developers, designers, and QA engineers
- Monitor sprint progress and delivery timelines
- Categorize work with tags (frontend, backend, testing, etc.)

### 2. **Marketing Campaign Management**
- Plan and execute marketing campaigns
- Coordinate between content creators, designers, and managers
- Track deliverables and campaign milestones
- Manage priority levels for time-sensitive content

### 3. **Product Launch Coordination**
- Orchestrate cross-functional product launches
- Assign responsibilities across engineering, marketing, and sales
- Monitor critical path items and dependencies
- Ensure all launch criteria are met on schedule

### 4. **Client Project Management**
- Manage multiple client projects simultaneously
- Track billable hours and project deliverables
- Coordinate team resources and workload distribution
- Provide client visibility into project progress

## 🎯 MFE Component Showcase

### Form Components
```typescript
// Input with validation and theming
<Input
  type="search"
  placeholder="Search tasks..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

// Switch for settings
<Switch
  checked={settings.theme === 'dark'}
  onChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
/>
```

### Data Display
```typescript
// Status badges with semantic colors
<Badge variant={getStatusVariant(task.status)}>
  {task.status.replace('-', ' ')}
</Badge>

// User avatars with fallbacks
<Avatar
  src={user.avatar}
  alt={user.name}
  fallback={user.name.split(' ').map(n => n[0]).join('')}
/>
```

### Layout & Navigation
```typescript
// Modal workflows
<Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
  <CreateTaskForm onSubmit={createTask} />
</Modal>

// Card layouts
<Card className="p-6 hover:shadow-md transition-shadow">
  <TaskContent />
</Card>
```

### Interactive Elements
```typescript
// Action buttons with variants
<Button
  variant="success"
  onClick={() => updateTaskStatus(task.id, 'completed')}
>
  Mark Complete
</Button>

// Loading states
<LoadingSpinner size="lg" color="primary" />
```

## 🚀 Getting Started

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

## 📱 Responsive Design

### Mobile-First Approach
- **Mobile (320px+)**: Single-column layout with collapsible navigation
- **Tablet (768px+)**: Two-column grid with expanded task cards
- **Desktop (1024px+)**: Multi-column dashboard with full feature set
- **Large Desktop (1440px+)**: Optimized spacing and typography

### Adaptive Components
```typescript
// Responsive grid system
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard />
</div>

// Flexible layouts
<div className="flex flex-col sm:flex-row gap-4">
  <SearchInput />
  <FilterButtons />
</div>
```

## 🎨 Design System Integration

### Theme-Aware Components
```css
/* CSS custom properties for theming */
:root {
  --color-primary-600: 37 99 235;
  --color-success-600: 22 163 74;
  --color-warning-600: 217 119 6;
  --color-danger-600: 220 38 38;
}

.dark {
  --color-primary-600: 59 130 246;
  /* ... dark theme overrides */
}
```

### Semantic Color Usage
```typescript
// Status-based color mapping
const getStatusVariant = (status: Task['status']) => {
  switch (status) {
    case 'completed': return 'success';
    case 'in-progress': return 'warning';
    case 'todo': return 'secondary';
  }
};
```

## 🔧 Customization & Extension

### Adding New Task Fields
```typescript
// Extend the Task interface
interface Task {
  // ... existing fields
  estimatedHours?: number;
  actualHours?: number;
  labels?: string[];
  attachments?: File[];
}
```

### Custom Component Variants
```typescript
// Create custom badge variants
<Badge variant="urgent" className="animate-pulse">
  Urgent
</Badge>
```

### Integration with Backend APIs
```typescript
// Replace mock data with API calls
const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch('/api/tasks');
  return response.json();
};
```

## 📈 Performance Metrics

### Bundle Analysis
- **JavaScript**: 254.17 KB (78.15 KB gzipped)
- **CSS**: 35.15 KB (6.45 KB gzipped)
- **Total**: ~290 KB (optimized for production)

### Loading Performance
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.8s
- **Cumulative Layout Shift**: < 0.1

### Optimization Features
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Dynamic imports for modals
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**: Aggressive caching for static assets

## 🧪 Testing Strategy

### Component Testing
```typescript
// Example test structure
describe('TaskCard Component', () => {
  it('displays task information correctly', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
  });

  it('handles status updates', () => {
    const onStatusChange = jest.fn();
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />);
    
    fireEvent.click(screen.getByText('Mark Complete'));
    expect(onStatusChange).toHaveBeenCalledWith(mockTask.id, 'completed');
  });
});
```

### Integration Testing
- **User Workflows**: Complete task creation and management flows
- **State Management**: Complex state updates and side effects
- **API Integration**: Mock API responses and error handling
- **Accessibility**: Screen reader compatibility and keyboard navigation

## 🚀 Deployment

### GitHub Pages Deployment
Automatically deployed on every push to main branch:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      - name: Install and Build
        run: |
          npm ci
          npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Production Considerations
- **Environment Variables**: API endpoints and feature flags
- **Error Monitoring**: Integration with Sentry or similar services
- **Analytics**: User behavior tracking and performance monitoring
- **CDN Integration**: Static asset delivery optimization

## 🤝 Contributing

We welcome contributions to improve TaskMaster Pro! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run quality checks: `npm run lint && npm run type-check`
5. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
6. Push and create a pull request

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **React MFE Shell**: Built with [@jonmatum/react-mfe-shell](https://www.npmjs.com/package/@jonmatum/react-mfe-shell)
- **Design Inspiration**: Modern project management tools and design systems
- **Community**: React and micro frontend community for best practices

---

**Built with ❤️ to showcase the power of micro frontend architecture**

*Experience the future of scalable React applications with TaskMaster Pro!*
