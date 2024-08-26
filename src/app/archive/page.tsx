import { notFound } from "next/navigation"
import { Issues, Sections } from "../../../lib/types"
import { getAllIssues, getPermalink, PageType } from "../../../lib/utils"
import ArchivePage from "../components/archive"

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
  Contributor = "contributor",
}
export interface IssuePageProps {
  issueData: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
  layout: PageLayout
}

export default async function Homepage() {
  const data = await getData()

  if (!data.issues || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <ArchivePage {...data} />
}

async function getData() {
  const allIssuesData = await getAllIssues()

  if (!allIssuesData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Archive,
  })

  return {
    issues: allIssuesData,
    permalink,
  }
}
