import IssuePage from "@/components/issuePage"
import { IssuePageProps, PageLayout } from "@/pages"
import { PageType, getAllIssues, getIssueBasics, getOGImage, getPermalink } from "../../../../lib/utils"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"
import { GetStaticPropsContext } from "next"
import { Issues } from "../../../../lib/types"

function Issue(props: IssuePageProps) {
  const { title, cover_1, issue_number, slug } = props.issueBasics
  const ogtitle = `${stripHtml(title).result} | The Brooklyn Rail`
  const ogdescription = `Issue #${issue_number} of The Brooklyn Rail`
  const ogimageprops = { ogimage: cover_1, title }
  const ogimages = getOGImage(ogimageprops)

  return (
    <>
      <NextSeo
        title={ogtitle}
        description={ogdescription}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/`}
        openGraph={{
          title: ogtitle,
          description: ogdescription,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}/`,
          images: ogimages,
          type: `website`,
        }}
      />
      <IssuePage {...props} layout={PageLayout.Issue} />
    </>
  )
}

export default Issue

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || !params.year || !params.month) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  const year = Number(params.year)
  const month = Number(params.month)

  try {
    const issueBasics = await getIssueBasics({ year: year, month: month })

    const permalink = getPermalink({
      year: issueBasics.year,
      month: issueBasics.month,
      type: PageType.Issue,
    })

    return {
      props: {
        issueBasics,
        permalink,
      },
      revalidate: 10,
    }
  } catch (error) {
    console.error("Failed to fetch data:", error)
    // Handle errors or pass default data
    return { props: { data: { year, month, message: "No data available" } } }
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  try {
    const allIssues = await getAllIssues()

    const paths = allIssues.map((issue: Issues) => {
      const month = issue.month < 10 ? String(`0${issue.month}`) : String(issue.month)
      return {
        params: {
          year: String(issue.year),
          month: month,
        },
      }
    })

    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: "blocking" }
  } catch (error) {
    console.error("Error fetching year/month issue paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
