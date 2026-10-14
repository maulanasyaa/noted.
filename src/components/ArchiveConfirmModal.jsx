import useLanguage from '../hooks/useLanguage';

function ArchiveConfirmModal({
  archived,
  description,
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  const { t } = useLanguage();

  const fallbackDescription = archived
    ? t('unarchive_description')
    : t('archive_description');

  return (
    <div
      onClick={isLoading ? undefined : onCancel}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl text-text-primary font-bold">
          {archived ? t('unarchive_title_action') : t('archive_title_action')}
        </h2>
        <p className="text-text-muted text-sm">
          {description ?? fallbackDescription}
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="bg-surface-hover text-text-primary px-4 py-2 rounded-lg hover:bg-primary-soft transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t('button_cancel')}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-primary text-text-on-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? t('button_processing')
              : archived
                ? t('button_unarchive')
                : t('button_archive')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArchiveConfirmModal;
