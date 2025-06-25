import { notFound } from "next/navigation"
import { getAllIssues } from "@/lib/utils"

export async function GET() {
  const allIssuesData = await getAllIssues()

  if (!allIssuesData) {
    return notFound()
  }

  return Response.json(allIssuesData, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Cache-Control": "public, s-maxage=604800, stale-while-revalidate",
    },
  })
}
