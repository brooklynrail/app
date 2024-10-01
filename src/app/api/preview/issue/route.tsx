import { draftMode } from "next/headers"
import { getPreviewIssue } from "../../../../../lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const id = searchParams.get("id")

  if (secret !== process.env.NEXT_PUBLIC_PREVIEW_TOKEN) {
    return new Response("Invalid token", { status: 401 })
  }

  if (!id) {
    return new Response("Missing ID from URL", { status: 401 })
  }

  const issue = await getPreviewIssue(id)

  console.log("Issue: ", issue)

  if (!issue) {
    return new Response("Invalid ID", { status: 401 })
  }
  console.log("Issue ID: ", issue.id)

  draftMode().enable()

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/preview/issue/${issue.id}/?draftMode=true`,
    },
  })
}
