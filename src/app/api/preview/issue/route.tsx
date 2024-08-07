import { draftMode } from "next/headers"
import { getPreviewIssue } from "../../../../../lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const yearParam = searchParams.get("year")
  const monthParam = searchParams.get("month")

  if (secret !== process.env.NEXT_PUBLIC_PREVIEW_TOKEN) {
    return new Response("Invalid token", { status: 401 })
  }

  if (!yearParam || !monthParam) {
    return new Response("Missing year or month from URL", { status: 401 })
  }

  const issue = await getPreviewIssue(parseInt(yearParam, 10), parseInt(monthParam, 10))

  if (!issue) {
    return new Response("Invalid slug", { status: 401 })
  }

  draftMode().enable()

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/preview/issue/${issue.year}/${issue.month}?draftMode=true`,
    },
  })
}
