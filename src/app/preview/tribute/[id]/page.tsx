import TributePreview from "@/app/components/preview/tribute"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { Articles, Homepage, Tributes } from "../../../../../lib/types"
import { PageType, getPermalink } from "../../../../../lib/utils"
import { getPreviewPassword, getPreviewTribute } from "../../../../../lib/utils/preview"

export interface TributePreviewProps {
  navData: Homepage
  tributeData: Tributes
  articleData: Articles
  permalink: string
  errorCode?: number
  errorMessage?: string
  isEnabled: boolean
  previewPassword: string
  directusUrl: string
}

export async function generateMetadata({ params }: { params: PreviewParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title } = data.tributeData
  const ogtitle = stripHtml(title).result
  const ogdescription = ""

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
      type: `website`,
    },
  }
}

export default async function TributePreviewPage({ params }: { params: PreviewParams }) {
  const { isEnabled } = draftMode()
  console.log("Draft mode enabled: ", isEnabled)

  const data = await getData({ params })

  const { tributeData, articleData, permalink, directusUrl, previewPassword, navData } = data
  if (!permalink || !previewPassword || !directusUrl) {
    return notFound()
  }

  const tributePreviewProps = {
    navData,
    tributeData,
    articleData,
    permalink,
    directusUrl,
    previewPassword,
    isEnabled,
  }

  return <TributePreview {...tributePreviewProps} isEnabled={isEnabled} />
}

interface PreviewParams {
  id: string
}

async function getData({ params }: { params: PreviewParams }) {
  const id = params.id

  const navResponse = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/api/nav/`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

  const tributeData = await getPreviewTribute(id)
  if (!tributeData) {
    return notFound()
  }

  const articleData = tributeData.articles[0]

  const permalink = getPermalink({
    tributeId: tributeData.id,
    type: PageType.PreviewTribute,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    navData,
    tributeData,
    articleData,
    permalink,
    previewPassword,
    directusUrl,
  }
}
