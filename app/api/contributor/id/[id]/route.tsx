import { getRevalidateData, RevalidateType } from "@/lib/utils/revalidate"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const data = await getRevalidateData(id, RevalidateType.Contributors)

  if (!data) {
    return new Response("Invalid ID", { status: 401 })
  }

  return Response.json(data, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate",
    },
  })
}
