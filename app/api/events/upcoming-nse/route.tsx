import { getUpcomingNSE } from "@/lib/utils/events"

export const revalidate = 3600 // 1 hour cache

export async function GET(request: Request) {
  try {
    const eventsData = await getUpcomingNSE()

    if (!eventsData) {
      return Response.json(
        {
          error: "Events data not found",
          details: "Unable to fetch events data",
        },
        { status: 404 },
      )
    }

    return Response.json(eventsData, { status: 200 })
  } catch (error) {
    console.error("❌ Error in events API:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return Response.json(null, { status: 200 })
  }
}
