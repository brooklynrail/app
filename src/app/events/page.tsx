import { notFound } from "next/navigation"
import { Events, EventsTypes, Homepage } from "../../../lib/types"
import { getBaseUrl, getPermalink, PageType } from "../../../lib/utils"
import { getEventTypes, getPastEvents, getUpcomingEvents } from "../../../lib/utils/events"
import EventsPage from "@/app/components/events"
import { Metadata } from "next"

export interface EventsProps {
  navData: Homepage
  allEvents: Events[]
  initialEvents: Events[]
  eventTypes: EventsTypes[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

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
  if (!data.allEvents || !data.permalink) {
    return notFound()
  }

  return <EventsPage {...data} />
}

async function getData() {
  const baseURL = getBaseUrl()
  const navData = await fetch(`${baseURL}/api/nav/`, {
    headers: {
      "x-vercel-protection-bypass": `${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`,
    },
    next: { revalidate: 86400, tags: ["homepage"] }, // 24 hours in seconds (24 * 60 * 60)
  }).then((res) => res.json())

  const allEvents = await getUpcomingEvents()
  if (!allEvents) {
    return notFound()
  }

  const initialEvents = await getPastEvents({ limit: 32, offset: 0 })
  if (!initialEvents) {
    return notFound()
  }

  const eventTypes = await getEventTypes()
  if (!eventTypes) {
    return notFound()
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
