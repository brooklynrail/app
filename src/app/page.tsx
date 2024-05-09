import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/app/components/issuePage"
import { getCurrentIssueData, getPermalink, PageType } from "../../lib/utils"

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

  if (!data.props.issueData || !data.props.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <IssuePage {...data.props} layout={PageLayout.Issue} />
}

async function getData() {
  const issueData: Issues = await getCurrentIssueData()

  const permalink = getPermalink({
    year: issueData.year,
    month: issueData.month,
    type: PageType.Home,
  })

  return {
    props: {
      issueData,
      permalink,
    },
  }
}
