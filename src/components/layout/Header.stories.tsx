import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  args: {
    onAddTask: () => console.log('Add task'),
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};

export const WithDarkToggle: Story = {
  args: {
    isDark: false,
    onToggleDark: () => console.log('Toggle dark mode'),
  },
};
