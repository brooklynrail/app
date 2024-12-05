import { notFound } from "next/navigation"
import { getAllContributorsMerge } from "../../../../lib/utils/people"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const firstName = url.searchParams.get("firstName") || undefined
  const lastName = url.searchParams.get("lastName") || undefined

  const allContributors = await getAllContributorsMerge({ firstName, lastName })

  if (!allContributors) {
    return notFound()
  }

  return new Response(JSON.stringify(allContributors), {
    headers: { "Content-Type": "application/json" },
  })
}
