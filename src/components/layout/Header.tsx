import { Button } from '../ui/Button';

export interface HeaderProps {
  onAddTask: () => void;
}

export function Header({ onAddTask }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900">VT Tasks</h1>
        <Button onClick={onAddTask}>Add Task</Button>
      </div>
    </header>
  );
}
