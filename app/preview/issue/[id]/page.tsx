import IssuePreview from "@/components/preview/issue"
import { IssuePreviewProps } from "@/lib/railTypes"
import { PageType, getAllIssues, getPermalink, getTributes } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { getPreviewIssue, getPreviewPassword } from "@/lib/utils/preview"
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
  const params = await props.params
  const data = await getData(params)

  if (!data?.thisIssueData) {
    return {}
  }

  const { title } = data.thisIssueData
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
export default async function IssuePreviewPage(props: { params: Promise<PreviewParams> }) {
  const params = await props.params
  const isEnabled = await draftMode()

  // Verify draft mode is enabled
  if (!isEnabled) {
    redirect("/")
  }

  const data = await getData(params)

  if (!data?.thisIssueData || !data.previewPassword) {
    notFound()
  }

  return <IssuePreview {...data} />
}

// Data Fetching
async function getData(params: PreviewParams): Promise<IssuePreviewProps | undefined> {
  try {
    const id = String(params.id)

    // Parallel fetch of initial data
    const [navData, thisIssueData, allIssues, previewPassword] = await Promise.all([
      getNavData(),
      getPreviewIssue(id),
      getAllIssues(),
      getPreviewPassword(),
    ])

    if (!navData || !thisIssueData || !allIssues || !previewPassword) {
      return undefined
    }

    // Extract unique sections from articles
    const issueSections = thisIssueData.articles
      .map((article) => article.section)
      .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

    const tributesData = await getTributes({ thisIssueData })

    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL
    if (!directusUrl) {
      throw new Error("Missing DIRECTUS_URL environment variable")
    }

    const permalink = getPermalink({
      issueId: thisIssueData.id,
      type: PageType.PreviewIssue,
    })

    const previewURL = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/issue/${thisIssueData.id}/`

    return {
      navData,
      thisIssueData,
      issueSections,
      tributesData,
      allIssues,
      permalink,
      previewPassword,
      directusUrl,
      currentSection: null,
      isEnabled: true,
      previewURL,
    }
  } catch (error) {
    console.error("Error fetching preview issue data:", error)
    return undefined
  }
}
