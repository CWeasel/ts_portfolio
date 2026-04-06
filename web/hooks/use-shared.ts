import type { ModelSchema } from "@/types/admin-types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const apiPath = process.env.NEXT_PUBLIC_API_PATH || "/api";

export async function fetchData<T>(
  path: string,
  method: string = "GET",
  data?: Partial<T>,
): Promise<T> {
  const fullUrl = path.startsWith("http")
    ? path
    : `${baseUrl}${apiPath}${path}`;

  const res = await fetch(fullUrl, {
    method: method,
    credentials: "include",
    ...(data && { headers: { "Content-Type": "application/json" } }),
    next: { revalidate: 3600 },
    ...(data && { body: JSON.stringify(data) }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  if (method === "GET" || method === "POST") {
    return res.json();
  } else {
    return data as T;
  }
}

export function NormalizeDate(dateString: string): string {
  if (typeof dateString === "string" && dateString.includes("T")) {
    return dateString.split("T")[0];
  }
  return dateString;
}

export function NormalizeData<T>(data: T | null, schema: ModelSchema<T>): Partial<T> {
  if (!data) return {};
  const normalized: Partial<T> = { ...data };
  for (const field of schema.fields) {
    if (field.type === "date" && normalized[field.key as keyof T]) {
      const value = normalized[field.key as keyof T];
      if (typeof value === "string") {
        normalized[field.key as keyof T] = NormalizeDate(value) as T[keyof T];
      }
    }
  }
  return normalized;
}
export function NormalizeDataArray<T>(data: T[], schema: ModelSchema<T>): Partial<T>[] {
  return data.map((item) => NormalizeData(item, schema));
}