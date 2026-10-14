import { Loader2 } from 'lucide-react';

function NotesLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading notes"
      className="flex w-full flex-col items-center justify-center gap-4 py-20"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />

      <p className="text-sm font-medium text-text-muted">
        Loading your notes
        <span className="animate-dots">...</span>
      </p>

      <span className="sr-only">Please wait while your notes are being loaded.</span>
    </div>
  );
}

export default NotesLoading;
