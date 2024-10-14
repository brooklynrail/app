import { notFound } from "next/navigation"
import { Events, EventsTypes } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { getEventTypes, getPastEvents } from "../../../../lib/utils/events/utils"
import PastEventsPage from "@/app/components/events/past"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export interface PastEventsProps {
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
  const initialEvents = await getPastEvents({ limit: 32, offset: 0 })
  if (!initialEvents) {
    return notFound()
  }

  const eventTypes = await getEventTypes()
  if (!eventTypes) {
    return notFound()
  }
  const permalink = getPermalink({ type: PageType.Events })

  return { initialEvents, eventTypes, permalink }
}
