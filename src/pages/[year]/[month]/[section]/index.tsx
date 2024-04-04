import { IssuePageProps } from "@/pages"
import {
  PageType,
  getAds,
  getIssueData,
  getIssues,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
} from "../../../../../lib/utils"
import SectionPage from "@/components/sectionPage"
import { NextSeo } from "next-seo"
import Error from "next/error"
import { stripHtml } from "string-strip-html"
import { ArticlesIssues, Sections } from "../../../../../lib/types"

export interface SectionProps {
  currentSection: Sections
}
function Section(props: IssuePageProps & SectionProps) {
  if (props.errorCode && props.errorMessage) {
    return <Error statusCode={props.errorCode} title={props.errorMessage} />
  }
  const { name } = props.currentSection
  const { title, cover_1, issue_number, slug } = props.currentIssue
  const ogtitle = `${name} – ${stripHtml(title).result} | The Brooklyn Rail`
  const ogdescription = `The ${name} section of issue #${issue_number} of The Brooklyn Rail`
  const ogimageprops = { ogimage: cover_1, title }
  const ogimages = getOGImage(ogimageprops)
  return (
    <>
      <NextSeo
        title={ogtitle}
        description={ogdescription}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/${props.currentSection.slug}/`}
        openGraph={{
          title: ogtitle,
          description: ogdescription,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/${props.currentSection.slug}/`,
          images: ogimages,
          type: `website`,
        }}
      />
      <SectionPage {...props} />
    </>
  )
}

export default Section

export async function getStaticProps({ params }: any) {
  const year = params.year
  const month = params.month
  const section = params.section

  const allIssues = await getIssues()
  const issueData = await getIssueData(year, month)

  // Filter the currentArticles to only include those that are in the current section
  const currentArticles = issueData.articles.filter((article: ArticlesIssues) => {
    return article.articles_slug.sections.find((s) => s.sections_id.slug === section)
  })

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(issueData.id)
  const currentSection = currentSections.find((s: Sections) => s.slug === section)

  // Get the published Ads
  const ads = await getAds()

  const currentIssue = issueData

  // If `section` does not exist, set errorCode to a string
  if (!currentSection) {
    return { props: { errorCode: 404, errorMessage: "This section does not exist" } }
  }

  const permalink = getPermalink({
    year: currentIssue.year,
    month: currentIssue.month,
    section: currentSection.slug,
    type: PageType.Section,
  })

  return {
    props: {
      allIssues,
      currentIssue,
      currentSections,
      currentSection,
      currentArticles,
      ads,
      permalink,
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
