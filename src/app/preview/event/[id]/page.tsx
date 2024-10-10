import { stripHtml } from "string-strip-html"
import { PageType, getOGImage, getPermalink, getPreviewPassword } from "../../../../../lib/utils"
import { Events, Issues, Sections } from "../../../../../lib/types"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getPreviewEvent } from "../../../../../lib/utils/events/utils"
import EventPreview from "@/app/components/preview/event"

export interface EventPreviewProps {
  eventData: Events
  permalink: string
  errorCode?: number
  errorMessage?: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

// export const dynamicParams = true

export async function generateMetadata({ params }: { params: PreviewParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, excerpt, title_tag } = data.eventData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = `${stripHtml(excerpt).result}`

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

  const { eventData, permalink, directusUrl, previewPassword } = data
  if (!eventData || !permalink || !previewPassword || !directusUrl) {
    return { props: { errorCode: 400, errorMessage: "This article does not exist" } }
  }

  const eventPreviewProps = {
    eventData,
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

  const eventData = await getPreviewEvent(id)
  if (!eventData) {
    return notFound()
  }

  const currentSection = eventData.section

  const permalink = getPermalink({
    eventId: eventData.id,
    type: PageType.PreviewEvent,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    eventData,
    permalink,
    previewPassword,
    directusUrl,
  }
}
