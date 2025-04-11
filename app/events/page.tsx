import { notFound } from "next/navigation"
import { getPermalink, PageType } from "@/lib/utils"
import { getEventTypes, getPastEvents, getUpcomingEvents } from "@/lib/utils/events"
import EventsPage from "@/components/events"
import { Metadata } from "next"
import { getNavData } from "@/lib/utils/homepage"
import { EventsProps } from "@/lib/railTypes"

export const revalidate = 3600 // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data || !data.permalink) {
    console.error("❌ Events page metadata generation failed: No data or permalink")
    return {}
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
  console.log("🔄 Starting EventsController render")
  const data = await getData()
  if (!data) {
    console.error("❌ Events page render failed: No data returned from getData()")
    return notFound()
  }

  console.log("✅ EventsController render successful")
  return <EventsPage {...data} />
}

async function getData(): Promise<EventsProps | undefined> {
  console.log("🔄 Starting getData for events page")
  try {
    // Parallel fetch of initial data
    console.log("📡 Fetching navData, allEvents, initialEvents, eventTypes")
    const [navData, allEvents, initialEvents, eventTypes] = await Promise.all([
      getNavData(),
      getUpcomingEvents(),
      getPastEvents({ limit: 32, offset: 0 }),
      getEventTypes(),
    ])

    // Log the results of each fetch
    console.log(`📊 getNavData result: ${navData ? "✅ Success" : "❌ Failed"}`)
    console.log(`📊 getUpcomingEvents result: ${allEvents ? `✅ Success (${allEvents.length} events)` : "❌ Failed"}`)
    console.log(
      `📊 getPastEvents result: ${initialEvents ? `✅ Success (${initialEvents.length} events)` : "❌ Failed"}`,
    )
    console.log(`📊 getEventTypes result: ${eventTypes ? `✅ Success (${eventTypes.length} types)` : "❌ Failed"}`)

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

    console.log("✅ getData completed successfully")
    return {
      navData,
      allEvents,
      initialEvents,
      eventTypes,
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
