import { draftMode } from "next/headers"
import { getPreviewArticle } from "../../../../../lib/utils"
import { redirect } from "next/navigation"

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

  const article = await getPreviewArticle(slug)

  if (!article) {
    return new Response("Invalid slug", { status: 401 })
  }

  draftMode().enable()

  const { isEnabled } = draftMode()
  console.log("API Draft mode enabled: ", isEnabled)

  // Redirect to the path
  const path = `/preview/article/${article.slug}?draftMode=true`
  console.log("Redirecting to", path)
  redirect(path)
}
