import { Moon, Sun } from 'lucide-react';

import useTheme from '../hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      role="group"
      aria-label="Pilihan tema"
      className="relative grid h-10 w-19 grid-cols-2 items-center rounded-full border border-border bg-surface-hover p-0.75"
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-0.75 top-0.75 z-0 size-8 rounded-full bg-background shadow-sm ring-1 ring-black/5 transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-8.5' : 'translate-x-0'
        }`}
      />

      {/* Light */}
      <button
        type="button"
        onClick={() => {
          if (isDark) toggleTheme();
        }}
        aria-label="Tema terang"
        aria-pressed={!isDark}
        className={`relative z-10 flex size-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          !isDark ? 'text-icon' : 'text-text-muted'
        }`}
      >
        <Sun size={21} strokeWidth={1.8} />
      </button>

      {/* Dark */}
      <button
        type="button"
        onClick={() => {
          if (!isDark) toggleTheme();
        }}
        aria-label="Tema gelap"
        aria-pressed={isDark}
        className={`relative z-10 flex size-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isDark ? 'text-icon' : 'text-text-muted'
        }`}
      >
        <Moon size={21} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export default ThemeToggle;
