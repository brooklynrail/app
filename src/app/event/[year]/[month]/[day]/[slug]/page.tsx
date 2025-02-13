import { notFound } from "next/navigation"
import { Events, EventsTypes, Homepage } from "../../../../../../../lib/types"
import { getOGImage, getPermalink, PageType, share_card } from "../../../../../../../lib/utils"
import { checkYearMonthDay, getEvent, getEventTypes } from "../../../../../../../lib/utils/events"
import { getRedirect, RedirectTypes } from "../../../../../../../lib/utils/redirects"
import EventPage from "@/app/components/event"
import { Metadata } from "next"
import { stripHtml } from "string-strip-html"
import { AddRedirect } from "@/app/actions/redirect"
import { Event, WithContext } from "schema-dts"
import Script from "next/script"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.eventData || !data.permalink) {
    return {}
  }

  const { title, summary, date_created, date_updated, people, title_tag, featured_image } = data.eventData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(summary).result}`

  const firstPerson = people[0] && people[0].people_id ? people[0].people_id.portrait : undefined

  const ogimage = featured_image ? featured_image : firstPerson
  const ogimageprops = { ogimage: ogimage, title }
  const ogimages = getOGImage(ogimageprops)

  // const authors = people.map((person: EventsPeople) => {
  //   if (!person || !person.people_id) {
  //     return ""
  //   }
  //   const personPermalink = getPermalink({ type: PageType.Person, personSlug: person.people_id.slug })
  //   return personPermalink
  // })

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
      images: ogimages,
      type: `article`,
      publishedTime: date_created,
      modifiedTime: date_updated,
    },
    twitter: {
      images: ogimages,
    },
  }
}

export interface EventProps {
  navData: Homepage
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
export default async function EventPageController({ params }: { params: EventParams }) {
  const data = await getData({ params })
  if (!data.eventData || !data.permalink) {
    return notFound()
  }

  const event = data.eventData
  const firstPerson = event.people[0] && event.people[0].people_id ? event.people[0].people_id.portrait : undefined
  const image = event.featured_image
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${event.featured_image.filename_disk}`
    : firstPerson
      ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${firstPerson.filename_disk}`
      : share_card

  const jsonLd: WithContext<Event> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: data.eventData.title,
    startDate: data.eventData.start_date,
    endDate: data.eventData.end_date,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: image,
    description: stripHtml(data.eventData.summary).result,
    organizer: {
      "@type": "Organization",
      name: "The Brooklyn Rail",
      url: "https://brooklynrail.org",
    },
  }

  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <EventPage
        navData={data.navData}
        eventData={data.eventData}
        eventTypes={data.eventTypes}
        permalink={data.permalink}
      />
    </>
  )
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

  const navResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nav`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

  // Get the event data based on slug
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
    slug: eventData.slug,
    type: PageType.Event,
  })

  return {
    navData,
    eventData,
    eventTypes,
    permalink,
  }
}
