// "use client"

import { NextResponse } from "next/server"
export const dynamic = "force-dynamic" // Mark this API as dynamic

export interface EventsData {
  version: string
  content: string
  type: string
  title: string
  description: string
  home_page_url: string
  count: string
  feed_url: string
  section: string
  items: EventOld[]
}

export interface EventOld {
  id: number
  title: string
  deck?: string
  summary: string
  date: string // or Date if you handle it as a Date object
  date_modified: string
  start_date: string
  end_date: string
  event_organizer: Array<string>
  event_producer: Array<string>
  collections: Array<string>
  people: Array<string>
  series: string
  youtube_id?: string
  event_id: string
  soldout: boolean
  registration_url?: string
  url: string
}

export async function GET() {
  try {
    // Fetch the Events data
    const response = await fetch("https://brooklynrail.org/events/index.json")

    // Check if the response is okay
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
    }

    // Parse the JSON data
    const allEventsData: EventsData = await response.json()
    const eventsData: EventOld[] = allEventsData.items

    // Check if events is an array before calling map
    if (!Array.isArray(eventsData)) {
      return <>Invalid events data</>
    }

    // Get the first 5 items
    const firstFiveEvents = eventsData.slice(0, 5)

    // Return the first 5 events as JSON
    return NextResponse.json(firstFiveEvents, { status: 200 })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
