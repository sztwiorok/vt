import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { TaskDetail } from './TaskDetail';
import type { Task } from '../../types/task';

const sampleTask: Task = {
  id: '1',
  title: 'Implement authentication flow',
  description: 'Add login, signup, and password reset functionality using JWT tokens.\n\nRequirements:\n- Email/password login\n- OAuth support\n- Password reset via email',
  status: 'in-progress',
  priority: 'high',
  createdAt: '2025-01-15T10:30:00Z',
  updatedAt: '2025-01-16T14:00:00Z',
};

const meta: Meta<typeof TaskDetail> = {
  title: 'Task/TaskDetail',
  component: TaskDetail,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  args: {
    onDelete: (id) => console.log('Delete:', id),
    onEdit: () => console.log('Edit'),
    onStatusChange: (id, status) => console.log('Status change:', id, status),
  },
};

export default meta;
type Story = StoryObj<typeof TaskDetail>;

export const Default: Story = {
  args: {
    task: sampleTask,
  },
};

export const TodoTask: Story = {
  args: {
    task: { ...sampleTask, status: 'todo', priority: 'low' },
  },
};

export const DoneTask: Story = {
  args: {
    task: { ...sampleTask, status: 'done', priority: 'medium' },
  },
};

export const NoDescription: Story = {
  args: {
    task: { ...sampleTask, description: '' },
  },
};
