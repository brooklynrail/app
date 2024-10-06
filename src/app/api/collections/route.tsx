import { getCollectionArticles } from "../../../../lib/utils/homepage"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const limit = searchParams.get("limit")

  if (!slug) {
    return new Response("Slug is required", { status: 400 })
  }

  const data = getCollectionArticles({ slug, limit: Number(limit) })
  return Response.json(data)
}
