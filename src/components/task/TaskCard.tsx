import { Link } from 'react-router';
import type { Task, TaskStatus } from '../../types/task';
import { formatDate } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';

export interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-3">
        <Link
          to={`/tasks/${task.id}`}
          className="text-base font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
        >
          {task.title}
        </Link>
        <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center gap-2 mb-3">
        <Badge variant={task.status} />
        <Badge variant={task.priority} />
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-500">{formatDate(task.createdAt)}</span>
        <Select
          options={statusOptions}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="w-auto text-xs"
        />
      </div>
    </div>
  );
}
