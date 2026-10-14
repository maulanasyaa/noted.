import { Loader2 } from 'lucide-react';

import useLanguage from '../hooks/useLanguage';

function NotesLoading() {
  const { t } = useLanguage();
  const loadingText = t('notes_loading');
  const label = loadingText.replace(/\.+$/, '');

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className="flex w-full flex-col items-center justify-center gap-4 py-20"
    >
      <Loader2
        className="h-8 w-8 animate-spin text-primary"
        aria-hidden="true"
      />

      <p className="text-sm font-medium text-text-muted">
        {label}
        <span className="animate-dots">...</span>
      </p>

      <span className="sr-only">{loadingText}</span>
    </div>
  );
}

export default NotesLoading;
