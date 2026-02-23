export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskInput = Pick<Task, 'title' | 'description' | 'status' | 'priority'>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt'>> & { id: string };

export interface TaskFilters {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  searchQuery: string;
}

export interface TaskSort {
  field: 'title' | 'status' | 'priority' | 'createdAt';
  direction: 'asc' | 'desc';
}
