"use client";

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md">

        <h2 className="text-xl font-bold text-slate-900">
          Delete Room?
        </h2>

        <p className="text-slate-500 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="flex-1 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default DeleteModal;