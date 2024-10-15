import { notFound } from "next/navigation"
import { Events, EventsPeople, EventsTypes } from "../../../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../../../lib/utils"
import { checkYearMonthDay, getEvent, getEventTypes } from "../../../../../../../lib/utils/events/utils"
import { getRedirect, RedirectTypes } from "../../../../../../../lib/utils/redirects"
import EventPage from "@/app/components/event"
import { Metadata } from "next"
import { stripHtml } from "string-strip-html"
import { AddRedirect } from "@/app/actions/redirect"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.eventData || !data.permalink) {
    return {}
  }

  const { title, summary, date_created, date_updated, people, title_tag } = data.eventData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(summary).result}`
  // const ogimageprops = { ogimage: featured_image, title }
  // const ogimages = getOGImage(ogimageprops)

  const authors = people.map((person: EventsPeople) => {
    if (!person || !person.people_id) {
      return ""
    }
    const personPermalink = getPermalink({ type: PageType.Person, personSlug: person.people_id.slug })
    return personPermalink
  })

  return {
    title: `${ogtitle}`,
    description: ogdescription,
    alternates: {
      canonical: `${data.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.permalink,
      // images: ogimages,
      type: `article`,
      publishedTime: date_created,
      modifiedTime: date_updated,
      authors: authors,
    },
    twitter: {
      // images: ogimages,
    },
  }
}

export interface EventProps {
  eventData: Events
  eventTypes: EventsTypes[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

interface EventParams {
  year: string
  month: string
  day: string
  slug: string
  id: string
}
export default async function EventController({ params }: { params: EventParams }) {
  const data = await getData({ params })
  if (!data.eventData || !data.permalink) {
    return notFound()
  }

  return <EventPage {...data} />
}

async function getData({ params }: { params: EventParams }) {
  const year: string = params.year
  const month: string = params.month
  const day: string = params.day
  const slug: string = params.slug.toString()

  // Month & Day —— Both need to have a leading zero if they are less than 10
  // otherwise it should go to a 404 page
  if (month.length === 1 || day.length === 1) {
    return notFound()
  }

  if (!year || !month || !day || !slug) {
    return notFound()
  }

  const eventData = await getEvent(slug)
  if (!eventData) {
    // If the slug is incorrect, but the dates in the URL are correct,
    // check if a redirect exists that includes this slug
    // path: /event/2024/10/13/one-becomes-the-other/
    const redirect = await getRedirect(RedirectTypes.Event, slug)
    if (redirect) {
      await AddRedirect(redirect)
    }
    return notFound()
  }

  // This checks to see that the year, month, day in the URL is the same as the start_date for this event
  // This prevents URLs with the correct slug + wrong date
  if (!checkYearMonthDay(eventData.start_date, year, month, day)) {
    // check if a redirect exists that includes this slug
    // /event/2024/10/13/one-becomes-the-other/
    const redirect = await getRedirect(RedirectTypes.Event, slug)
    if (redirect) {
      await AddRedirect(redirect)
    }
    return notFound()
  }

  const eventTypes = await getEventTypes()
  if (!eventTypes) {
    return notFound()
  }

  const startDate = new Date(eventData.start_date)
  const eventYear = startDate.getFullYear()
  const eventMonth = startDate.getMonth() + 1
  const eventDay = startDate.getDate()

  const permalink = getPermalink({
    eventYear: eventYear,
    eventMonth: eventMonth,
    eventDay: eventDay,
    type: PageType.Event,
  })

  return {
    eventData,
    eventTypes,
    permalink,
  }
}
