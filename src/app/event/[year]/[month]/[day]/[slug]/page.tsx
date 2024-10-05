import { notFound } from "next/navigation"
import { Events } from "../../../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../../../lib/utils"
import { getEvent, getEvents } from "../../../../../../../lib/utils/events/utils"
import EventPage from "@/app/components/event"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export interface EventProps {
  eventData: Events
  permalink: string
  errorCode?: number
  errorMessage?: string
}

interface EventParams {
  slug: string
  id: string
}
export default async function EventController({ params }: { params: EventParams }) {
  console.log("params:", params)
  const data = await getData({ params })
  if (!data.eventData || !data.permalink) {
    return notFound()
  }

  return <EventPage {...data} />
}

async function getData({ params }: { params: EventParams }) {
  const slug: string = params.slug.toString()

  const eventData = await getEvent(slug)
  if (!eventData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Events,
  })

  return {
    eventData,
    permalink,
  }
}
