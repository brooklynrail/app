import { notFound } from "next/navigation"
import { getIssueData } from "@/lib/utils"

export async function GET(request: Request, props: { params: Promise<{ issueSlug: string }> }) {
  const params = await props.params
  const issueSlug = params.issueSlug

  const issueData = await getIssueData({ slug: issueSlug })

  if (!issueData) {
    return notFound()
  }

  // Add cache control headers to prevent browser caching
  return Response.json(issueData, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate",
    },
  })
}
