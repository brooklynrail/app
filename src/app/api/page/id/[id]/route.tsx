import { getRevalidateData, RevalidateType } from "../../../../../../lib/utils/revalidate"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const data = await getRevalidateData(id, RevalidateType.Pages)

  if (!data) {
    return new Response("Invalid ID", { status: 401 })
  }

  return Response.json(data)
}
