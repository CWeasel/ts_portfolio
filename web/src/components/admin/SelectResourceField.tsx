import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldConfig } from "../../types/admin";

interface Option {
  id: string;
  [key: string]: any;
}

interface SelectResourceFieldProps {
  field: FieldConfig;
  optionLabelKey?: string;
}

export function SelectResourceField({
  field,
  optionLabelKey = "name",
}: SelectResourceFieldProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { control } = useFormContext();

  useEffect(() => {
    const fetchOptions = async () => {
      if (!field.optionsEndpoint) {
        setError("No options endpoint provided");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(field.optionsEndpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch options");
        }
        const data = await response.json();
        setOptions(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load options");
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [field.optionsEndpoint]);

  const selectedLabelKey = field.optionLabelKey || optionLabelKey;

  return (
    <div>
      <label>{field.label}</label>
      <Controller
        name={field.key as any}
        control={control}
        rules={{ required: field.required }}
        render={({ field: registerField }) => (
          <>
            <select
              {...registerField}
              disabled={loading}
              value={registerField.value || ""}
            >
              <option value="">
                {loading ? "Loading..." : `Select ${field.label}`}
              </option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option[selectedLabelKey] || option.id}
                </option>
              ))}
            </select>
            {error && <span style={{ color: "red", fontSize: "0.875rem" }}>{error}</span>}
          </>
        )}
      />
    </div>
  );
}
