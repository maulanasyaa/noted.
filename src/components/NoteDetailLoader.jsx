import { Sparkles } from 'lucide-react';

import useLanguage from '../hooks/useLanguage';

function NoteDetailLoader() {
  const { t } = useLanguage();
  return (
    <main
      role="status"
      aria-label={t('note_loading_label')}
      aria-busy="true"
      className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* Cute floating illustration */}
      <div className="relative mb-8 flex h-48 w-48 items-center justify-center">
        {/* Soft background blob */}
        <div className="absolute inset-5 rounded-[40%] bg-primary-soft animate-blob" />

        {/* Floating notebook */}
        <div className="relative z-10 flex h-28 w-24 -rotate-6 items-center justify-center rounded-2xl border-2 border-[#C8B49D] bg-[#FBF8F3] shadow-lg animate-notebook">
          <div className="absolute left-3 top-0 h-full w-1 border-l-2 border-dashed border-[#C8B49D]" />

          <div className="ml-3 flex flex-col gap-3">
            <div className="h-2 w-12 rounded-full bg-[#C8B49D]" />
            <div className="h-2 w-10 rounded-full bg-[#E2D9CF]" />
            <div className="h-2 w-12 rounded-full bg-[#E2D9CF]" />
            <div className="mt-1 h-5 w-5 rounded-full bg-[#DCE0D3]" />
          </div>
        </div>

        {/* Floating sparkles */}
        <Sparkles
          size={24}
          className="absolute right-5 top-7 animate-sparkle text-[#A18A6F]"
        />

        <Sparkles
          size={17}
          className="absolute bottom-8 left-5 animate-sparkle-delayed text-[#899078]"
        />

        {/* Tiny decorative dots */}
        <span className="absolute right-7 bottom-12 h-3 w-3 rounded-full bg-[#D8BFA4] animate-float-slow" />
        <span className="absolute left-8 top-10 h-2 w-2 rounded-full bg-[#899078] animate-float-slow" />
      </div>

      {/* Loading text */}
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
          {t('note_loading_title')}
          <span className="animate-dots">...</span>
        </h2>

        <p className="mt-3 text-sm text-text-secondary">
          {t('note_loading_description')}
        </p>
      </div>

      {/* Cute loading indicator */}
      <div className="mt-7 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#A18A6F] animate-loading-dot [animation-delay:0ms]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#A18A6F] animate-loading-dot [animation-delay:180ms]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#A18A6F] animate-loading-dot [animation-delay:360ms]" />
      </div>

      <span className="sr-only">{t('note_loading_sr')}</span>
    </main>
  );
}

export default NoteDetailLoader;
