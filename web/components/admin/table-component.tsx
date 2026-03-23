import type { ModelSchema } from "@/types/admin-types";

export default function TableComponent<T extends { id: string }>({
  schema,
  data,
  setEditing,
  setDeleting
}: {
  schema: ModelSchema<T>;
  data: T[];
  setEditing: (item: T) => void;
  setDeleting: (item: T) => void;
}) {
  return (
    <table className="w-full table-auto mb-6">
      <thead>
        <tr>
          {schema.fields.map((field) => (
            <th className="border border-border px-4 py-2" key={field.key}>
              {field.label}
            </th>
          ))}
          <th className="border border-border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {schema.fields.map((field) => (
              <td className="border border-border px-4 py-2" key={field.key}>
                {item[field.key as keyof T]?.toString() || "-"}
              </td>
            ))}
            <td className="border border-border px-4 py-2">
              <button
                className="text-blue-500 hover:underline mr-2"
                onClick={() => setEditing(item)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => setDeleting(item)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
