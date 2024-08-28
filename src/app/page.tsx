import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { getCurrentIssueData, getPermalink, getSectionsByIssueId, PageType } from "../../lib/utils"
import { notFound } from "next/navigation"
import { Viewport } from "next"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// Set the Viewport to show the full page of the Rail on mobile devices
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.405,
  // interactiveWidget: "resizes-visual",
}

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
  Contributor = "contributor",
  TableOfContents = "table-of-contents",
}
export interface IssuePageProps {
  issueData: Issues
  previewURL?: string
  sections: Sections[]
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
  layout: PageLayout
}

export default async function Homepage() {
  const data = await getData()

  if (!data.issueData || !data.permalink) {
    return notFound()
  }

  return <IssuePage {...data} layout={PageLayout.Issue} />
}

async function getData() {
  const issueData = await getCurrentIssueData()

  if (!issueData) {
    return notFound()
  }

  // Get the current list of Sections used in this Issue (draft or published)
  const sections = await getSectionsByIssueId(issueData.id, issueData.status)
  if (!sections) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    issueData,
    sections,
    permalink,
  }
}
