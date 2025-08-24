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
} from '@jonmatum/react-mfe-shell';

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
  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'todo': return 'secondary';
      default: return 'secondary';
    }
  };

  // Get priority badge variant
  const getPriorityVariant = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
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
          <LoadingSpinner  color="primary" />
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
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <span>+</span>
              <span>New Task</span>
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
                  <Text className="text-primary-600 text-xl">📋</Text>
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
                  <Text className="text-warning-600 text-xl">⏳</Text>
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
                  <Text className="text-success-600 text-xl">✅</Text>
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
                  <Text className="text-danger-600 text-xl">🔥</Text>
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
    </div>
  );
}

// Task Card Component
interface TaskCardProps {
  task: Task;
  users: User[];
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onViewDetails: (task: Task) => void;
  getStatusVariant: (status: Task['status']) => string;
  getPriorityVariant: (priority: Task['priority']) => string;
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
            <Badge variant={getStatusVariant(task.status) as any} size="sm">
              {task.status.replace('-', ' ')}
            </Badge>
            <Badge variant={getPriorityVariant(task.priority) as any} size="sm">
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
  getStatusVariant: (status: Task['status']) => string;
  getPriorityVariant: (priority: Task['priority']) => string;
}

function TaskDetailsModal({ task, users, onClose, onStatusChange, getStatusVariant, getPriorityVariant }: TaskDetailsModalProps) {
  const assigneeUser = users.find(u => u.name === task.assignee);

  return (
    <Modal isOpen onClose={onClose} >
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Text className="text-2xl font-bold mb-2">{task.title}</Text>
            <div className="flex items-center space-x-2">
              <Badge variant={getStatusVariant(task.status) as any}>
                {task.status.replace('-', ' ')}
              </Badge>
              <Badge variant={getPriorityVariant(task.priority) as any}>
                {task.priority} priority
              </Badge>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} size="sm">✕</Button>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-text-secondary mb-2">Description</Label>
            <Text>{task.description}</Text>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-text-secondary mb-2">Assignee</Label>
              <div className="flex items-center space-x-3">
                {assigneeUser && (
                  <>
                    <Avatar
                      src={assigneeUser.avatar}
                      alt={assigneeUser.name}
                      size="sm"
                      fallback={assigneeUser.name.split(' ').map(n => n[0]).join('')}
                    />
                    <div>
                      <Text className="font-medium">{assigneeUser.name}</Text>
                      <Text className="text-sm">{assigneeUser.role}</Text>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-text-secondary mb-2">Due Date</Label>
              <Text>{new Date(task.dueDate).toLocaleDateString()}</Text>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-text-secondary mb-2">Tags</Label>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </div>
          </div>

          <Divider />

          <div className="flex items-center justify-between">
            <Text className="text-sm">
              Created on {new Date(task.createdAt).toLocaleDateString()}
            </Text>
            
            <div className="flex space-x-2">
              {(['todo', 'in-progress', 'completed'] as const).map((status) => (
                <Button
                  key={status}
                  variant={task.status === status ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onStatusChange(task.id, status)}
                  className="capitalize"
                >
                  {status.replace('-', ' ')}
                </Button>
              ))}
            </div>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    onCreateTask(formData);
    onClose();
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
          <Button variant="ghost" onClick={onClose} size="sm">✕</Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the task..."
              required
            />
          </div>

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

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              placeholder="YYYY-MM-DD"
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
              />
              <Button variant="secondary" onClick={addTag}>Add</Button>
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
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary">Create Task</Button>
        </div>
      </form>
    </Modal>
  );
}

export default App;
