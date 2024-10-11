import { notFound } from "next/navigation"
import { Events } from "../../../lib/types"
import { getPermalink, PageType } from "../../../lib/utils"
import { getEvents } from "../../../lib/utils/events/utils"
import EventsPage from "@/app/components/events"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export interface EventsProps {
  allEvents: Events[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export default async function EventsController({ params }: { params: EventsProps }) {
  const data = await getData()
  if (!data.allEvents || !data.permalink) {
    return notFound()
  }

  return <EventsPage {...data} />
}

async function getData() {
  const allEvents = await getEvents()
  if (!allEvents) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Events,
  })

  return {
    allEvents,
    permalink,
  }
}
