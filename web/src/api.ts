export async function fetchPage(slug: string){
    const res = await fetch(`http://localhost:3000/api/pages/${slug}`);
    if (!res.ok){
        throw new Error(`Failed to load page: ${res.status}`);
    }

    return res.json();
}