import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import { TaskList } from './TaskList';
import type { Task } from '../../types/task';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Implement authentication flow',
    description: 'Add login, signup, and password reset functionality.',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-16T14:00:00Z',
  },
  {
    id: '2',
    title: 'Design database schema',
    description: 'Create the ERD and define all tables for the application.',
    status: 'done',
    priority: 'medium',
    createdAt: '2025-01-10T08:00:00Z',
    updatedAt: '2025-01-12T16:30:00Z',
  },
  {
    id: '3',
    title: 'Write unit tests',
    description: 'Add tests for all utility functions and hooks.',
    status: 'todo',
    priority: 'low',
    createdAt: '2025-01-17T09:15:00Z',
    updatedAt: '2025-01-17T09:15:00Z',
  },
  {
    id: '4',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment.',
    status: 'todo',
    priority: 'high',
    createdAt: '2025-01-18T11:00:00Z',
    updatedAt: '2025-01-18T11:00:00Z',
  },
];

const meta: Meta<typeof TaskList> = {
  title: 'Task/TaskList',
  component: TaskList,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  args: {
    onDelete: (id) => console.log('Delete:', id),
    onStatusChange: (id, status) => console.log('Status change:', id, status),
  },
};

export default meta;
type Story = StoryObj<typeof TaskList>;

export const WithTasks: Story = {
  args: {
    tasks: sampleTasks,
  },
};

export const EmptyState: Story = {
  args: {
    tasks: [],
  },
};

export const SingleTask: Story = {
  args: {
    tasks: [sampleTasks[0]!],
  },
};
