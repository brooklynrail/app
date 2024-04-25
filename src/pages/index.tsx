import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/components/issuePage"
import { getIssueBasics, getPermalink, PageType } from "../../lib/utils"
import { NextSeo } from "next-seo"

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

function HomepageController(props: IssuePageProps) {
  return (
    <>
      <NextSeo />
      <IssuePage {...props} layout={PageLayout.Issue} />
    </>
  )
}

export default HomepageController

export async function getStaticProps() {
  try {
    // Get the Current issue
    // This is set in the Global Settings in the Studio
    const currentIssueResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/currentIssue`)
    const currentIssue: Issues = await currentIssueResponse.json()

    if (!currentIssue) {
      return { props: { errorCode: 400, errorMessage: "The current issue is not set." } }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${currentIssue.year}/${currentIssue.month}`)
    const issueBasics = await response.json()

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
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  } catch (error) {
    return { props: { errorCode: 400, errorMessage: "This current issue is not set" } }
  }
}
