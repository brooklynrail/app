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
  const data = await getData()
  if (!data) {
    return notFound()
  }

  return <EventsPage {...data} />
}

async function getData(): Promise<EventsProps | undefined> {
  // Parallel fetch of initial data
  const [navData, allEvents, initialEvents, eventTypes] = await Promise.all([
    getNavData(),
    getUpcomingEvents(),
    getPastEvents({ limit: 32, offset: 0 }),
    getEventTypes(),
  ])

  if (!navData || !allEvents || !initialEvents || !eventTypes) {
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
    permalink,
  }
}
