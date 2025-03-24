export const revalidate = 3600 // 1 hour cache

export async function GET(request: Request) {
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
      `&filter[start_date][_gte]=$NOW(-1+days)` +
      `&filter[youtube_id][_empty]=true` +
      `&filter[status][_eq]=published`

    const res = await fetch(eventsDataAPI, { next: { revalidate: revalidate, tags: ["events"] } })
    if (!res.ok) {
      throw new Error("Failed to fetch events data")
    }

    const data = await res.json()
    const upcomingEvents = data.data || null

    return Response.json(upcomingEvents, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
      },
    })
  } catch (error) {
    console.error("❌ Error in events API:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return Response.json(null, { status: 200 })
  }
}
