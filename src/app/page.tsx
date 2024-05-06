import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/components/issuePage"
import { getCurrentIssueData, getPermalink, PageType } from "../../lib/utils"

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
}
export interface IssuePageProps {
  issueBasics: Issues
  currentSection?: Sections
  permalink: string
  errorCode?: number
  errorMessage?: string
  layout: PageLayout
}

export default async function Homepage() {
  const data = await getData()

  if (!data.props.issueBasics || !data.props.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <IssuePage {...data.props} layout={PageLayout.Issue} />
}

async function getData() {
  const issueBasics: Issues = await getCurrentIssueData()

  const permalink = getPermalink({
    year: issueBasics.year,
    month: issueBasics.month,
    type: PageType.Home,
  })

  return {
    props: {
      issueBasics,
      permalink,
    },
  }
}
