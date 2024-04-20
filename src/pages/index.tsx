import { Ads, Issues, Sections } from "../../lib/types"
import IssuePage from "@/components/issuePage"
import { getAds, getAllIssues, getCurrentIssue } from "../../lib/utils"
import { NextSeo } from "next-seo"

export enum PageLayout {
  Issue = "issue",
  Section = "section",
  SpecialIssue = "special-issue",
  SpecialSection = "special-section",
}
export interface IssuePageProps {
  allIssues: Array<Issues>
  currentIssue: Issues
  currentSection?: Sections
  ads: Array<Ads>
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
  const allIssues = await getAllIssues()

  // Get the Current issue
  // This is set in the Global Settings in the Studio
  const currentIssue = await getCurrentIssue()

  if (!currentIssue || !currentIssue.articles) {
    return <>Add some articles!</>
  }

  // Get the published Ads
  const ads = await getAds()

  return {
    props: {
      allIssues,
      currentIssue,
      ads,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}
