import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import IssuePage from "@/components/issuePage"
import { IssuePageProps, PageLayout } from "@/pages"
import { PageType, getIssueBasics, getOGImage, getPermalink } from "../../../../lib/utils"
import { NextSeo } from "next-seo"
import { stripHtml } from "string-strip-html"

function SpecialIssue(props: IssuePageProps) {
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
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/special/${slug}/`}
        openGraph={{
          title: ogtitle,
          description: ogdescription,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/special/${slug}/`,
          images: ogimages,
          type: `website`,
        }}
      />
      <IssuePage {...props} layout={PageLayout.SpecialIssue} />
    </>
  )
}

export default SpecialIssue

export async function getStaticProps({ params }: any) {
  const issueSlug: string = params.issueSlug

  const issueBasics = await getIssueBasics({ year: undefined, month: undefined, slug: issueSlug })

  const permalink = getPermalink({
    issueSlug: issueBasics.slug,
    type: PageType.SpecialIssue,
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
    const specialIssues = await directus.request(
      readItems("issues", {
        fields: ["slug", "special_issue"],
        filter: {
          _and: [{ special_issue: { _eq: true } }],
        },
      }),
    )

    const paths = specialIssues.map((issue) => {
      return {
        params: {
          issueSlug: issue.slug,
        },
      }
    })

    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: "blocking" }
  } catch (error) {
    console.error("Error fetching special issue paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
