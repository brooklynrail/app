import { NextRequest } from "next/server"
import { getOrganizations } from "@/lib/utils/organizations"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const onlySponsors = searchParams.get("onlySponsors") === "true"

  const orgsData = await getOrganizations({ onlySponsors })

  if (!orgsData) {
    return new Response("Invalid orgsData", { status: 401 })
  }

  return Response.json(orgsData)
}
