import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldConfig } from "../../types/admin";

type Option = Record<string, unknown> & { id: string };

interface Props {
  field: FieldConfig;
  optionLabelKey?: string;
}

export function MultiSelectResourceField({ field, optionLabelKey = "name" }: Props) {
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
        const res = await fetch(field.optionsEndpoint);
        if (!res.ok) throw new Error("Failed to fetch options");
        const data = await res.json();
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

  const labelKey = field.optionLabelKey || optionLabelKey;

  return (
    <div>
      <label>{field.label}</label>
      <Controller
        name={field.key}
        control={control}
        rules={{ required: field.required }}
        render={({ field: controllerField }) => {
          const valueArray: string[] = Array.isArray(controllerField.value)
            ? (controllerField.value as string[])
            : [];

          return (
            <>
              <select
                multiple
                disabled={loading}
                value={valueArray}
                onChange={(e) => {
                  const selected: string[] = Array.from(e.target.selectedOptions).map(
                    (o) => o.value,
                  );
                  controllerField.onChange(selected);
                }}
                onBlur={controllerField.onBlur}
              >
                {loading ? (
                  <option value="">Loading...</option>
                ) : (
                  options.map((opt) => {
                    const rec = opt as Record<string, unknown>;
                    const rawLabel = rec[labelKey];
                    const label = typeof rawLabel === "undefined" || rawLabel === null
                      ? String(rec.id)
                      : String(rawLabel);
                    return (
                      <option key={String(rec.id)} value={String(rec.id)}>
                        {label}
                      </option>
                    );
                  })
                )}
              </select>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </>
          );
        }}
      />
    </div>
  );
}
