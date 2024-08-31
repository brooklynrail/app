import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { getAllIssues, getCurrentIssueData, getPermalink, PageType } from "../../lib/utils"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 600 : 0

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
  Contributor = "contributor",
  TableOfContents = "table-of-contents",
}
export interface IssuePageProps {
  thisIssueData: Issues
  allIssues: Issues[]
  issueSections: Sections[]
  previewURL?: string
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
  layout: PageLayout
}

export default async function Homepage() {
  const data = await getData()

  if (!data.thisIssueData || !data.permalink) {
    return notFound()
  }

  return <IssuePage {...data} layout={PageLayout.Issue} />
}

async function getData() {
  const thisIssueData = await getCurrentIssueData()

  if (!thisIssueData) {
    return notFound()
  }

  // make an array of all the sections used in thisIssueData.articles and remove any duplicates
  const issueSections = thisIssueData.articles
    .map((article) => article.section)
    .filter((section, index, self) => self.findIndex((s) => s.id === section.id) === index)

  const allIssues = await getAllIssues()
  if (!allIssues) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    thisIssueData,
    issueSections,
    allIssues,
    permalink,
  }
}
