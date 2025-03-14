export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const pagesData = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/pages?fields[]=id&fields[]=title&fields[]=slug&filter[id][_eq]=${id}`
  const res = await fetch(pagesData, { next: { revalidate: 3600, tags: ["pages"] } })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pagesData data")
  }
  const { data } = await res.json()

  if (!data) {
    return new Response("Invalid ID", { status: 401 })
  }

  return Response.json(data)
}
