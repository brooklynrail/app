import { getArticlesBySection } from "@/lib/utils/sections"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const limit = parseInt(searchParams.get("limit") as string, 10)
  const offset = parseInt(searchParams.get("offset") as string, 10)

  if (!slug || !limit || !offset) {
    return Response.json({ error: "Missing slug" }, { status: 400 })
  }

  try {
    const data = await getArticlesBySection({ slug: slug, limit, offset })
    return Response.json(data, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Cache-Control": "public, s-maxage=604800, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
