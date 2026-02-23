import { useState } from 'react';
import type { Task, CreateTaskInput, TaskStatus, TaskPriority } from '../../types/task';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: CreateTaskInput) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

export function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialData?.status ?? 'todo');
  const [priority, setPriority] = useState<TaskPriority>(initialData?.priority ?? 'medium');
  const [titleError, setTitleError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }

    setTitleError('');
    onSubmit({ title: title.trim(), description: description.trim(), status, priority });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (titleError) setTitleError('');
        }}
        placeholder="Enter task title"
        error={titleError}
      />

      <TextArea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        />

        <Select
          label="Priority"
          options={priorityOptions}
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}
