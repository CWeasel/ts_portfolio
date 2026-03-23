export default function ConfirmDelete<T extends { name: string }>({
  item,
  onConfirm,
  onCancel,
}: {
  item: T;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <div className="border border-red-500 p-4 bg-red-5">
      <p className="mb-4">
        Are you sure you want to delete <strong>{item.name}</strong>?
      </p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        onClick={onConfirm}
      >
        Yes, delete
      </button>
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}