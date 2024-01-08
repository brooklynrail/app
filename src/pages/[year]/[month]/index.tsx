import directus from "../../../../lib/directus"
import { notFound } from "next/navigation"
import { readItems } from "@directus/sdk"

function Issue(props: any) {
  const title = props.title
  const year = props.year
  const month = props.month
  return (
    <>
      <h3>{title}</h3>
      <p>
        {year}/{month}
      </p>
    </>
  )
}

export default Issue

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
  const year = params.year
  const month = params.month

  const issueData = await directus.request(
    readItems("issues", {
      fields: ["*.*,images.thumbnails.*"],
      filter: { _and: [{ year: { _eq: year } }, { month: { _eq: month } }] },
    }),
  )

  const issue = issueData[0]

  return {
    props: {
      ...issue,
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

  const paths = issues.map((issue) => ({
    params: {
      year: String(issue.year),
      month: String(issue.month).padStart(2, "0"), // Adds leading zero to single-digit months
    },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" }
}
