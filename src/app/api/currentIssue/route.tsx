import { Issues } from "../../../../lib/types"
import { getCurrentIssueData } from "../../../../lib/utils"

export async function GET() {
  const data = await getCurrentIssueData()

  if (!data) {
    return new Response("There is no current issue set", {
      status: 500,
    })
  }

  return Response.json(data)
}
