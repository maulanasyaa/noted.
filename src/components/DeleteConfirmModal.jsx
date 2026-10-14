function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl text-text-primary font-bold">Hapus Catatan</h2>
        <p className="text-text-muted text-sm">
          Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak
          dapat dibatalkan.
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
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
