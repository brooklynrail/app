import PastEventsPage from "@/app/components/events/past"
import { notFound } from "next/navigation"
import { Events, EventsTypes, Homepage } from "../../../../lib/types"
import { getBaseUrl, getPermalink, PageType } from "../../../../lib/utils"
import { getEventTypes, getPastEvents } from "../../../../lib/utils/events"
import { Metadata } from "next/types"

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()

  if (!data) {
    return {}
  }
  const share_card = `${process.env.NEXT_PUBLIC_BASE_URL}/images/share-cards/brooklynrail-card.png`

  const ogtitle = "Past Events"
  return {
    title: ogtitle,
    alternates: {
      canonical: data.permalink,
    },
    openGraph: {
      title: ogtitle,
      url: data.permalink,
      type: "website",
      images: share_card,
    },
    twitter: {
      images: share_card,
    },
  }
}

export interface PastEventsProps {
  navData: Homepage
  initialEvents: Events[]
  eventTypes: EventsTypes[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export default async function EventsController() {
  const data = await getData()
  if (!data.initialEvents) {
    return notFound()
  }

  return <PastEventsPage {...data} />
}

async function getData() {
  const baseURL = getBaseUrl()
  const navData = await fetch(`${baseURL}/api/nav/`, {
    next: { revalidate: 86400, tags: ["homepage"] }, // 24 hours in seconds (24 * 60 * 60)
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`API returned ${res.status}`)
      return res.json()
    })
    .catch((error) => {
      console.error("Failed to fetch nav data:", error)
      return null
    })

  if (!navData) {
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
  const permalink = getPermalink({ type: PageType.Events })

  return { navData, initialEvents, eventTypes, permalink }
}
