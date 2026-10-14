import useLanguage from '../hooks/useLanguage';

function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t('language_toggle_label')}
      className="flex items-center gap-1 rounded-full border border-border bg-surface-hover px-3 py-2 text-xs font-semibold text-text-primary shadow-sm transition-all hover:bg-primary-soft focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <span className={language === 'en' ? 'text-icon' : 'text-text-muted'}>
        EN
      </span>
      <span className="text-text-muted">/</span>
      <span className={language === 'id' ? 'text-icon' : 'text-text-muted'}>
        ID
      </span>
    </button>
  );
}

export default LanguageToggle;
