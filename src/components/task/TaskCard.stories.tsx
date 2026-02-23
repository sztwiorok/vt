import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { TaskCard } from './TaskCard';
import type { Task } from '../../types/task';

const sampleTask: Task = {
  id: '1',
  title: 'Implement authentication flow',
  description: 'Add login, signup, and password reset functionality using JWT tokens.',
  status: 'in-progress',
  priority: 'high',
  createdAt: '2025-01-15T10:30:00Z',
  updatedAt: '2025-01-16T14:00:00Z',
};

const meta: Meta<typeof TaskCard> = {
  title: 'Task/TaskCard',
  component: TaskCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  args: {
    onDelete: (id) => console.log('Delete:', id),
    onStatusChange: (id, status) => console.log('Status change:', id, status),
  },
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  args: {
    task: sampleTask,
  },
};

export const TodoTask: Story = {
  args: {
    task: { ...sampleTask, status: 'todo', priority: 'low', title: 'Write unit tests' },
  },
};

export const DoneTask: Story = {
  args: {
    task: { ...sampleTask, status: 'done', priority: 'medium', title: 'Setup CI pipeline' },
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      ...sampleTask,
      title: 'This is a very long task title that should be truncated when it exceeds the available space in the card',
    },
  },
};

export const NoDescription: Story = {
  args: {
    task: { ...sampleTask, description: '' },
  },
};
