import { Issues } from "../../../../lib/types"
import { getCurrentIssueData } from "../../../../lib/utils"

export async function GET() {
  const data: Issues = await getCurrentIssueData()

  return Response.json(data)
}
