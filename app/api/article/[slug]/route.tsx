import { getArticle } from "@/lib/utils"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    if (!slug) {
      return new Response("Missing slug", { status: 400 })
    }

    const articleData = await getArticle(slug, "published")

    if (!articleData) {
      return new Response("Article not found", { status: 404 })
    }

    return Response.json(articleData)
  } catch (error) {
    console.error("Error fetching article:", error)
    return new Response("Error fetching article", { status: 500 })
  }
}
