import { getRevalidateData, RevalidateType } from "../../../../../../lib/utils/revalidate"

export async function GET(request: Request, { params }: { params: { id: string; type: RevalidateType } }) {
  const id = params.id
  const type = params.type

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const articleData = await getRevalidateData(id, type)

  if (!articleData) {
    return new Response("Invalid slug", { status: 401 })
  }
  console.log("Refresh ID articleData", articleData)

  return Response.json(articleData)
}
