// File: /pages/api/events/past.ts

import { getPastEvents } from "@/lib/utils/events"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get("limit") as string, 10) || 16
  const offset = parseInt(searchParams.get("offset") as string, 10) || 0

  try {
    const events = await getPastEvents({ limit, offset })
    return Response.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
