import { getPermalink, PageType } from "@/lib/utils"
import { getEventsBreakDetails, getEventTypes, getPastEvents, getUpcomingEvents } from "@/lib/utils/events"
import EventsPage from "@/components/events"
import { Metadata } from "next"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { EventsProps } from "@/lib/railTypes"

export const revalidate = 2592000 // 30 days

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data || !data.permalink) {
    console.error("❌ Events page metadata generation failed: No data or permalink")
    // Return basic metadata even if data fetching fails
    return {
      title: "Events - The Brooklyn Rail",
      description: "Upcoming and past events from The Brooklyn Rail",
    }
  }

  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

  const ogtitle = "The New Social Environment - The Brooklyn Rail"

  return {
    title: `${ogtitle}`,
    alternates: {
      canonical: `${data.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
      url: data.permalink,
      images: share_card,
    },
    twitter: {
      images: share_card,
    },
  }
}

export default async function EventsController() {
  const data = await getData()
  if (!data) {
    console.error("❌ Events page render failed: No data returned from getData()")
    // Instead of showing a 404, we'll render a basic events page with a message
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <p className="text-lg mb-4">We're having trouble loading the events at the moment. Please try again later.</p>
      </div>
    )
  }

  return <EventsPage {...data} />
}

async function getData(): Promise<EventsProps | undefined> {
  try {
    // Fetch each data source individually to identify which one fails
    const navData = await getNavDataFromAPI()

    const allEvents = await getUpcomingEvents()

    const initialEvents = await getPastEvents({ limit: 32, offset: 0 })

    const eventTypes = await getEventTypes()

    const eventsBreakDetails = await getEventsBreakDetails()

    if (!navData || !allEvents || !initialEvents || !eventTypes) {
      console.error("❌ One or more required data fetches failed:")
      if (!navData) {
        console.error("  - navData is missing")
      }
      if (!allEvents) {
        console.error("  - allEvents is missing")
      }
      if (!initialEvents) {
        console.error("  - initialEvents is missing")
      }
      if (!eventTypes) {
        console.error("  - eventTypes is missing")
      }
      return undefined
    }

    const permalink = getPermalink({
      type: PageType.Events,
    })

    return {
      navData,
      allEvents,
      initialEvents,
      eventTypes,
      eventsBreakDetails,
      permalink,
    }
  } catch (error) {
    console.error("❌ Error in getData:", error instanceof Error ? error.message : "Unknown error")
    if (error instanceof Error && error.stack) {
      console.error("Stack trace:", error.stack)
    }
    return undefined
  }
}
