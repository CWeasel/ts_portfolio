"use client";

import FormComponent from "./form-component";
import TableComponent from "./table-component";
import type { ModelSchema } from "@/types/admin-types";
import { useResource } from "@/hooks/use-admin";
import { useState } from "react";

interface Props<T> {
  schema: ModelSchema<T>;
}

export default function AdminProfileSection<T extends { id: string }>({
  schema,
}: Props<T>) {
  const { items, loading, error, update } = useResource<T>(schema.endpoint);
  const [editing, setEditing] = useState<T | null>(null);

  const handleSave = async (data: Partial<T>) => {
    if (data.id) {
      await update(data.id, data);
    }
    setEditing(null);
  };
  const handleCancel = () => setEditing(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  
  return (
    <section
      id={`admin-${schema.name}`}
      className="border-t border-border py-24 md:py-32"
    >
      <TableComponent schema={schema} data={items} setEditing={setEditing} />
      {editing && (
        <FormComponent
          schema={schema}
          data={editing}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      )}
    </section>
  );
}
