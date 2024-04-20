import { Ads, Issues, Sections } from "../../lib/types"
import IssuePage from "@/components/issuePage"
import { getAds, getAllIssues, getCurrentIssue, getSectionsByIssueId } from "../../lib/utils"
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
  currentSections: Array<Sections>
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

  // Get only the sections that are used in the articles in the current issue
  const allSections = await getSectionsByIssueId(currentIssue.id)

  // Filter the articles within each section to only include those that are in the current issue
  const currentSections = allSections.map((section: any) => {
    const filteredArticles = section.articles.filter(
      (article: any) => article.articles_slug && article.articles_slug.issues[0].issues_id.id === currentIssue.id,
    )
    return { ...section, articles: filteredArticles }
  })

  // Sort the articles within each section by their `sort` order
  // Note: the `sort` field is nested under `articles_slug`
  currentSections.forEach((section: any) => {
    section.articles.sort((a: any, b: any) => a.articles_slug.sort - b.articles_slug.sort)
  })

  if (!currentIssue || !currentIssue.articles) {
    return <>Add some articles!</>
  }

  // Get the published Ads
  const ads = await getAds()

  return {
    props: {
      allIssues,
      currentIssue,
      currentSections,
      ads,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}
