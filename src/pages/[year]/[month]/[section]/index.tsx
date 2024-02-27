import { IssuePageProps } from "@/pages"
import {
  getAds,
  getArticles,
  getIssueData,
  getIssues,
  getIssuesSelect,
  getSectionsByIssueId,
} from "../../../../../lib/utils"
import SectionPage from "@/components/sectionPage"

function Section(props: IssuePageProps) {
  return <SectionPage {...props} />
}

export default Section

export async function getStaticProps({ params }: any) {
  const year = params.year
  const month = params.month
  const section = params.section

  const allIssues = await getIssuesSelect()
  const issueData = await getIssueData(year, month)

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(issueData[0].id)

  // Filter the articles within each section to only include those that are in the current issue
  currentSections.map((section: any) => {
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

  const currentArticles = await getArticles(issueData[0].id, section)

  // Get the published Ads
  const ads = await getAds()

  const currentIssue = issueData[0]
  const dateSlug = `${currentIssue.year}/${currentIssue.month}`

  return {
    props: {
      allIssues,
      currentIssue,
      currentSections,
      currentArticles,
      ads,
      dateSlug,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  try {
    // Fetch all issues
    const issues = await getIssues()

    let paths: any = []

    // Iterate over each issue to fetch related sections
    for (const issue of issues) {
      const sections = await getSectionsByIssueId(issue.id)

      // Map sections to paths
      const issuePaths = sections.map((section) => ({
        params: {
          year: String(issue.year),
          month: String(issue.month),
          section: section.slug,
        },
      }))

      paths = paths.concat(issuePaths) // Concatenate to the main paths array
    }

    return { paths, fallback: "blocking" }
  } catch (error) {
    console.error("Error fetching paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
