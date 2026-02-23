import { cn } from '../../lib/utils';

const variantClasses = {
  'todo': 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-primary-100 text-primary-700',
  'done': 'bg-success-100 text-success-700',
  'low': 'bg-gray-100 text-gray-600',
  'medium': 'bg-warning-100 text-warning-700',
  'high': 'bg-danger-100 text-danger-700',
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
