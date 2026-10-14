const ARCHIVE_DESCRIPTION =
  'Apakah Anda yakin ingin mengarsipkan catatan ini? Anda dapat menemukannya di bagian arsip.';

const UNARCHIVE_DESCRIPTION =
  'Apakah Anda yakin ingin membatalkan arsip catatan ini? Catatan akan dikembalikan ke daftar catatan utama.';

function ArchiveConfirmModal({ archived, description, onConfirm, onCancel }) {
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
          {archived ? 'Batal Arsip Catatan' : 'Arsipkan Catatan'}
        </h2>
        <p className="text-text-muted text-sm">
          {description ??
            (archived ? UNARCHIVE_DESCRIPTION : ARCHIVE_DESCRIPTION)}
        </p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-all"
          >
            {archived ? 'Batal Arsip' : 'Arsipkan'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArchiveConfirmModal;
