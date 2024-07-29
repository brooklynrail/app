import { draftMode } from "next/headers"
import { getArticle } from "../../../../lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")

  if (secret !== process.env.NEXT_PUBLIC_PREVIEW_TOKEN) {
    return new Response("Invalid token", { status: 401 })
  }

  if (!slug) {
    return new Response("Missing id", { status: 401 })
  }

  const article = await getArticle(slug)
  if (!article) {
    return new Response("Invalid slug", { status: 401 })
  }

  draftMode().enable()

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/preview/${article.slug}?draftMode=true`,
    },
  })
}
