import { Issues } from "../../../../lib/types"
import { getCurrentIssueData } from "../../../../lib/utils"

export async function GET() {
  const data: Issues = await getCurrentIssueData()

  if (!data) {
    return new Response("There is no data coming through...", {
      status: 500,
    })
  }

  return Response.json(data)
}
