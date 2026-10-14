import useLanguage from '../hooks/useLanguage';

function DeleteConfirmModal({ onConfirm, onCancel, isLoading = false }) {
  const { t } = useLanguage();

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
          {t('delete_title')}
        </h2>
        <p className="text-text-muted text-sm">{t('delete_description')}</p>
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
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? t('button_processing') : t('button_delete')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
