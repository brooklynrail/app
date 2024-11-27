import { NextRequest } from "next/server"
import { getUpcomingEventsBanner } from "../../../../lib/utils/events"

export async function GET(request: NextRequest) {
  const eventsData = await getUpcomingEventsBanner()

  if (!eventsData) {
    return new Response("Invalid event data", { status: 401 })
  }

  return Response.json(eventsData)
}
