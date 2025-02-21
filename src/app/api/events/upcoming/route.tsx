import { NextRequest } from "next/server"
import { getUpcomingEventsBanner } from "../../../../../lib/utils/events"

export async function GET(request: NextRequest) {
  try {
    const eventsDataAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
      `?fields[]=id` +
      `&fields[]=slug` +
      `&fields[]=title` +
      `&fields[]=series` +
      `&fields[]=featured_image.id` +
      `&fields[]=featured_image.caption` +
      `&fields[]=featured_image.alt` +
      `&fields[]=featured_image.filename_disk` +
      `&fields[]=featured_image.width` +
      `&fields[]=featured_image.height` +
      `&fields[]=featured_image.type` +
      `&fields[]=featured_image.modified_on` +
      `&fields[]=people.people_id.portrait.id` +
      `&fields[]=people.people_id.portrait.caption` +
      `&fields[]=people.people_id.portrait.filename_disk` +
      `&fields[]=people.people_id.portrait.width` +
      `&fields[]=people.people_id.portrait.height` +
      `&fields[]=people.people_id.portrait.alt` +
      `&fields[]=people.people_id.portrait.modified_on` +
      `&fields[]=start_date` +
      `&fields[]=all_day` +
      `&sort=start_date` +
      `&limit=6` +
      `&deep[people][_limit]=1` +
      `&filter[start_date][_gte]=$NOW(-1+days)` + // Now minus 1 day (timezone math applies, so it may not be exactly 24 hours)
      `&filter[youtube_id][_empty]=true` +
      `&filter[status][_eq]=published`

    const res = await fetch(eventsDataAPI, { next: { revalidate: 3600, tags: ["events"] } })
    if (!res.ok) {
      throw new Error("Failed to fetch events data")
    }
    const data = await res.json()
    const upcomingEvents = data.data

    if (!upcomingEvents) {
      return new Response("Invalid event data", { status: 401 })
    }
    // Set cache headers for 30 minutes
    return Response.json(upcomingEvents, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error fetching upcoming events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
