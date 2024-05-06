import { getCurrentIssueData } from "../../../../lib/utils"

export async function GET() {
  const data = await getCurrentIssueData()

  return Response.json(data)
}
