import { cn } from '../../lib/utils';

const variantClasses = {
  'todo': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  'in-progress': 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
  'done': 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300',
  'low': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  'medium': 'bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300',
  'high': 'bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-300',
} as const;

const defaultLabels: Record<BadgeVariant, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
};

export type BadgeVariant = keyof typeof variantClasses;

export interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full',
        variantClasses[variant],
        className,
      )}
    >
      {children ?? defaultLabels[variant]}
    </span>
  );
}
