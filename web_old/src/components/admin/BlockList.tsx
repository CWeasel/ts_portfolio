import type { Block } from "../../types";
import { useState } from "react";
import { updateBlock } from "../../api";

interface Props {
  blocks: Block[];
}

export function BlockList({ blocks }: Props) {
  const ordered = [...blocks].sort((a, b) => a.position - b.position);

  return (
    <div>
      {ordered.map((block) => (
        <div
          key={block.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "0.75rem",
            background: "#fafafa",
          }}
        >
          <BlockRow block={block} />
        </div>
      ))}
    </div>
  );
}

function BlockRow({ block }: { block: Block }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(JSON.stringify(block.data, null, 2));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);

      const parsed = JSON.parse(draft);
      await updateBlock(block.id, parsed);
      window.location.reload();
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message || "Invalid JSON.");
    } finally {
      setSaving(false);
    }
  }

  if (isEditing) {
    return (
      <div>
        <div style={{ marginBottom: "0.5rem" }}>
          <strong>{block.type}</strong>
        </div>

        <textarea
          style={{
            width: "100%",
            minHeight: "180px",
            fontFamily: "monospace",
          }}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />

        {error && (
          <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>
        )}

        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={() => {
              setDraft(JSON.stringify(block.data, null, 2));
              setIsEditing(false);
              setError(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>{block.type}</strong>{" "}
        <small style={{ color: "#666" }}>(position {block.position})</small>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button disabled>↑</button>
        <button disabled>↓</button>
      </div>
    </div>
  );
}
