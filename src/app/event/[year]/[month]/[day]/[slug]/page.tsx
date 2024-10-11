import { notFound } from "next/navigation"
import { Events, EventsPeople, People } from "../../../../../../../lib/types"
import { getPermalink, PageType } from "../../../../../../../lib/utils"
import { getEvent } from "../../../../../../../lib/utils/events/utils"
import EventPage from "@/app/components/event"
import { Metadata } from "next"
import { stripHtml } from "string-strip-html"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData({ params })

  if (!data.eventData || !data.permalink) {
    return {}
  }

  const { title, excerpt, date_created, date_updated, people, title_tag, section } = data.eventData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(excerpt).result}`
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
      section: section.name,
      authors: authors,
    },
    twitter: {
      // images: ogimages,
    },
  }
}

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
