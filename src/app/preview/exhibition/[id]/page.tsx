import ExhibitionPreview from "@/app/components/preview/exhibition"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { Exhibitions, Homepage } from "../../../../../lib/types"
import { PageType, getPermalink } from "../../../../../lib/utils"
import { getNavData } from "../../../../../lib/utils/homepage"
import { getPreviewExhibition, getPreviewPassword } from "../../../../../lib/utils/preview"

export interface ExhibitionPreviewProps {
  navData: Homepage
  exhibitionData: Exhibitions
  permalink: string
  errorCode?: number
  errorMessage?: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export async function generateMetadata({ params }: { params: PreviewParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, summary, title_tag } = data.exhibitionData
  const ogtitle = title_tag ? stripHtml(title_tag).result : stripHtml(title).result
  const ogdescription = summary && `${stripHtml(summary).result}`

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

export default async function ExhibitionPreviewPage({ params }: { params: PreviewParams }) {
  const { isEnabled } = draftMode()
  console.log("Draft mode enabled: ", isEnabled)

  const data = await getData({ params })

  const { exhibitionData, permalink, directusUrl, previewPassword, navData } = data
  if (!exhibitionData || !permalink || !previewPassword || !directusUrl || !navData) {
    return { props: { errorCode: 400, errorMessage: "This exhibition does not exist" } }
  }

  const exhibitionPreviewProps = {
    navData,
    exhibitionData,
    permalink,
    directusUrl,
    previewPassword,
    isEnabled,
  }

  return <ExhibitionPreview {...exhibitionPreviewProps} />
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

  const exhibitionData = await getPreviewExhibition(id)
  if (!exhibitionData) {
    return notFound()
  }

  const permalink = getPermalink({
    slug: exhibitionData.slug,
    type: PageType.PreviewExhibition,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    navData,
    exhibitionData,
    permalink,
    previewPassword,
    directusUrl,
  }
}
