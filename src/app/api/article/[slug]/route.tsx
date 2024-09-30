import { getArticle } from "../../../../../lib/utils"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  if (!slug) {
    return new Response("Missing id", { status: 401 })
  }

  const articleData = await getArticle(slug, "published")

  if (!articleData) {
    return new Response("Invalid slug", { status: 401 })
  }

  return Response.json(articleData)
}
