import { getIssueBasics } from "../../../../../lib/utils"

export async function GET(request: Request, { params }: { params: { year: string; month: string } }) {
  const year = Number(params.year)
  const month = Number(params.month)

  const data = await getIssueBasics({ year: year, month: month })

  return Response.json(data)
}
