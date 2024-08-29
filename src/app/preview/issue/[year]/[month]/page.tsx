import { stripHtml } from "string-strip-html"
import {
  PageType,
  getPermalink,
  getPreviewIssue,
  getPreviewPassword,
  getSectionsByIssueId,
} from "../../../../../../lib/utils"
import { Issues, Sections } from "../../../../../../lib/types"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import IssuePreview from "@/app/components/preview/issue"
import { notFound } from "next/navigation"

export interface IssuePreviewProps {
  thisIssueData: Issues
  sections: Sections[]
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

  const { thisIssueData, sections, permalink, directusUrl, previewPassword } = data
  if (!thisIssueData || !sections || !permalink || !previewPassword || !directusUrl) {
    return { props: { errorCode: 400, errorMessage: "This article does not exist" } }
  }

  const issuePreviewProps = {
    thisIssueData,
    sections,
    permalink,
    directusUrl,
    previewPassword,
    isEnabled,
  }

  return <IssuePreview {...issuePreviewProps} />
}

interface PreviewParams {
  year: string
  month: string
  section: string
  slug: string
}

async function getData({ params }: { params: PreviewParams }) {
  const year = parseInt(params.year, 10)
  const month = parseInt(params.month, 10)

  const thisIssueData = await getPreviewIssue(year, month)
  if (!thisIssueData) {
    return notFound()
  }
  // Get the current list of Sections used in this Issue (draft or published)
  const sections = await getSectionsByIssueId(thisIssueData.id, thisIssueData.status)

  if (!sections) {
    return notFound()
  }

  const permalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    type: PageType.Issue,
  })

  const previewPassword = await getPreviewPassword()
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL

  return {
    thisIssueData,
    sections,
    permalink,
    previewPassword,
    directusUrl,
  }
}
