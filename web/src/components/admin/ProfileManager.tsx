import React, { useState } from "react";
import type { ModelSchema } from "../../types/admin";
import { useResource } from "../../hooks/useResource";
import { createCrudApi } from "../../api/createCrudApi";

interface Props<T> {
  schema: ModelSchema<T>;
}

export function ProfileManager({ schema }: Props<T>) {
  const { items, loading, error, reload, create, update, remove } =
    useResource<T>(createCrudApi(schema.endpoint) as any);
  const [editing, setEditing] = useState<T | null>(null);

  const handleSave = async (item: Partial<T>) => {
    // Implement create/update logic here
    const isEdit = "id" in item && item.id;
    if (isEdit) {
      await update(item.id as string, item);
    } else {
    //   await create(item);
    }
    console.log("Saving item:", item);
    setEditing(null);
  };

  return (
    <div className="admin-container">
      <h1>Manage {schema.name}</h1>
      <table className="admin-table">
        <thead>
          <tr>
            {schema.fields.map((f) => (
              <th key={f.key}>{f.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr key={items.id}>
            {schema.fields.map((f) => (
              <td key={f.key}>{String(items[f.key as keyof T])}</td>
            ))}
            <td>
              <button onClick={() => setEditing(items)}>Edit</button>
            </td>
          </tr>
        </tbody>
      </table>

      {editing && (
        <div className="admin-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
                handleSave(editing);
            }}
          >
            {schema.fields.map((f) => (
              <div className="admin-form-item" key={f.key}>
                <label htmlFor={f.key}>{f.label}</label>
                <input
                  type={f.type}
                  value={(editing[f.key as keyof T] as any) || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, [f.key]: e.target.value })
                  }
                />
              </div>
            ))}
            <button type="submit">Save</button>
            <button onClick={() => setEditing(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
