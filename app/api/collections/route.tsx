import { getCollectionArticles, getCurrentIssueSlug } from "@/lib/utils/homepage"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const limit = searchParams.get("limit")

  if (!slug) {
    return new Response("Slug is required", { status: 400 })
  }

  const currentIssueSlug = await getCurrentIssueSlug()
  if (!currentIssueSlug) {
    return new Response("currentIssueSlug is required", { status: 400 })
  }

  const data = getCollectionArticles({ slug, limit: Number(limit), currentIssueSlug })
  return Response.json(data, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate",
    },
  })
}
