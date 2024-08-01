import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { getCurrentIssueData, getPermalink, getSectionsByIssueId, PageType } from "../../lib/utils"

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
  Contributor = "contributor",
}
export interface IssuePageProps {
  issueData: Issues
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

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    issueData: data,
    sections,
    permalink,
  }
}
