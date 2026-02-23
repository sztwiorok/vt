import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['todo', 'in-progress', 'done', 'low', 'medium', 'high'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Todo: Story = {
  args: { variant: 'todo' },
};

export const InProgress: Story = {
  args: { variant: 'in-progress' },
};

export const Done: Story = {
  args: { variant: 'done' },
};

export const Low: Story = {
  args: { variant: 'low' },
};

export const Medium: Story = {
  args: { variant: 'medium' },
};

export const High: Story = {
  args: { variant: 'high' },
};

export const CustomLabel: Story = {
  args: {
    variant: 'done',
    children: 'Custom Label',
  },
};
