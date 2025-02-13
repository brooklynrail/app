import IssuePage from "@/app/components/issuePage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { stripHtml } from "string-strip-html"
import { Homepage, Issues, Sections, Tributes } from "../../../../lib/types"
import { PageType, getAllIssues, getIssueData, getOGImage, getPermalink, getTributes } from "../../../../lib/utils"

export interface IssuePageProps {
  navData: Homepage
  thisIssueData: Issues
  tributesData: Tributes[]
  allIssues: Issues[]
  issueSections: Sections[]
  previewURL?: string
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export async function generateMetadata({ params }: { params: IssueParams }): Promise<Metadata> {
  const data = await getData({ params })

  const { title, cover_1, issue_number } = data.thisIssueData
  const ogtitle = `${stripHtml(title).result}`
  const ogdescription = `Issue #${issue_number} of The Brooklyn Rail`
  const ogimageprops = { ogimage: cover_1, title }
  const ogimages = getOGImage(ogimageprops)

  return {
    title: `${ogtitle}`,
    description: ogdescription,
    alternates: {
      canonical: `${data.permalink}`,
    },
    openGraph: {
      title: `${ogtitle}`,
      description: ogdescription,
      url: data.permalink,
      images: ogimages,
      type: `website`,
    },
  }
}

export default async function Issue({ params }: { params: IssueParams }) {
  const data = await getData({ params })

  return <IssuePage {...data} />
}

interface IssueParams {
  issueSlug: string
}

async function getData({ params }: { params: IssueParams }) {
  const issueSlug = params.issueSlug

  const navResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nav`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

  const thisIssueData = await getIssueData({ slug: issueSlug })
  if (!thisIssueData) {
    return notFound()
  }

  const allIssues = await getAllIssues()
  if (!allIssues) {
    return notFound()
  }

  const tributesData = await getTributes({ thisIssueData: thisIssueData })

  // make an array of all the sections used in thisIssueData.articles and remove any duplicates
  const issueSections = thisIssueData.articles
    .map((article) => article.section)
    .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

  const permalink = getPermalink({
    issueSlug: issueSlug,
    type: PageType.Issue,
  })

  return {
    navData,
    thisIssueData,
    issueSections,
    tributesData,
    allIssues,
    permalink,
  }
}
