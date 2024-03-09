import { Ads, Articles, Issues, Sections } from "../../lib/types"
import IssuePage from "@/components/issuePage"
import { getAds, getArticles, getIssueData, getIssuesSelect, getSectionsByIssueId } from "../../lib/utils"
import { NextSeo } from "next-seo"

export interface IssuePageProps {
  allIssues: Array<Issues>
  currentIssue: Issues
  currentSections: Array<Sections>
  currentArticles: Array<Articles>
  currentSlides?: Array<Articles>
  ads: Array<Ads>
  permalink: string
  errorCode?: number
  errorMessage?: string
}

function HomepageController(props: IssuePageProps) {
  return (
    <>
      <NextSeo />
      <IssuePage {...props} />
    </>
  )
}

export default HomepageController

export async function getStaticProps() {
  const allIssues = await getIssuesSelect()

  // Get the most recent published issue
  const issueData = await getIssueData()

  // Get only the sections that are used in the articles in the current issue
  const allSections = await getSectionsByIssueId(issueData[0].id)

  // Filter the articles within each section to only include those that are in the current issue
  const currentSections = allSections.map((section: any) => {
    const filteredArticles = section.articles.filter(
      (article: any) => article.articles_slug && article.articles_slug.issues[0].issues_id.id === issueData[0].id,
    )
    return { ...section, articles: filteredArticles }
  })

  // Sort the articles within each section by their `sort` order
  // Note: the `sort` field is nested under `articles_slug`
  currentSections.forEach((section: any) => {
    section.articles.sort((a: any, b: any) => a.articles_slug.sort - b.articles_slug.sort)
  })

  const currentArticles = await getArticles(issueData[0].id)

  // Get the published Ads
  const ads = await getAds()

  // Get only the articles from `currentArticles` that have a `slideshow_image`
  const currentSlides = currentArticles.filter((article) => {
    return article.slideshow_image
  })

  const currentIssue = issueData[0]

  return {
    props: {
      allIssues,
      currentSlides,
      currentIssue,
      currentSections,
      currentArticles,
      ads,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}
