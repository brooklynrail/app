import { notFound } from "next/navigation"
import { getAllIssues, getPermalink, PageType } from "../../../lib/utils"
import SearchPage from "../components/search"

export const dynamic = "force-static"

export default async function Homepage() {
  const data = await getData()

  if (!data.issues || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }

  return <SearchPage {...data} />
}

async function getData() {
  const navResponse = await fetch(`https://${process.env.VERCEL_URL}/api/nav/`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

  const allIssuesData = await getAllIssues()
  if (!allIssuesData) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Archive,
  })

  return {
    navData,
    issues: allIssuesData,
    permalink,
  }
}
