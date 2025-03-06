import { getRevalidateData, RevalidateType } from "@/lib/utils/revalidate"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const articleData = await getRevalidateData(id, RevalidateType.Articles)

  if (!articleData) {
    return new Response("Invalid slug", { status: 401 })
  }

  return Response.json(articleData)
}
