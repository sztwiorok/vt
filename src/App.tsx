import { BrowserRouter, Routes, Route } from 'react-router';
import { useTasks } from './hooks/useTasks';
import { useDarkMode } from './hooks/useDarkMode';
import { TaskListPage } from './pages/TaskListPage';
import { TaskDetailPage } from './pages/TaskDetailPage';

export default function App() {
  const {
    filteredTasks,
    filters,
    sort,
    setFilters,
    setSort,
    addTask,
    updateTask,
    deleteTask,
    getTask,
  } = useTasks();

  const [isDark, toggleDark] = useDarkMode();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TaskListPage
              tasks={filteredTasks}
              filters={filters}
              sort={sort}
              onFiltersChange={setFilters}
              onSortChange={setSort}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
              onStatusChange={(id, status) => updateTask({ id, status })}
              isDark={isDark}
              onToggleDark={toggleDark}
            />
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <TaskDetailPage
              getTask={getTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onStatusChange={(id, status) => updateTask({ id, status })}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
