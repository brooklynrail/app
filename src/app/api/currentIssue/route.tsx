import { Issues } from "../../../../lib/types"
import { getCurrentIssueData } from "../../../../lib/utils"

export default async function GET() {
  const data: Issues = await getCurrentIssueData()

  if (!data) {
    throw new Error("Failed to fetch data")
  }

  return Response.json(data)
}
