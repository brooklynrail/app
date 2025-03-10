import EventPreview from "@/components/preview/event"
import { EventPreviewProps } from "@/lib/railTypes"
import { PageType, getPermalink } from "@/lib/utils"
import { getEventTypes } from "@/lib/utils/events"
import { getNavData } from "@/lib/utils/homepage"
import { getPreviewEvent, getPreviewPassword } from "@/lib/utils/preview"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { stripHtml } from "string-strip-html"

interface PreviewParams {
  id: string
}

// Force dynamic rendering, no caching
export const dynamic = "force-dynamic"
export const revalidate = 0

// Metadata Generation
export async function generateMetadata(props: { params: Promise<PreviewParams> }): Promise<Metadata> {
  const params = await props.params;
  const data = await getData(params)

  if (!data?.eventData) {
    return {}
  }

  const { title, summary, title_tag } = data.eventData
  const ogtitle = `PREVIEW: ${title_tag ? stripHtml(title_tag).result : stripHtml(title).result}`
  const ogdescription = stripHtml(summary).result

  return {
    title: ogtitle,
    description: ogdescription,
    alternates: {
      canonical: data.permalink,
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
      title: ogtitle,
      description: ogdescription,
      url: data.permalink,
      type: "article",
    },
  }
}

// Main Page Component
export default async function EventPreviewPage(props: { params: Promise<PreviewParams> }) {
  const params = await props.params;
  const isEnabled = await draftMode()

  // Verify draft mode is enabled
  if (!isEnabled) {
    redirect("/")
  }

  const data = await getData(params)

  if (!data?.eventData || !data.previewPassword) {
    notFound()
  }

  return <EventPreview {...data} />
}

// Data Fetching
async function getData(params: PreviewParams): Promise<EventPreviewProps | undefined> {
  try {
    const id = String(params.id)

    // Parallel fetch of initial data
    const [navData, eventData, eventTypes, previewPassword] = await Promise.all([
      getNavData(),
      getPreviewEvent(id),
      getEventTypes(),
      getPreviewPassword(),
    ])

    if (!navData || !eventData || !eventTypes || !previewPassword) {
      return undefined
    }

    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
    if (!directusUrl) {
      throw new Error("Missing DIRECTUS_URL environment variable")
    }

    const permalink = getPermalink({
      eventId: eventData.id,
      type: PageType.PreviewEvent,
    })

    return {
      navData,
      eventData,
      eventTypes,
      permalink,
      previewPassword,
      directusUrl,
      isEnabled: true,
    }
  } catch (error) {
    console.error("Error fetching preview event data:", error)
    return undefined
  }
}
