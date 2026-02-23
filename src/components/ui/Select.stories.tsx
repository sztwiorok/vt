import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const sampleOptions = [
  { value: '', label: 'Select an option...' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  args: {
    options: sampleOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Status',
  },
};

export const WithError: Story = {
  args: {
    label: 'Status',
    error: 'Please select a status',
  },
};

export const WithOptions: Story = {
  args: {
    label: 'Priority',
    options: [
      { value: '', label: 'Select priority...' },
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
};
