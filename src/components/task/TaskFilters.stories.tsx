import type { Meta, StoryObj } from '@storybook/react';
import { TaskFilters } from './TaskFilters';

const meta: Meta<typeof TaskFilters> = {
  title: 'Task/TaskFilters',
  component: TaskFilters,
  args: {
    filters: { status: 'all', priority: 'all', searchQuery: '' },
    sort: { field: 'createdAt', direction: 'desc' },
    onFiltersChange: (filters) => console.log('Filters:', filters),
    onSortChange: (sort) => console.log('Sort:', sort),
  },
};

export default meta;
type Story = StoryObj<typeof TaskFilters>;

export const Default: Story = {};

export const WithActiveFilters: Story = {
  args: {
    filters: { status: 'in-progress', priority: 'high', searchQuery: 'auth' },
    sort: { field: 'title', direction: 'asc' },
  },
};
