import { NotebookPen } from 'lucide-react';

import useLanguage from '../hooks/useLanguage';

function LoginLoadingModal() {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-[3px]"
      role="presentation"
    >
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label={t('login_loading_label')}
        className="w-full max-w-sm rounded-3xl border border-border bg-background px-8 py-9 text-center shadow-2xl animate-modal-in"
      >
        {/* Orbit animation */}
        <div className="relative mx-auto mb-7 flex h-28 w-28 items-center justify-center">
          {/* Static soft background */}
          <div className="absolute h-20 w-20 rounded-full bg-primary-soft/70" />

          {/* Orbit ring */}
          <div className="absolute h-24 w-24 rounded-full border border-dashed border-[#C8B49D] animate-orbit" />

          {/* Center icon */}
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D8CCBC] bg-[#FBF8F3] shadow-sm">
            <NotebookPen
              size={27}
              strokeWidth={1.8}
              className="text-icon"
              aria-hidden="true"
            />
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-orbit">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-[#899078]" />
          </div>

          <div className="absolute inset-0 animate-orbit-reverse">
            <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#B6A089]" />
          </div>

          <div className="absolute inset-0 animate-orbit-slow">
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#D8BFA4]" />
          </div>
        </div>

        {/* Loading message */}
        <h2 className="text-xl font-bold text-text-primary">
          {t('login_loading_title')}
        </h2>

        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {t('login_loading_description')}
        </p>

        {/* Progress indicator */}
        <div
          className="mx-auto mt-6 h-1.5 w-36 overflow-hidden rounded-full bg-primary-soft"
          aria-hidden="true"
        >
          <div className="h-full w-1/3 rounded-full bg-primary animate-progress" />
        </div>
      </div>
    </div>
  );
}

export default LoginLoadingModal;
