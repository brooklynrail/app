import { getArticle } from "@/lib/utils"

export const revalidate = 86400 // 1 day

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  try {
    const slug = params.slug

    if (!slug) {
      return new Response("Missing slug", { status: 400 })
    }

    const articleData = await getArticle(slug, "published")

    if (!articleData) {
      return new Response("Article not found", { status: 404 })
    }

    // Add cache control headers to prevent browser caching
    return Response.json(articleData, {
      headers: {
        CacheControl: "public, s-maxage=86400, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching article:", error)
    return new Response("Error fetching article", { status: 500 })
  }
}
