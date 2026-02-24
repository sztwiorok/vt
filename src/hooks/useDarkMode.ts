import { useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'vt-dark-mode';

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(theme: Theme) {
  const el = document.documentElement;
  if (theme === 'dark') {
    el.classList.add('dark');
    el.classList.remove('light');
  } else if (theme === 'light') {
    el.classList.add('light');
    el.classList.remove('dark');
  } else {
    // system — remove both, let @media prefers-color-scheme take over
    el.classList.remove('dark', 'light');
  }
}

export function useDarkMode(): [boolean, () => void] {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEY, 'system');

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const isDark = theme === 'dark' || (theme === 'system' && getSystemDark());

  const toggleDark = useCallback(() => {
    setTheme((prev) => {
      if (prev === 'system') return getSystemDark() ? 'light' : 'dark';
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, [setTheme]);

  return [isDark, toggleDark];
}
