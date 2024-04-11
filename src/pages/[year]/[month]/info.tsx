import directus from "../../../../lib/directus"
import { readItems } from "@directus/sdk"
import {
  PageType,
  getIssueData,
  getIssues,
  getPermalink,
  getRailIssueApi,
  getSectionsByIssueId,
} from "../../../../lib/utils"
import { NextSeo } from "next-seo"

import IssueInfo from "@/components/issuePage/issueInfo"
import { Issues, Sections } from "../../../../lib/types"

export interface IssueInfoProps {
  allIssues: Array<Issues>
  currentIssue: Issues
  currentSections: Array<Sections>
  railIssueData: any
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

  const allIssues = await getIssues()
  const currentIssue = await getIssueData(year, month)

  // Get only the sections that are used in the articles in the current issue
  const currentSections = await getSectionsByIssueId(currentIssue.id)
  // const railIssueData = await getRailIssueApi(year, month)
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/railIssue?year=${year}&month=${month}`)
  // const railIssueData = await response.json()

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
      // railIssueData,
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
}
