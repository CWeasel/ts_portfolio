import { useForm, FormProvider } from "react-hook-form";
import type { ModelSchema } from "../../types/admin";
import { SelectResourceField } from "./SelectResourceField";

interface Props<T> {
  schema: ModelSchema<T>;
  initialData?: T | null;
  onSubmit: (data: Partial<T>) => Promise<void>;
  onCancel: () => void;
}

export function GenericFormManager<T>({
  schema,
  initialData = null,
  onSubmit,
  onCancel,
}: Props<T>) {
  // Helper function to format date values for input fields
  const formatDateValue = (value: any): string => {
    if (!value) return "";
    // If it's an ISO string, extract just the date part (YYYY-MM-DD)
    if (typeof value === "string" && value.includes("T")) {
      return value.split("T")[0];
    }
    return String(value);
  };

  // Map null values to empty string for form fields and format dates
  const normalizedInitialData = initialData
    ? Object.fromEntries(
        Object.entries(initialData).map(([k, v]) => {
          if (v === null) {
            return [k, ""];
          }
          // Find if this field is a date field
          const field = schema.fields.find((f) => f.key === k);
          if (field?.type === "date") {
            return [k, formatDateValue(v)];
          }
          return [k, v];
        }),
      )
    : {};

  const methods = useForm<T>({
    defaultValues: normalizedInitialData as T,
  });

  const { register, handleSubmit } = methods;

  // For checkboxes, ensure unchecked sends false
  const handleFormSubmit = (data: Partial<T>) => {
    const fixedData = { ...data };
    schema.fields.forEach((f) => {
      if (f.type === "boolean") {
        // If not present in data, set to false
        if (typeof fixedData[f.key as keyof T] === "undefined") {
          (fixedData as any)[f.key] = false;
        }
      }
    });
    return onSubmit(fixedData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>{initialData ? `Edit ${schema.name}` : `New ${schema.name}`}</h2>

        {schema.fields.map((f) => {
          if (f.type === "select") {
            return (
              <SelectResourceField
                key={f.key}
                field={f}
                optionLabelKey={f.optionLabelKey}
              />
            );
          }
          if (f.type === "boolean") {
            return (
              <div key={f.key}>
                <label>
                  <input
                    type="checkbox"
                    {...register(f.key as any)}
                    // Ensure checkbox is checked/unchecked based on value
                    defaultChecked={Boolean(
                      (normalizedInitialData as any)[f.key],
                    )}
                  />
                  {f.label}
                </label>
              </div>
            );
          }
          return (
            <div key={f.key}>
              <label>{f.label}</label>
              <input
                {...register(f.key as any, { required: f.required })}
                type={f.type}
              />
            </div>
          );
        })}
        <div>
          <button type="submit">{initialData ? "Update" : "Create"}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
