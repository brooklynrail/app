import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import IssuePage from "@/components/issuePage"
import { IssuePageProps, PageLayout } from "@/pages"
import { PageType, getIssueBasics, getOGImage, getPermalink } from "../../../../lib/utils"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"
import { GetStaticPropsContext } from "next"

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

  const year = parseInt(params.year.toString(), 10)
  const month = parseInt(params.month.toString(), 10)

  const issueBasics = await getIssueBasics({ year, month, slug: undefined })

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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  try {
    const issues = await directus.request(
      readItems("issues", {
        fields: ["year", "month", "special_issue"],
        filter: {
          _and: [{ special_issue: { _eq: false } }],
        },
      }),
    )

    const paths = issues.map((issue) => {
      const month = issue.month
      return {
        params: {
          year: String(issue.year),
          month: month < 10 ? `0${String(month)}` : String(month),
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
