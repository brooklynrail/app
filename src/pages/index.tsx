import { Issues, Sections } from "../../lib/types"
import IssuePage from "@/components/issuePage"
import { getCurrentIssue } from "../../lib/utils"
import { NextSeo } from "next-seo"

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
}
export interface IssuePageProps {
  currentIssue: Issues
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
  // Get the Current issue
  // This is set in the Global Settings in the Studio
  const currentIssue = await getCurrentIssue()

  if (!currentIssue || !currentIssue.articles) {
    return <>Add some articles!</>
  }

  return {
    props: {
      currentIssue,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
