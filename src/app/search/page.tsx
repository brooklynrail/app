import { notFound } from "next/navigation"
import { getAllIssues, getBaseUrl, getNavData, getPermalink, PageType } from "../../../lib/utils"
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
  const navData = await getNavData()

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
