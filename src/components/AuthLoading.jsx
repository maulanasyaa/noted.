import { NotebookPen } from 'lucide-react';

function AuthLoading() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-soft/60 blur-2xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#EAE1D6]/70 blur-2xl"
      />

      {/* Content */}
      <section className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo animation */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary-soft" />

          <div className="absolute inset-0 animate-auth-orbit">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary" />
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface shadow-sm">
            <NotebookPen
              size={30}
              strokeWidth={1.7}
              className="text-icon"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Noted.
        </h1>

        <p className="mt-3 text-base font-medium text-text-secondary">
          Checking your space...
        </p>

        <p className="mt-1.5 max-w-xs text-sm leading-6 text-text-muted">
          Making sure everything is ready for your thoughts.
        </p>

        {/* Loading dots */}
        <div className="mt-6 flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-primary animate-auth-dot [animation-delay:0ms]" />
          <span className="h-2 w-2 rounded-full bg-primary animate-auth-dot [animation-delay:160ms]" />
          <span className="h-2 w-2 rounded-full bg-primary animate-auth-dot [animation-delay:320ms]" />
        </div>
      </section>
    </main>
  );
}

export default AuthLoading;
