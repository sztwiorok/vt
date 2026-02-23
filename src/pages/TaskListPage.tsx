import { useState } from 'react';
import type { Task, TaskStatus, TaskFilters as TaskFiltersType, TaskSort, CreateTaskInput } from '../types/task';
import { Header } from '../components/layout/Header';
import { PageLayout } from '../components/layout/PageLayout';
import { TaskFilters } from '../components/task/TaskFilters';
import { TaskList } from '../components/task/TaskList';
import { TaskForm } from '../components/task/TaskForm';

interface TaskListPageProps {
  tasks: Task[];
  filters: TaskFiltersType;
  sort: TaskSort;
  onFiltersChange: (filters: TaskFiltersType) => void;
  onSortChange: (sort: TaskSort) => void;
  onAddTask: (input: CreateTaskInput) => void;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskListPage({
  tasks,
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onAddTask,
  onDeleteTask,
  onStatusChange,
}: TaskListPageProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header onAddTask={() => setShowForm(true)} />
      <PageLayout>
        <div className="space-y-6">
          <TaskFilters
            filters={filters}
            sort={sort}
            onFiltersChange={onFiltersChange}
            onSortChange={onSortChange}
          />
          <TaskList
            tasks={tasks}
            onDelete={onDeleteTask}
            onStatusChange={onStatusChange}
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg mx-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">New Task</h2>
              <TaskForm
                onSubmit={(data) => {
                  onAddTask(data);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </PageLayout>
    </>
  );
}
