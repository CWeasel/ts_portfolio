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
  // Map null values to empty string for form fields
  const normalizedInitialData = initialData
    ? Object.fromEntries(
        Object.entries(initialData).map(([k, v]) => [k, v === null ? "" : v]),
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
