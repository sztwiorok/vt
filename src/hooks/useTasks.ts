import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilters,
  TaskSort,
} from '../types/task';

const DEFAULT_FILTERS: TaskFilters = {
  status: 'all',
  priority: 'all',
  searchQuery: '',
};

const DEFAULT_SORT: TaskSort = {
  field: 'createdAt',
  direction: 'desc',
};

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('vt-tasks', []);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<TaskSort>(DEFAULT_SORT);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filters.status !== 'all') {
      result = result.filter((task) => task.status === filters.status);
    }

    if (filters.priority !== 'all') {
      result = result.filter((task) => task.priority === filters.priority);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      const aVal = a[sort.field];
      const bVal = b[sort.field];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sort.direction === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [tasks, filters, sort]);

  const addTask = useCallback(
    (input: CreateTaskInput) => {
      const now = new Date().toISOString();
      const task: Task = {
        ...input,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      setTasks((prev) => [...prev, task]);
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (input: UpdateTaskInput) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === input.id
            ? { ...task, ...input, updatedAt: new Date().toISOString() }
            : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const getTask = useCallback(
    (id: string): Task | undefined => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  return {
    tasks,
    filteredTasks,
    filters,
    sort,
    setFilters,
    setSort,
    addTask,
    updateTask,
    deleteTask,
    getTask,
  };
}
