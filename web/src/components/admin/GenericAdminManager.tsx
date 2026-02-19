import { useState, useEffect } from "react";
import type { ModelSchema } from "../../types/admin";
import { useResource } from "../../hooks/useResource";
import { createCrudApi } from "../../api/createCrudApi";
import { ConfirmDelete } from "./ConfirmDelete";
import { GenericFormManager } from "./GenericFormManager";

interface Props<T> {
  schema: ModelSchema<T>;
}

interface ResolvedItem<T> extends Record<string, any> {
  __resolved?: Record<string, string>;
}

export function GenericAdminManager<T>({
  schema
}: Props<T>) {
  const { items, loading, error, reload, create, update, remove } =
    useResource<T>(createCrudApi(schema.endpoint) as any);
  const [editing, setEditing] = useState<T | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);
  const [resolvedItems, setResolvedItems] = useState<ResolvedItem<T>[]>([]);

  // Fetch and resolve select field references
  useEffect(() => {
    const resolveItems = async () => {
      const resolved = await Promise.all(
        items.map(async (item) => {
          const resolvedItem: ResolvedItem<T> = { ...item, __resolved: {} };

          // Find all select fields and resolve their references
          for (const field of schema.fields) {
            if (field.type === "select" && field.optionsEndpoint) {
              const fieldValue = item[field.key as keyof T];
              if (fieldValue) {
                try {
                  const response = await fetch(field.optionsEndpoint);
                  if (response.ok) {
                    const options = await response.json();
                    const selectedOption = options.find(
                      (opt: any) => opt.id === fieldValue
                    );
                    if (selectedOption) {
                      const labelKey = field.optionLabelKey || "name";
                      resolvedItem.__resolved![field.key] =
                        selectedOption[labelKey] || selectedOption.id;
                    }
                  }
                } catch (err) {
                  console.error(
                    `Failed to resolve ${field.key} for item`,
                    err
                  );
                }
              }
            }
          }

          return resolvedItem;
        })
      );

      setResolvedItems(resolved);
    };

    if (items.length > 0) {
      resolveItems();
    } else {
      setResolvedItems([]);
    }
  }, [items, schema.fields]);


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
          {resolvedItems.map((item) => (
            <tr key={item.id}>
              {schema.fields.map((f) => {
                const displayValue =
                  f.type === "select" && item.__resolved?.[f.key]
                    ? item.__resolved[f.key]
                    : String(item[f.key as keyof T]);
                return <td key={f.key}>{displayValue}</td>;
              })}
              <td>
                <button onClick={() => setEditing(item as T)}>Edit</button>
              </td>
              <td>
                <button onClick={() => setDeleting(item as T)}>Delete</button>
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

