import { getArticlesBySection } from "../../../../lib/utils/sections/utils"

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
    return Response.json(data)
  } catch (error) {
    console.error("Error fetching events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
