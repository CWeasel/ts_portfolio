export async function fetchPage(slug: string){
    const res = await fetch(`http://localhost:3000/api/pages/${slug}`, { credentials: "include" });
    if (!res.ok){
        throw new Error(`Failed to load page: ${res.status}`);
    }

    return res.json();
}

export async function updateBlock(id: string, content:any){
    const res = await fetch(`http://localhost:3000/api/admin/blocks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({data: content}),
        credentials: "include",
    });

    if(!res.ok){
        const data = await res.json();
        throw new Error(data.error || "Failed to update Block.")
    }

    return res.json();
}