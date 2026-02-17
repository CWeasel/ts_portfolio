import React, { useState } from "react";
import type { ModelSchema } from "../../types/admin";
import { useResource } from "../../hooks/useResource";
import { createCrudApi } from "../../api/createCrudApi";
import { ConfirmDelete } from "./ConfirmDelete";
import { GenericFormManager } from "./GenericFormManager";

interface Props<T> {
  schema: ModelSchema<T>;
}

export function GenericAdminManager<T>({
  schema
}: Props<T>) {
  const { items, loading, error, reload, create, update, remove } =
    useResource<T>(createCrudApi(schema.endpoint) as any);
  const [editing, setEditing] = useState<T | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);


  const openCreateForm = () => {
    const emptyItem = schema.fields.reduce((acc, field) => {
      acc[field.key as keyof T] = (field.type === "number" ? 0 : "") as any;
      return acc;
    }, {} as T);
    setEditing(emptyItem);
  };

  const handleSave = async (item: Partial<T>) => {
    // Implement create/update logic here
    const isEdit = "id" in item && item.id;
    if (isEdit) {
      await update(item.id as string, item);
    } else {
      await create(item);
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
          {items.map((item) => (
            <tr key={item.id}>
              {schema.fields.map((f) => (
                <td key={f.key}>{String(item[f.key as keyof T])}</td>
              ))}
              <td>
                <button onClick={() => setEditing(item)}>Edit</button>
              </td>
              <td>
                <button onClick={() => setDeleting(item)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!editing && (
        <button onClick={() => openCreateForm()}>New</button>
      )}

      {editing && (
        <GenericFormManager
        schema={schema}
          initialData={editing}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
      {deleting && (
        <ConfirmDelete
          item={deleting}
          onConfirm={async () => {
            await remove(deleting.id);
            setDeleting(null);
          }}
          onCancel={() => setDeleting(null)}
        />
      ) }
    </div>
  );
}

