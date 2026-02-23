import type { Meta, StoryObj } from '@storybook/react';
import { TaskForm } from './TaskForm';
import type { Task } from '../../types/task';

const existingTask: Task = {
  id: '1',
  title: 'Implement authentication flow',
  description: 'Add login, signup, and password reset functionality using JWT tokens.',
  status: 'in-progress',
  priority: 'high',
  createdAt: '2025-01-15T10:30:00Z',
  updatedAt: '2025-01-16T14:00:00Z',
};

const meta: Meta<typeof TaskForm> = {
  title: 'Task/TaskForm',
  component: TaskForm,
  args: {
    onSubmit: (data) => console.log('Submit:', data),
    onCancel: () => console.log('Cancel'),
  },
};

export default meta;
type Story = StoryObj<typeof TaskForm>;

export const CreateMode: Story = {
  args: {},
};

export const EditMode: Story = {
  args: {
    initialData: existingTask,
  },
};
