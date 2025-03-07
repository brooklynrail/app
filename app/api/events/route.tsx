export const revalidate = 3600 // 1 hour cache

export async function GET(request: Request) {
  try {
    const eventsDataAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/events` +
      `?fields[]=id` +
      `&fields[]=slug` +
      `&fields[]=type` +
      `&fields[]=kicker` +
      `&fields[]=title` +
      `&fields[]=deck` +
      `&fields[]=summary` +
      `&fields[]=series` +
      `&fields[]=start_date` +
      `&fields[]=end_date` +
      `&fields[]=all_day` +
      `&fields[]=youtube_id` +
      `&sort=start_date` +
      `&filter[end_date][_gte]=$NOW(-1+days)` + // Now minus 1 day (timezone math applies, so it may not be exactly 24 hours)
      `&filter[youtube_id][_empty]=true` +
      `&filter[status][_eq]=published`

    const res = await fetch(eventsDataAPI, { next: { revalidate: revalidate, tags: ["events"] } })
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
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching upcoming events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
