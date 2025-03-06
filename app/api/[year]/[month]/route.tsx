import { notFound } from "next/navigation"
import { getIssueData } from "@/lib/utils"

export async function GET(request: Request, { params }: { params: { issueSlug: string } }) {
  const issueSlug = params.issueSlug

  const issueData = await getIssueData({ slug: issueSlug })

  if (!issueData) {
    return notFound()
  }

  return Response.json(issueData)
}
