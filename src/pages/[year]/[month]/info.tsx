import { PageType, getPermalink } from "../../../../lib/utils"
import { NextSeo } from "next-seo"

import IssueInfo from "@/components/issuePage/issueInfo"
import { Issues, Sections } from "../../../../lib/types"
import { GetStaticPropsContext } from "next"

export interface IssueInfoProps {
  allIssues: Array<Issues>
  issueBasics: Issues
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || !params.year || !params.month) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  const year: string = String(params.year)
  const month: string = String(params.month)

  const allIssuesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/issues`)
  const allIssues = await allIssuesResponse.json()

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${year}/${month}`)
  const issueBasics = await response.json()

  // Get only the sections that are used in the articles in the current issue
  const sectionsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sections?issue=${issueBasics.id}`)
  const currentSections: Sections[] = await sectionsResponse.json()

  const permalink = getPermalink({
    year: issueBasics.year,
    month: issueBasics.month,
    type: PageType.Issue,
  })

  return {
    props: {
      allIssues,
      issueBasics,
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/issues`)
    const issues = await response.json()

    const paths = issues.map((issue: Issues) => {
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
