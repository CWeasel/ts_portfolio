const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const apiPath = process.env.NEXT_PUBLIC_API_PATH || "/api";

export async function fetchData<T>(path: string, method: string = "GET", data?: any): Promise<T> {
  const fullUrl = path.startsWith("http") ? path : `${baseUrl}${apiPath}${path}`;

  const res = await fetch(fullUrl, { 
    method: method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 }, // Cache for 1 hour
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return res.json();
}