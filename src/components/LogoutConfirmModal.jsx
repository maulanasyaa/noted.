function LogoutConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-surface p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl text-text-primary font-bold mb-4">
          Logout Confirmation
        </h2>
        <p className="text-text-muted mb-6 text-md">
          Are you sure you want to logout? You will be redirected to the login
          page.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
