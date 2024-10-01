import { stripHtml } from "string-strip-html"
import {
  PageType,
  getAllIssues,
  getPermalink,
  getPreviewIssue,
  getPreviewPassword,
  getTributes,
} from "../../../../../lib/utils"
import { Issues, Sections, Tributes } from "../../../../../lib/types"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import IssuePreview from "@/app/components/preview/issue"
import { notFound } from "next/navigation"

export interface IssuePreviewProps {
  thisIssueData: Issues
  issueSections: Sections[]
  allIssues: Issues[]
  tributesData: Tributes[]
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

  const { title } = data.thisIssueData
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

export default async function IssuePreviewPage({ params }: { params: PreviewParams }) {
  const { isEnabled } = draftMode()
  console.log("Draft mode enabled: ", isEnabled)

  const data = await getData({ params })

  const { thisIssueData, issueSections, permalink, directusUrl, previewPassword, allIssues } = data
  if (!thisIssueData || !issueSections || !permalink || !previewPassword || !directusUrl) {
    return notFound()
  }

  const tributesData = await getTributes({ thisIssueData: thisIssueData })

  const issuePreviewProps = {
    thisIssueData,
    issueSections,
    allIssues,
    tributesData,
    permalink,
    directusUrl,
    previewPassword,
    isEnabled,
  }

  return <IssuePreview {...issuePreviewProps} />
}

interface PreviewParams {
  id: string
}

async function getData({ params }: { params: PreviewParams }) {
  const id = params.id

  const thisIssueData = await getPreviewIssue(id)
  if (!thisIssueData) {
    return notFound()
  }

  const allIssues = await getAllIssues()
  if (!allIssues) {
    return notFound()
  }

  // make an array of all the sections used in thisIssueData.articles and remove any duplicates
  const issueSections = thisIssueData.articles
    .map((article) => article.section)
    .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

  if (!issueSections) {
    return notFound()
  }

  const permalink = getPermalink({
    issueId: thisIssueData.id,
    type: PageType.PreviewIssue,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    thisIssueData,
    issueSections,
    allIssues,
    permalink,
    previewPassword,
    directusUrl,
  }
}