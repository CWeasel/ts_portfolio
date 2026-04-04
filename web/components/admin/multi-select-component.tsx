"use client";

import { useEffect, useMemo, useState } from "react";
import type { FieldConfig } from "@/types/admin-types";
import { fetchData } from "@/hooks/use-shared";

type MultiSelectFieldProps<T> = {
  field: FieldConfig;
  item?: Partial<T> | null;
};

export function MultiSelectField<T extends {id:string, name:string}>({
  field,
  item,
}: MultiSelectFieldProps<T>) {
  const [options, setOptions] = useState<T[]>([]);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [selectedValue, setSelectedValue] = useState("");



  useEffect(() => {
    const fetchOptions = async () => {
      if (!field.optionsEndpoint) return;

      try {
        const data = await fetchData(field.optionsEndpoint);
        // const response = await fetch(`http://localhost:3000/api${field.optionsEndpoint}`, {credentials: "include"});
        // if (!response.ok) {
        //   throw new Error(`Failed to fetch options from ${field.optionsEndpoint}`);
        // }

        // const data = await response.json();

        if (Array.isArray(data)) {
          setOptions(data);
          return;
        }

        if (Array.isArray(data.data)) {
          setOptions(data.data);
          return;
        }

        setOptions([]);
      } catch (error) {
        console.error("Failed to load select options:", error);
        setOptions([]);
      }
    };

    fetchOptions();
  }, [field.optionsEndpoint]);

  useEffect(() => {
    const rawValue = item?.[field.key as keyof T];

    if (!rawValue || !Array.isArray(rawValue) || options.length === 0) {
      return;
    }

    const normalizedSelected = rawValue
      .map((value) => {
        if (typeof value === "object" && value !== null && "id" in value) {
          return value as T;
        }

        return options.find((option) => String(option.id) === String(value));
      })
      .filter(Boolean) as T[];

    setSelectedItems(normalizedSelected);
  }, [item, field.key, options]);

  const availableOptions = useMemo(() => {
    const selectedIds = new Set(selectedItems.map((option) => String(option.id)));

    return options.filter((option) => !selectedIds.has(String(option.id)));
  }, [options, selectedItems]);

  const labelKey = field.optionLabelKey ?? "name";

  const handleAddItem = (value: string) => {
    if (!value) return;

    const optionToAdd = options.find((option) => String(option.id) === value);
    if (!optionToAdd) return;

    setSelectedItems((prev) => [...prev, optionToAdd]);
    setSelectedValue("");
  };

  const handleRemoveItem = (id: string | number) => {
    setSelectedItems((prev) =>
      prev.filter((item) => String(item.id) !== String(id))
    );
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={field.key}
      >
        {field.label}
      </label>

      <select
        id={field.key}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          handleAddItem(e.target.value);
        }}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select an item...</option>
        {availableOptions.map((option) => (
          <option key={option.id} value={String(option.id)}>
            {String(option[labelKey as keyof T] ?? option.id)}
          </option>
        ))}
      </select>

      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((selectedItem) => (
          <div
            key={selectedItem.id}
            className="flex items-center gap-2 bg-gray-100 border rounded px-3 py-1 text-sm text-gray-700"
          >
            <span>{String(selectedItem[labelKey as keyof T] ?? selectedItem.id)}</span>
            <button
              type="button"
              onClick={() => handleRemoveItem(selectedItem.id)}
              className="text-red-500 hover:text-red-700 font-bold"
              aria-label={`Remove ${String(selectedItem[labelKey as keyof T] ?? selectedItem.id)}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {selectedItems.map((selectedItem) => {
        return(
        <input
          key={`hidden-${selectedItem.id}`}
          type="hidden"
          name={`${field.key}`}
          value={String(selectedItem.id)}
        />
      )}
      )}
    </div>
  );
}