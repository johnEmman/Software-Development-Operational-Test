import { Task } from '@/services/taskApi';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  isLoading?: boolean;
}

export const TaskItem = ({ task, onToggle, onEdit, onDelete, isLoading }: TaskItemProps) => {
  return (
    <div
      className={cn(
        'group flex items-start gap-4 p-4 rounded-lg border bg-card transition-all duration-200',
        'hover:shadow-md hover:border-primary/20',
        task.completed && 'opacity-60'
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        disabled={isLoading}
        className="mt-1"
      />
      
      <div className="flex-1 min-w-0">
        <h3
          className={cn(
            'font-medium text-foreground transition-all',
            task.completed && 'line-through text-muted-foreground'
          )}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={cn(
              'mt-1 text-sm text-muted-foreground',
              task.completed && 'line-through'
            )}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(task)}
          disabled={isLoading}
          className="h-8 w-8"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task)}
          disabled={isLoading}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
