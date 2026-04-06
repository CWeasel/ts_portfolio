"use client";

import { use, useEffect, useMemo, useState } from "react";
import type { FieldConfig } from "@/types/admin-types";
import { fetchData } from "@/hooks/use-shared";

type SelectProps<T> = {
  field: FieldConfig;
  item?: Partial<T> | null;
};

export function SelectField<T extends { id: string; name: string }>({
  field,
  item,
}: SelectProps<T>) {
  const [options, setOptions] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        if (!field.optionsEndpoint) return;
        const data = await fetchData(field.optionsEndpoint);
        if (Array.isArray(data)) {
          setOptions(data);
          return;
        }
        setOptions([]);
      } catch (error) {
        console.error("Failed to load select options: ", error);
        setOptions([]);
      }
    };
    fetchOptions();
  }, [field.optionsEndpoint]);

  useEffect(() => {
    const value = item?.[field.key as keyof T];
    if (!value || options.length === 0) {
      return;
    }
    if (typeof value === 'object' && value !== null && 'id' in value) {
      setSelectedItem(value as T);
    } else {
      const rawValue = value.toString();
      const normalizedValue = options.find((option) => String(option.id) === String(rawValue)) || null;
      setSelectedItem(normalizedValue);
    }
  }, [item, field.key, options])

  return(
    <div className="mb-4">
        <label className="text-sm font-bold mb-2 block">{field.label}</label>
        <select
          value={selectedItem?.id || ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selected = options.find((option) => String(option.id) === selectedId) || null;
            setSelectedItem(selected);
          }}
          className="border border-border rounded px-3 py-2"
        >
          <option value="">
            Select {field.label}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
    </div>
  )
}
