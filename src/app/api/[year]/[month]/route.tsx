import { notFound } from "next/navigation"
import { getIssueData } from "../../../../../lib/utils"

export async function GET(request: Request, { params }: { params: { year: string; month: string } }) {
  const year = Number(params.year)
  const month = Number(params.month)

  const issueData = await getIssueData({ year: year, month: month })

  if (!issueData) {
    return notFound()
  }

  return Response.json(issueData)
}
