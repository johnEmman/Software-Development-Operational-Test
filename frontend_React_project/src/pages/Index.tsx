import { useState, useEffect } from 'react';
import { Task, taskApi } from '@/services/taskApi';
import { TaskItem } from '@/components/TaskItem';
import { TaskForm } from '@/components/TaskForm';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to load tasks',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (data: { title: string; description?: string }) => {
    try {
      setActionLoading(true);
      const newTask = await taskApi.createTask(data);
      setTasks([newTask, ...tasks]);
      setIsFormOpen(false);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create task',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTask = async (data: { title: string; description?: string }) => {
    if (!editingTask) return;
    
    try {
      setActionLoading(true);
      const updatedTask = await taskApi.updateTask(editingTask.id, data);
      setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      setIsFormOpen(false);
      setEditingTask(null);
      toast({
        title: 'Success',
        description: 'Task updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update task',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      const updatedTask = await taskApi.toggleTaskCompletion(id);
      setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to toggle task',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTask = async () => {
    if (!deletingTask) return;
    
    try {
      setActionLoading(true);
      await taskApi.deleteTask(deletingTask.id);
      setTasks(tasks.filter(t => t.id !== deletingTask.id));
      setIsDeleteDialogOpen(false);
      setDeletingTask(null);
      toast({
        title: 'Success',
        description: 'Task deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete task',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setDeletingTask(task);
    setIsDeleteDialogOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Task Manager</h1>
          <p className="text-muted-foreground">Organize your work and life, finally.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{stats.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="bg-card border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex-1 sm:flex-initial"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Task
          </Button>

          <div className="flex gap-2 flex-1">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex-1"
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
              className="flex-1"
            >
              <Circle className="h-4 w-4 mr-2" />
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              className="flex-1"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Done
            </Button>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-card border rounded-lg p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">
                {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
              </div>
              <p className="text-sm text-muted-foreground">
                {filter === 'all' ? 'Create your first task to get started!' : 'Try a different filter'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <TaskForm
        task={editingTask}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        isLoading={actionLoading}
      />

      <DeleteConfirmDialog
        task={deletingTask}
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingTask(null);
        }}
        onConfirm={handleDeleteTask}
        isLoading={actionLoading}
      />
    </div>
  );
};

export default Index;
