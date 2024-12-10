// File: /pages/api/events/past.ts
import { getFeaturedEvents } from "../../../../../lib/utils/events"

export async function GET(request: Request) {
  try {
    const featured = await getFeaturedEvents()
    return Response.json(featured)
  } catch (error) {
    console.error("Error fetching events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
