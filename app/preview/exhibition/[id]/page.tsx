import ExhibitionPreview from "@/components/preview/exhibition"
import { ExhibitionPreviewProps } from "@/lib/railTypes"
import { PageType, getPermalink } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getPreviewExhibition, getPreviewPassword } from "@/lib/utils/preview"
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

export async function generateMetadata({ params }: { params: PreviewParams }): Promise<Metadata> {
  const data = await getData(params)

  if (!data?.exhibitionData) {
    return {}
  }

  const { title, summary, title_tag } = data.exhibitionData
  const ogtitle = `PREVIEW: ${title_tag ? stripHtml(title_tag).result : stripHtml(title).result}`
  const ogdescription = summary ? stripHtml(summary).result : ""

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

export default async function ExhibitionPreviewPage({ params }: { params: PreviewParams }) {
  const isEnabled = await draftMode()

  // Verify draft mode is enabled
  if (!isEnabled) {
    redirect("/")
  }

  const data = await getData(params)

  if (!data?.exhibitionData || !data.previewPassword) {
    notFound()
  }

  return <ExhibitionPreview {...data} />
}

async function getData(params: PreviewParams): Promise<ExhibitionPreviewProps | undefined> {
  try {
    const id = String(params.id)

    // Parallel fetch of initial data
    const [navData, exhibitionData, previewPassword] = await Promise.all([
      getNavData(),
      getPreviewExhibition(id),
      getPreviewPassword(),
    ])

    if (!navData || !exhibitionData || !previewPassword) {
      return undefined
    }

    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!directusUrl || !baseUrl) {
      throw new Error("Missing required environment variables")
    }

    const permalink = getPermalink({
      slug: exhibitionData.slug,
      type: PageType.PreviewExhibition,
    })

    const previewURL = `${baseUrl}/preview/exhibition/${id}/`

    return {
      navData,
      exhibitionData,
      permalink,
      previewPassword,
      directusUrl,
      previewURL,
      isEnabled: true,
    }
  } catch (error) {
    console.error("Error fetching preview exhibition data:", error)
    return undefined
  }
}
