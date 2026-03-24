"use client"

import TableComponent from "./table-component";
import FormComponent from "./form-component";
import type { ModelSchema } from "@/types/admin-types";
import { useResource } from "@/hooks/use-admin";
import { useState } from "react";
import ConfirmDelete from "./confirm-delete-component";

interface Props<T> {
  schema: ModelSchema<T>;
}

export default function AdminSection<T extends { id: string; name: string }>({
  schema,
}: Props<T>) {
  const { items, loading, error, create, update, remove } = useResource<T>(
    schema.endpoint,
  );
  const [editing, setEditing] = useState<T | null>(null);
  const [deleting, setDeleting] = useState<T | null>(null);

  if (loading) return <p>{`Loading ${schema.name}...`}</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Add handlers
  const handleSubmit = async (data: Partial<T>) => {
    console.log("Submitting skill data:", data);
    if (data.id) {
      await update(data.id, data);
    } else {
      await create(data);
    }
    setEditing(null);
  };
  const handleCancel = () => setEditing(null);

  // Return
  return (
    <section
      id={`admin-${schema.name}`}
      className="border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <h1 className="text-2xl font-bold mb-6">
          Admin {schema.name} Management
        </h1>
        <div className="mb-4">
          {deleting && (
            <ConfirmDelete
              item={deleting}
              onConfirm={async () => {
                await remove(deleting.id);
                setDeleting(null);
              }}
              onCancel={() => setDeleting(null)}
            />
          )}
        </div>
        <TableComponent
          schema={schema}
          data={items}
          setEditing={setEditing}
          setDeleting={setDeleting}
        />
        <FormComponent
          schema={schema}
          data={editing}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </section>
  );
}
