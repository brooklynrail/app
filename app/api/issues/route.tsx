import { notFound } from "next/navigation"
import { getAllIssues } from "@/lib/utils"

export async function GET() {
  const allIssuesData = await getAllIssues()

  if (!allIssuesData) {
    return notFound()
  }

  return Response.json(allIssuesData)
}
