import { getIssueData } from "../../../../../lib/utils"

export async function GET(request: Request, { params }: { params: { year: string; month: string } }) {
  const year = Number(params.year)
  const month = Number(params.month)

  console.log("API: /api/[year]/[month] ==============")
  console.log("year", year)
  console.log("month", month)

  const data = await getIssueData({ year: year, month: month })
  console.log("Issue data", data)

  return Response.json(data)
}
