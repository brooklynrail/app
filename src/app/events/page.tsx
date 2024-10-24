import { notFound } from "next/navigation"
import { Events, EventsTypes, Homepage } from "../../../lib/types"
import { getPermalink, PageType } from "../../../lib/utils"
import { getEventTypes, getPastEvents, getUpcomingEvents } from "../../../lib/utils/events/utils"
import EventsPage from "@/app/components/events"
import { Metadata } from "next"
import { getNavData } from "../../../lib/utils/homepage"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

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

  const share_card = `${process.env.NEXT_PUBLIC_SITE_URL}/images/share-cards/brooklynrail-card.png`

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
      // type: `article`,
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
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const allEvents = await getUpcomingEvents()
  if (!allEvents) {
    return notFound()
  }

  const initialEvents = await getPastEvents({ limit: 4, offset: 0 })
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
