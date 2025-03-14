import { notFound } from "next/navigation"
import { getIssueData } from "@/lib/utils"

export async function GET(request: Request, props: { params: Promise<{ issueSlug: string }> }) {
  const params = await props.params;
  const issueSlug = params.issueSlug

  const issueData = await getIssueData({ slug: issueSlug })

  if (!issueData) {
    return notFound()
  }

  return Response.json(issueData)
}
