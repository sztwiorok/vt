import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout,
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        Page content goes here
      </div>
    ),
  },
};
