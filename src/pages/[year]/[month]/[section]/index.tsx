import { IssuePageProps, PageLayout } from "@/pages"
import {
  PageType,
  getIssueBasics,
  getIssues,
  getOGImage,
  getPermalink,
  getSectionsByIssueId,
} from "../../../../../lib/utils"
import { NextSeo } from "next-seo"
import Error from "next/error"
import { stripHtml } from "string-strip-html"
import { Issues, Sections } from "../../../../../lib/types"
import IssuePage from "@/components/issuePage"
import { GetStaticPropsContext } from "next"

function Section(props: IssuePageProps) {
  if (props.errorCode && props.errorMessage) {
    return <Error statusCode={props.errorCode} title={props.errorMessage} />
  }

  if (!props.currentSection) {
    return <Error statusCode={404} title="This section does not exist" />
  }

  const { name } = props.currentSection
  const { title, cover_1, issue_number, slug } = props.issueBasics
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
      <IssuePage {...props} layout={PageLayout.Section} />
    </>
  )
}

export default Section

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || !params.year || !params.month || !params.section) {
    return { props: { errorCode: 400, errorMessage: "This section does not exist" } }
  }

  const year = parseInt(params.year.toString(), 10)
  const month = parseInt(params.month.toString(), 10)
  const section = params.section.toString()

  try {
    const issueBasics = await getIssueBasics({ year, month, slug: undefined })
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${year}/${month}`)
    // const issueBasics = await response.json()

    // Get only the sections that are used in the articles in the current issue
    const currentSections = await getSectionsByIssueId(issueBasics.id)
    // const sectionsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issue=${issueBasics.id}`)
    // const currentSections = await sectionsResponse.json()

    const currentSection = currentSections.find((s: Sections) => s.slug === section)
    // If `section` does not exist, set errorCode to a string
    if (!currentSection) {
      return { props: { errorCode: 404, errorMessage: "This section does not exist" } }
    }

    const permalink = getPermalink({
      year: issueBasics.year,
      month: issueBasics.month,
      section: currentSection.slug,
      type: PageType.Section,
    })

    return {
      props: {
        issueBasics,
        currentSection,
        permalink,
      },
      revalidate: 10,
    }
  } catch (error) {
    console.error("Failed to fetch data:", error)
    // Handle errors or pass default data
    return { props: { data: { year, month, section, message: "No data available" } } }
  }
}

export async function getStaticPaths() {
  try {
    // Fetch all issues
    // const issues = await getIssues({ special_issue: false })
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/issuesList`)
    const issues: Issues[] = await response.json()
    if (!issues) {
      return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
    }

    const paths = Promise.all(
      issues.map(async (issue: Issues) => {
        const sectionsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issue=${issue.id}`)
        const currentSections: Sections[] = await sectionsResponse.json()

        if (!currentSections) {
          return { props: { errorCode: 400, errorMessage: "This issue/section does not exist" } }
        }
        const issuePath = currentSections.map((section: Sections) => {
          return {
            params: {
              year: `${String(issue.year)}`,
              month: issue.month < 10 ? `0${String(issue.month)}` : String(issue.month),
              section: section.slug,
            },
          }
        })
        return issuePath
      }),
    )
    // Flatten the array of arrays into a single array
    const flattenedPaths = (await paths).flat()

    return { paths: flattenedPaths, fallback: "blocking" }
  } catch (error) {
    console.error("Error fetching year/month/section paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
