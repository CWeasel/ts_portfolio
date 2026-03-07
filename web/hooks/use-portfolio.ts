const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
const apiPath = process.env.NEXT_PUBLIC_API_PATH || "/api";

export async function fetchData<T>(path: string): Promise<T> {
  const fullUrl = path.startsWith("http") ? path : `${baseUrl}${apiPath}${path}`;

  const res = await fetch(fullUrl, { 
    credentials: "include",
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return res.json();
}

export async function getSkills() {
  return fetchData("/skills");
}

export async function getProjects<T>() {
    const data = await fetchData<T[]>("/projects");
    return data;
}

export async function getExperiences<T>() {
    const data = await fetchData<T[]>("/roles");
    return data;
}