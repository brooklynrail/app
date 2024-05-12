import { getSpecialIssueData } from "../../../../../lib/utils"

export async function GET(request: Request, { params }: { params: { issueSlug: string } }) {
  const issueSlug = params.issueSlug

  const data = await getSpecialIssueData({ slug: issueSlug })

  return Response.json(data)
}
