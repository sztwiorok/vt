import type { TaskFilters as TaskFiltersType, TaskSort } from '../../types/task';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export interface TaskFiltersProps {
  filters: TaskFiltersType;
  sort: TaskSort;
  onFiltersChange: (filters: TaskFiltersType) => void;
  onSortChange: (sort: TaskSort) => void;
}

const statusFilterOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityFilterOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const sortFieldOptions = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' },
  { value: 'priority', label: 'Priority' },
];


export function TaskFilters({ filters, sort, onFiltersChange, onSortChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <Input
        label="Search"
        value={filters.searchQuery}
        onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
        placeholder="Search tasks..."
      />

      <Select
        label="Status"
        options={statusFilterOptions}
        value={filters.status}
        onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as TaskFiltersType['status'] })}
      />

      <Select
        label="Priority"
        options={priorityFilterOptions}
        value={filters.priority}
        onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value as TaskFiltersType['priority'] })}
      />

      <Select
        label="Sort By"
        options={sortFieldOptions}
        value={sort.field}
        onChange={(e) => onSortChange({ ...sort, field: e.target.value as TaskSort['field'] })}
      />

      <Button
        variant="ghost"
        size="md"
        onClick={() => onSortChange({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
      >
        {sort.direction === 'asc' ? 'Asc' : 'Desc'}
      </Button>
    </div>
  );
}
