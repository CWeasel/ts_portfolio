import type { ModelSchema } from "@/types/admin-types";
import { MultiSelectField } from "./multi-select-component";

interface Props<T> {
  schema: ModelSchema<T>;
  data?: T | null;
  onSubmit?: (data: Partial<T>) => void;
  onCancel?: () => void;
}

export default function FormComponent<T extends { id: string }>({
  schema,
  data = null,
  onSubmit,
  onCancel,
}: Props<T>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSubmit) return;

    const formData = new FormData(event.currentTarget);
    const submitData: Partial<T> = {};

    console.log("Form data entries:", Array.from(formData.entries()));

    // Preserve the id if editing an existing item
    if (data?.id) {
      submitData["id" as keyof T] = data.id as T[keyof T];
    }

    schema.fields.forEach((field) => {
      if (field.type === "select" && field.multiple) {
        const values = formData.getAll(field.key).map(String);
        submitData[field.key as keyof T] = values as T[keyof T];
        return;
      }
      const value = formData.get(field.key);
      if (value !== null) {
        submitData[field.key as keyof T] = value as T[keyof T];
      }
    });

    onSubmit(submitData);
  };
  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      {schema.fields.map((field) => {
        if (field.type === "select" && field.multiple) {
          return <MultiSelectField key={field.key} field={field} item={data} />;
        }
        return (
          <div className="mb-4" key={field.key}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.key}
            >
              {field.label}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={field.key}
              name={field.key}
              type={field.type === "number" ? "number" : "text"}
              required={field.required}
              defaultValue={data?.[field.key as keyof T]?.toString() || ""}
            />
          </div>
        );
      })}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {data ? "Update" : "Create"}
      </button>
      <button
        type="button"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
