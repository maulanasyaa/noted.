import useLanguage from '../hooks/useLanguage';

function ArchiveConfirmModal({ archived, description, onConfirm, onCancel }) {
  const { t } = useLanguage();

  const fallbackDescription = archived
    ? t('unarchive_description')
    : t('archive_description');

  return (
    <div
      onClick={onCancel}
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
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
          >
            {t('button_cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-all"
          >
            {archived ? t('button_unarchive') : t('button_archive')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArchiveConfirmModal;
