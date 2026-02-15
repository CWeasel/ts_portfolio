
export function ConfirmDelete({
  item,
  onConfirm,
  onCancel,
}: {
  item: any;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}) {
  return (
    <div style={{ border: "1px solid red", padding: "1rem" }}>
      <p>
        Are you sure you want to delete <strong>{item.name}</strong>?
      </p>
      <button onClick={onConfirm}>Yes, delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
