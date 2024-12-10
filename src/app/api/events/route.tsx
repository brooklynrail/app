import { NextRequest } from "next/server"
import { getUpcomingEventsBanner } from "../../../../lib/utils/events"

export async function GET(request: NextRequest) {
  const upcomingEvents = await getUpcomingEventsBanner()

  if (!upcomingEvents) {
    return new Response("Invalid event data", { status: 401 })
  }

  return Response.json(upcomingEvents)
}
