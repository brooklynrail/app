import { IssuePageProps, PageLayout } from "@/pages"
import {
  PageType,
  getAds,
  getAllIssues,
  getIssueData,
  getIssues,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
} from "../../../../../lib/utils"
import { NextSeo } from "next-seo"
import Error from "next/error"
import { stripHtml } from "string-strip-html"
import { ArticlesIssues, Issues, Sections } from "../../../../../lib/types"
import IssuePage from "@/components/issuePage"

function Section(props: IssuePageProps) {
  if (props.errorCode && props.errorMessage) {
    return <Error statusCode={props.errorCode} title={props.errorMessage} />
  }
  if (!props.currentSection) {
    return <Error statusCode={404} title="This section does not exist" />
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
      <IssuePage {...props} layout={PageLayout.SpecialSection} />
    </>
  )
}

export default Section

export async function getStaticProps({ params }: any) {
  const issueSlug: string = params.issueSlug
  const section = params.section

  const allIssues = await getAllIssues()
  const issueData = await getIssueData({ year: undefined, month: undefined, slug: issueSlug })

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
    issueSlug: currentIssue.slug,
    section: currentSection.slug,
    type: PageType.SpecialIssueSection,
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
    revalidate: 60, // In seconds
  }
}

export async function getStaticPaths() {
  try {
    // Fetch all issues
    const specialIssues = await getIssues({ special_issue: true })

    const paths = Promise.all(
      specialIssues.map(async (issue: Issues) => {
        const sections = await getSectionsByIssueId(issue.id)
        const issuePath = sections.map((section) => ({
          params: {
            issueSlug: issue.slug,
            section: section.slug,
          },
        }))
        return issuePath
      }),
    )
    // Flatten the array of arrays into a single array
    const flattenedPaths = (await paths).flat()

    return { paths: flattenedPaths, fallback: "blocking" }
  } catch (error) {
    console.error("Error fetching special/section paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
