import { stripHtml } from "string-strip-html"
import { PageType, getPermalink } from "../../../../../lib/utils"
import { Events, EventsTypes, Homepage } from "../../../../../lib/types"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getEventTypes } from "../../../../../lib/utils/events"
import { getPreviewEvent } from "../../../../../lib/utils/preview"
import EventPreview from "@/app/components/preview/event"
import { getNavData } from "../../../../../lib/utils/homepage"
import { getPreviewPassword } from "../../../../../lib/utils/preview"
export interface EventPreviewProps {
  navData: Homepage
  eventData: Events
  eventTypes: EventsTypes[]
  permalink: string
  errorCode?: number
  errorMessage?: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export async function generateMetadata({ params }: { params: PreviewParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, summary, title_tag } = data.eventData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(summary).result}`

  return {
    title: `PREVIEW: ${ogtitle} `,
    description: ogdescription,
    alternates: {
      canonical: `${data.permalink}`,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.permalink,
      type: `article`,
    },
  }
}

export default async function EventPreviewPage({ params }: { params: PreviewParams }) {
  const { isEnabled } = draftMode()
  console.log("Draft mode enabled: ", isEnabled)

  const data = await getData({ params })

  const { eventData, permalink, directusUrl, previewPassword, eventTypes, navData } = data
  if (!eventData || !permalink || !previewPassword || !directusUrl || !navData) {
    return { props: { errorCode: 400, errorMessage: "This article does not exist" } }
  }

  const eventPreviewProps = {
    navData,
    eventData,
    eventTypes,
    permalink,
    directusUrl,
    previewPassword,
    isEnabled,
  }

  return <EventPreview {...eventPreviewProps} />
}

interface PreviewParams {
  id: string
}

async function getData({ params }: { params: PreviewParams }) {
  const id = String(params.id)

  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const eventData = await getPreviewEvent(id)
  if (!eventData) {
    return notFound()
  }

  const eventTypes = await getEventTypes()
  if (!eventTypes) {
    return notFound()
  }

  const permalink = getPermalink({
    eventId: eventData.id,
    type: PageType.PreviewEvent,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    navData,
    eventData,
    eventTypes,
    permalink,
    previewPassword,
    directusUrl,
  }
}
