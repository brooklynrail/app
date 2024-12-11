import { draftMode } from "next/headers"
import { getPreviewArticle } from "../../../../../lib/utils/preview"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const id = searchParams.get("id")

  if (secret !== process.env.NEXT_PUBLIC_PREVIEW_TOKEN) {
    return new Response("Invalid token", { status: 401 })
  }

  if (!id) {
    return new Response("Missing id", { status: 401 })
  }

  const article = await getPreviewArticle(id)

  if (!article) {
    return new Response("Invalid slug", { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  // Redirect to the path
  const path = `/preview/article/${article.id}?draftMode=true`
  // redirect(path)
  return new Response(null, {
    status: 307,
    headers: {
      Location: path,
    },
  })
}
