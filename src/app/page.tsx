import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { getCurrentIssueData, getPermalink, getSectionsByIssueId, PageType } from "../../lib/utils"
import { notFound } from "next/navigation"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

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
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <IssuePage {...data} layout={PageLayout.Issue} />
}

async function getData() {
  const data: Issues | undefined = await getCurrentIssueData()

  if (!data) {
    return { errorCode: 500, errorMessage: "There is no current issue set" }
  }

  const sections = await getSectionsByIssueId(data.id)
  if (!sections) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    issueData: data,
    sections,
    permalink,
  }
}
