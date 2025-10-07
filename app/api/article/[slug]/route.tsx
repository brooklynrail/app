import { getArticle } from "@/lib/utils"

export const revalidate = 86400 // 1 day - shorter than page cache

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

    // Add cache control headers - shorter cache time for API
    return Response.json(articleData, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error("Error fetching article:", error)
    return new Response("Error fetching article", { status: 500 })
  }
}
