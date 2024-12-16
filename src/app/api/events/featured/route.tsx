import { getFeaturedEvents } from "../../../../../lib/utils/events"

export async function GET(request: Request) {
  try {
    const featured = await getFeaturedEvents()
    // Set cache headers for 30 minutes
    return new Response(JSON.stringify(featured), {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
