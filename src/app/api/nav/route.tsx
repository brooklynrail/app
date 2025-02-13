import { getNavData } from "../../../../lib/utils/homepage"

export async function GET(request: Request) {
  try {
    const navData = await getNavData()

    if (!navData) {
      return Response.json({ error: "Navigation data not found" }, { status: 404 })
    }

    return new Response(JSON.stringify(navData), {
      headers: {
        "Content-Type": "application/json",
        // Cache for 1 hour, stale while revalidate for 24 hours
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    return Response.json({ error: "Failed to fetch navigation data" }, { status: 500 })
  }
}
