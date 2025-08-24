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

const TaskMasterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <div className="flex items-center space-x-3">
                <TaskMasterIcon className="w-8 h-8 text-primary-600" />
                <div>
                  <Text className="text-xl font-semibold text-text-primary">TaskMaster Pro</Text>
                  <Text className="text-xs text-text-secondary">Project Management Dashboard</Text>
                </div>
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
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <Text className="text-text-secondary text-sm">
                powered by
              </Text>
              <Badge variant="default" size="md">
                React MFE Shell v6.2.0
              </Badge>
            </div>
            
            <Text className="text-text-tertiary text-xs text-center">
              © 2025 TaskMaster Pro. Built with React MFE Shell for demonstration purposes.
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
        <div className="p-6 border-b border-border-primary">
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

        {/* Modal Footer - Simplified */}
        {task.status !== 'completed' && (
          <div className="p-6 border-t border-border-primary">
            <Button
              variant="success"
              size="md"
              fullWidth
              leftIcon={<CheckIcon className="w-4 h-4" />}
              onClick={() => onStatusChange(task.id, 'completed')}
            >
              Mark as Completed
            </Button>
          </div>
        )}
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
        <div className="p-6 border-b border-border-primary">
          <Text className="text-xl font-bold">Create New Task</Text>
          <Text className="text-sm text-text-secondary mt-1">
            Fill in the details below to create a new task
          </Text>
        </div>

        <div className="p-6 space-y-6">
          <Input
            id="title"
            label="Task Title"
            size="md"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter task title..."
            required
            disabled={isSubmitting}
          />

          <Input
            id="description"
            label="Description"
            size="md"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the task..."
            required
            disabled={isSubmitting}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                className="w-full px-3 py-2 border border-border-primary rounded-md bg-surface-primary text-text-primary"
                disabled={isSubmitting}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <select
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                className="w-full px-3 py-2 border border-border-primary rounded-md bg-surface-primary text-text-primary"
                disabled={isSubmitting}
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
            disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              <Button 
                variant="secondary" 
                size="md"
                onClick={addTag}
                disabled={isSubmitting || !tagInput.trim()}
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

        <div className="p-6 border-t border-border-primary">
          <Button 
            variant="primary" 
            size="md"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Task...' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default App;
