import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import { PageType, getAllIssues, getIssueData, getPermalink, getSectionsByIssueId } from "../../../../lib/utils"
import { NextSeo } from "next-seo"

import IssueInfo from "@/components/issuePage/issueInfo"
import { Issues, Sections } from "../../../../lib/types"

export interface IssueInfoProps {
  allIssues: Array<Issues>
  currentIssue: Issues
  currentSections: Array<Sections>
  permalink: string
  errorCode?: number
  errorMessage?: string
}

function Issue(props: IssueInfoProps) {
  return (
    <>
      <NextSeo />
      <IssueInfo {...props} />
    </>
  )
}

export default Issue

export async function getStaticProps({ params }: any) {
  const year = params.year
  const month = params.month

  const allIssues = await getAllIssues()
  const currentIssue = await getIssueData({ year, month, slug: undefined })

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(currentIssue.id)

  const permalink = getPermalink({
    year: currentIssue.year,
    month: currentIssue.month,
    type: PageType.Issue,
  })

  return {
    props: {
      allIssues,
      currentIssue,
      currentSections,
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
        fields: ["year", "month"],
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
    console.error("Error fetching issue info paths", error)
    return { paths: [], fallback: "blocking" }
  }
}
