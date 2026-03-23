import type { ModelSchema } from "@/types/admin-types";

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

    schema.fields.forEach((field) => {
      const value = formData.get(field.key);
      if (value !== null) {
        submitData[field.key as keyof T] = value.toString() as T[keyof T];
      }
    });

    onSubmit(submitData);
  };
  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      {schema.fields.map((field) => (
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
            type="text"
            defaultValue={data?.[field.key as keyof T]?.toString() || ""}
          />
        </div>
      ))}
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
