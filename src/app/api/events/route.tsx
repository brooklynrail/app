import { NextRequest } from "next/server"
import { getUpcomingEventsBanner } from "../../../../lib/utils/events"

export async function GET(request: NextRequest) {
  try {
    const upcomingEvents = await getUpcomingEventsBanner()

    if (!upcomingEvents) {
      return new Response("Invalid event data", { status: 401 })
    }
    // Set cache headers for 30 minutes
    return Response.json(upcomingEvents, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching upcoming events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
