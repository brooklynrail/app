import { getAllIssues } from "../../../../lib/utils"

export async function GET() {
  const data = await getAllIssues()

  return Response.json(data)
}
