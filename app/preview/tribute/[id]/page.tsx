import TributePreview from "@/components/preview/tribute"
import { TributePreviewProps } from "@/lib/railTypes"
import { PageType, getPermalink } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getPreviewPassword, getPreviewTribute } from "@/lib/utils/preview"
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

  if (!data?.tributeData) {
    return {}
  }

  const { title } = data.tributeData
  const ogtitle = `PREVIEW: ${stripHtml(title).result}`

  return {
    title: ogtitle,
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
      url: data.permalink,
      type: "website",
    },
  }
}

// Main Page Component
export default async function TributePreviewPage(props: { params: Promise<PreviewParams> }) {
  const params = await props.params;
  const isEnabled = await draftMode()

  // Verify draft mode is enabled
  if (!isEnabled) {
    redirect("/")
  }

  const data = await getData(params)

  if (!data?.tributeData || !data.previewPassword) {
    notFound()
  }

  return <TributePreview {...data} />
}

// Data Fetching
async function getData(params: PreviewParams): Promise<TributePreviewProps | undefined> {
  try {
    const id = String(params.id)

    // Parallel fetch of initial data
    const [navData, tributeData, previewPassword] = await Promise.all([
      getNavData(),
      getPreviewTribute(id),
      getPreviewPassword(),
    ])

    if (!navData || !tributeData || !previewPassword) {
      return undefined
    }

    const articleData = tributeData.articles[0]
    if (!articleData) {
      return undefined
    }

    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
    if (!directusUrl) {
      throw new Error("Missing DIRECTUS_URL environment variable")
    }

    const permalink = getPermalink({
      tributeId: tributeData.id,
      type: PageType.PreviewTribute,
    })

    return {
      navData,
      tributeData,
      articleData,
      permalink,
      previewPassword,
      directusUrl,
      isEnabled: true,
    }
  } catch (error) {
    console.error("Error fetching preview tribute data:", error)
    return undefined
  }
}
