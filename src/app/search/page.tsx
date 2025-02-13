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
  const navData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/nav/`, {
    cache: "no-store", // Avoids caching issues during SSR
  }).then((res) => res.json())

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
