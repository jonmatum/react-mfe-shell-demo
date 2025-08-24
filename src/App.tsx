import React, { useState, useEffect } from 'react';
import {
  SettingsProvider,
  Button,
  Input,
  Badge,
  Avatar,
  Switch,
  Modal,
  LoadingSpinner,
  Card,
  Text,
  Label,
  Divider,
  useSettings,
  type BadgeVariant,
} from '@jonmatum/react-mfe-shell';

// Simple SVG Icon Components
const TasksIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const ClockIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const FireIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 4-4 2.207 0 4 1.793 4 4 0 .211-.025.417-.075.612C18.832 11.987 20 14.793 20 18a3 3 0 01-3 3 2.99 2.99 0 01-2.343-1.157z" />
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const NpmIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
  </svg>
);

const BookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const SearchIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const TagIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

// Types for our Task Management App
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'developer' | 'designer';
}

// Mock data
const mockUsers: User[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@company.com', avatar: 'https://github.com/sarahchen.png', role: 'manager' },
  { id: '2', name: 'Alex Rodriguez', email: 'alex@company.com', avatar: 'https://github.com/alexrodriguez.png', role: 'developer' },
  { id: '3', name: 'Jordan Kim', email: 'jordan@company.com', avatar: 'https://github.com/jordankim.png', role: 'designer' },
  { id: '4', name: 'Taylor Swift', email: 'taylor@company.com', avatar: 'https://github.com/taylorswift.png', role: 'developer' },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Add OAuth2 integration with Google and GitHub providers',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Alex Rodriguez',
    dueDate: '2025-08-30',
    createdAt: '2025-08-20',
    tags: ['backend', 'security', 'auth']
  },
  {
    id: '2',
    title: 'Design dashboard wireframes',
    description: 'Create low-fidelity wireframes for the main dashboard layout',
    status: 'completed',
    priority: 'medium',
    assignee: 'Jordan Kim',
    dueDate: '2025-08-25',
    createdAt: '2025-08-18',
    tags: ['design', 'ux', 'wireframes']
  },
  {
    id: '3',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'todo',
    priority: 'high',
    assignee: 'Taylor Swift',
    dueDate: '2025-09-05',
    createdAt: '2025-08-22',
    tags: ['devops', 'automation', 'deployment']
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all REST endpoints using OpenAPI specification',
    status: 'todo',
    priority: 'low',
    assignee: 'Alex Rodriguez',
    dueDate: '2025-09-10',
    createdAt: '2025-08-21',
    tags: ['documentation', 'api', 'backend']
  },
  {
    id: '5',
    title: 'Implement real-time notifications',
    description: 'Add WebSocket support for live task updates and notifications',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Taylor Swift',
    dueDate: '2025-09-01',
    createdAt: '2025-08-19',
    tags: ['frontend', 'websockets', 'notifications']
  }
];

// Main App Component
function App() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-background-primary">
        <TaskManagementApp />
      </div>
    </SettingsProvider>
  );
}

// Task Management Application
function TaskManagementApp() {
  const { settings, updateSettings } = useSettings();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [users] = useState<User[]>(mockUsers);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter tasks based on status and search
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Get status badge variant
  const getStatusVariant = (status: Task['status']): BadgeVariant => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'todo': return 'secondary';
      default: return 'default';
    }
  };

  // Get priority badge variant
  const getPriorityVariant = (priority: Task['priority']): BadgeVariant => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  // Update task status
  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Create new task
  const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [newTask, ...prev]);
    setIsCreateModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="xl" />
          <Text>Loading your workspace...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <header className="bg-surface-primary border-b border-border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Text className="text-white font-bold text-sm">TM</Text>
                </div>
                <Text className="text-xl font-semibold text-text-primary">TaskMaster Pro</Text>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="theme-toggle" className="text-sm">Dark Mode</Label>
                <Switch
                  id="theme-toggle"
                  checked={settings.theme === 'dark'}
                  onChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
                  size="sm"
                />
              </div>
              
              <Avatar
                src="https://github.com/jonmatum.png"
                alt="Current User"
                size="sm"
                fallback="JM"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Text className="text-3xl font-bold mb-2 text-text-primary">Project Dashboard</Text>
              <Text className="text-text-secondary">Manage your team's tasks and track progress</Text>
            </div>
            <Button
              variant="primary"
              size="md"
              leftIcon={<PlusIcon />}
              onClick={() => setIsCreateModalOpen(true)}
            >
              New Task
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-sm font-medium text-text-secondary">Total Tasks</Text>
                  <Text className="text-2xl font-bold text-text-primary">{tasks.length}</Text>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <TasksIcon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-sm font-medium">In Progress</Text>
                  <Text className="text-2xl font-bold">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </Text>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <ClockIcon className="w-6 h-6 text-warning-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-sm font-medium">Completed</Text>
                  <Text className="text-2xl font-bold">
                    {tasks.filter(t => t.status === 'completed').length}
                  </Text>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <CheckIcon className="w-6 h-6 text-success-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Text className="text-sm font-medium">High Priority</Text>
                  <Text className="text-2xl font-bold">
                    {tasks.filter(t => t.priority === 'high').length}
                  </Text>
                </div>
                <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
                  <FireIcon className="w-6 h-6 text-danger-600" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              size="md"
              leftIcon={<SearchIcon />}
              placeholder="Search tasks, assignees, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex space-x-2">
            {(['all', 'todo', 'in-progress', 'completed'] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status === 'all' ? 'All' : status.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="p-12 text-center">
              <Text className="text-lg">
                {searchQuery ? 'No tasks match your search criteria' : 'No tasks found'}
              </Text>
              <Button
                variant="primary"
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4"
              >
                Create Your First Task
              </Button>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                users={users}
                onStatusChange={updateTaskStatus}
                onViewDetails={setSelectedTask}
                getStatusVariant={getStatusVariant}
                getPriorityVariant={getPriorityVariant}
              />
            ))
          )}
        </div>
      </main>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          users={users}
          onClose={() => setSelectedTask(null)}
          onStatusChange={updateTaskStatus}
          getStatusVariant={getStatusVariant}
          getPriorityVariant={getPriorityVariant}
        />
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <CreateTaskModal
          users={users}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateTask={createTask}
        />
      )}

      {/* Footer */}
      <footer className="bg-surface-primary border-t border-border-primary mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Text className="text-text-secondary text-sm">
                Powered by
              </Text>
              <a
                href="https://www.npmjs.com/package/@jonmatum/react-mfe-shell"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3 py-1 bg-surface-secondary hover:bg-surface-tertiary border border-border-secondary rounded-md transition-colors duration-200"
              >
                <div className="w-5 h-5 bg-primary-600 rounded flex items-center justify-center">
                  <Text className="text-white font-bold text-xs">R</Text>
                </div>
                <Text className="text-text-primary font-medium text-sm">
                  React MFE Shell
                </Text>
                <div className="inline-flex items-center space-x-1 px-2 py-0.5 bg-border-secondary rounded text-xs font-medium text-text-secondary">
                  <TagIcon className="w-3 h-3" />
                  <span>v6.2.0</span>
                </div>
              </a>
            </div>

            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <a
                href="https://github.com/jonmatum/react-mfe-shell"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.npmjs.com/package/@jonmatum/react-mfe-shell"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
              >
                <NpmIcon />
                <span>npm Package</span>
              </a>
              <a
                href="https://github.com/jonmatum/react-mfe-shell/wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
              >
                <BookIcon />
                <span>Wiki</span>
              </a>
            </div>
          </div>

          <Divider className="my-6" />

          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <Text className="text-text-tertiary text-xs">
              © 2025 TaskMaster Pro. Built with React MFE Shell for demonstration purposes.
            </Text>
            <Text className="text-text-tertiary text-xs">
              Showcasing micro frontend architecture and component library capabilities.
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Task Card Component
interface TaskCardProps {
  task: Task;
  users: User[];
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onViewDetails: (task: Task) => void;
  getStatusVariant: (status: Task['status']) => BadgeVariant;
  getPriorityVariant: (priority: Task['priority']) => BadgeVariant;
}

function TaskCard({ task, users, onStatusChange, onViewDetails, getStatusVariant, getPriorityVariant }: TaskCardProps) {
  const assigneeUser = users.find(u => u.name === task.assignee);
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Text className="text-lg font-semibold">{task.title}</Text>
            <Badge variant={getStatusVariant(task.status)} size="sm">
              {task.status.replace('-', ' ')}
            </Badge>
            <Badge variant={getPriorityVariant(task.priority)} size="sm">
              {task.priority} priority
            </Badge>
            {isOverdue && (
              <Badge variant="danger" size="sm">Overdue</Badge>
            )}
          </div>
          <Text className="mb-3">{task.description}</Text>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {task.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">#{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {assigneeUser && (
            <Avatar
              src={assigneeUser.avatar}
              alt={assigneeUser.name}
              size="sm"
              fallback={assigneeUser.name.split(' ').map(n => n[0]).join('')}
            />
          )}
        </div>
      </div>

      <Divider className="my-4" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          <span>•</span>
          <span>Assigned to: {task.assignee}</span>
        </div>

        <div className="flex items-center space-x-2">
          {task.status !== 'completed' && (
            <Button
              variant="success"
              size="sm"
              leftIcon={<CheckIcon className="w-4 h-4" />}
              onClick={() => onStatusChange(task.id, 'completed')}
            >
              Mark Complete
            </Button>
          )}
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(task)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

// Task Details Modal Component
interface TaskDetailsModalProps {
  task: Task;
  users: User[];
  onClose: () => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  getStatusVariant: (status: Task['status']) => BadgeVariant;
  getPriorityVariant: (priority: Task['priority']) => BadgeVariant;
}

function TaskDetailsModal({ task, users, onClose, onStatusChange, getStatusVariant, getPriorityVariant }: TaskDetailsModalProps) {
  const assigneeUser = users.find(u => u.name === task.assignee);

  return (
    <Modal isOpen onClose={onClose}>
      <div className="max-w-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-border-primary">
          <div className="flex-1">
            <Text className="text-2xl font-bold mb-3">{task.title}</Text>
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusVariant(task.status)} size="md">
                {task.status.replace('-', ' ')}
              </Badge>
              <Badge variant={getPriorityVariant(task.priority)} size="md">
                {task.priority} priority
              </Badge>
              {new Date(task.dueDate) < new Date() && task.status !== 'completed' && (
                <Badge variant="danger" size="md" dot>
                  Overdue
                </Badge>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            rightIcon={<XIcon />}
            onClick={onClose}
          >
            Close
          </Button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <Label className="text-sm font-medium text-text-secondary mb-2">Description</Label>
            <div className="p-4 bg-surface-secondary rounded-lg">
              <Text>{task.description}</Text>
            </div>
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assignee */}
            <div>
              <Label className="text-sm font-medium text-text-secondary mb-3">Assignee</Label>
              <div className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
                {assigneeUser && (
                  <>
                    <Avatar
                      src={assigneeUser.avatar}
                      alt={assigneeUser.name}
                      size="md"
                      fallback={assigneeUser.name.split(' ').map(n => n[0]).join('')}
                    />
                    <div>
                      <Text className="font-medium">{assigneeUser.name}</Text>
                      <Text className="text-sm text-text-secondary capitalize">{assigneeUser.role}</Text>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div>
              <Label className="text-sm font-medium text-text-secondary mb-3">Due Date</Label>
              <div className="flex items-center space-x-2 p-3 bg-surface-secondary rounded-lg">
                <CalendarIcon className="text-text-secondary" />
                <Text>{new Date(task.dueDate).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}</Text>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium text-text-secondary mb-3">Tags</Label>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="primary" size="sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Created Date */}
          <div className="text-xs text-text-tertiary border-t border-border-primary pt-4">
            Created on {new Date(task.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border-primary bg-surface-secondary">
          <Text className="text-sm text-text-secondary">
            Status Actions
          </Text>
          <div className="flex space-x-2">
            {(['todo', 'in-progress', 'completed'] as const).map((status) => (
              <Button
                key={status}
                variant={task.status === status ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onStatusChange(task.id, status)}
                disabled={task.status === status}
              >
                {status.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Create Task Modal Component
interface CreateTaskModalProps {
  users: User[];
  onClose: () => void;
  onCreateTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

function CreateTaskModal({ users, onClose, onCreateTask }: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    assignee: users[0]?.name || '',
    dueDate: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onCreateTask(formData);
    setIsSubmitting(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <Modal isOpen onClose={onClose} >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Text className="text-xl font-bold">Create New Task</Text>
          <Button 
            variant="ghost" 
            size="sm"
            rightIcon={<XIcon />}
            onClick={onClose}
          >
            Close
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            id="title"
            label="Task Title"
            size="md"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter task title..."
            required
          />

          <Input
            id="description"
            label="Description"
            size="md"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the task..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                className="w-full px-3 py-2 border border-border-primary rounded-md bg-surface-primary text-text-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <select
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                className="w-full px-3 py-2 border border-border-primary rounded-md bg-surface-primary text-text-primary"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>

          <Input
            id="dueDate"
            label="Due Date"
            size="md"
            leftIcon={<CalendarIcon />}
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            placeholder="YYYY-MM-DD"
            required
          />

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="tags"
                size="md"
                leftIcon={<TagIcon />}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
              />
              <Button 
                variant="secondary" 
                size="md"
                onClick={addTag}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  removable
                  onRemove={() => removeTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="flex justify-end space-x-3">
          <Button 
            variant="secondary" 
            size="md"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            size="md"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default App;
