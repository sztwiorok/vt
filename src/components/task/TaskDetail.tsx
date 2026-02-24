import { Link } from 'react-router';
import type { Task, TaskStatus } from '../../types/task';
import { formatDate } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';

export interface TaskDetailProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: () => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

export function TaskDetail({ task, onDelete, onEdit, onStatusChange }: TaskDetailProps) {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4 dark:text-gray-400 dark:hover:text-gray-200"
      >
        &larr; Back to tasks
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{task.title}</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="secondary" size="sm" onClick={onEdit}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
              Delete
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Badge variant={task.status} />
          <Badge variant={task.priority} />
        </div>

        {task.description && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{task.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Created:</span>{' '}
            {formatDate(task.createdAt)}
          </div>
          <div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Updated:</span>{' '}
            {formatDate(task.updatedAt)}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Change Status
          </label>
          <Select
            options={statusOptions}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
            className="w-48"
          />
        </div>
      </div>
    </div>
  );
}
