import { Ads, ArticlesIssues, Issues, Sections } from "../../lib/types"
import IssuePage from "@/components/issuePage"
import { getAds, getCurrentIssue, getIssues, getSectionsByIssueId } from "../../lib/utils"
import { NextSeo } from "next-seo"

export interface IssuePageProps {
  allIssues: Array<Issues>
  currentIssue: Issues
  currentSections: Array<Sections>
  currentArticles: ArticlesIssues[]
  currentSlides?: ArticlesIssues[]
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
  const allIssues = await getIssues()

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

  const currentArticles = currentIssue.articles

  // Get the published Ads
  const ads = await getAds()

  // Filter the currentArticles to get only the articles with a slideshow image
  const currentSlides: ArticlesIssues[] = []
  currentArticles.forEach((articleIssue: ArticlesIssues) => {
    if (articleIssue.articles_slug.slideshow_image) {
      currentSlides.push(articleIssue)
    }
  })

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
