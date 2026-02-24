import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { Task, TaskStatus, CreateTaskInput } from '../types/task';
import { PageLayout } from '../components/layout/PageLayout';
import { TaskDetail } from '../components/task/TaskDetail';
import { TaskForm } from '../components/task/TaskForm';

interface TaskDetailPageProps {
  getTask: (id: string) => Task | undefined;
  onUpdateTask: (input: { id: string } & Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onDeleteTask: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskDetailPage({
  getTask,
  onUpdateTask,
  onDeleteTask,
  onStatusChange,
}: TaskDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const task = id ? getTask(id) : undefined;

  if (!task) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Task not found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">The task you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            &larr; Back to tasks
          </button>
        </div>
      </PageLayout>
    );
  }

  if (isEditing) {
    return (
      <PageLayout>
        <div className="max-w-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Edit Task</h2>
          <TaskForm
            initialData={task}
            onSubmit={(data: CreateTaskInput) => {
              onUpdateTask({ id: task.id, ...data });
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <TaskDetail
        task={task}
        onDelete={(taskId) => {
          onDeleteTask(taskId);
          navigate('/');
        }}
        onEdit={() => setIsEditing(true)}
        onStatusChange={onStatusChange}
      />
    </PageLayout>
  );
}
