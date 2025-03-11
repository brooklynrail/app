import { notFound } from "next/navigation"
import { getAllIssues, getPermalink, PageType } from "@/lib/utils"
import { getNavData } from "@/lib/utils/homepage"
import { SearchProps } from "@/lib/railTypes"
import SearchPage from "@/components/search"

export const dynamic = "force-static"

export default async function SearchController() {
  const data = await getData()
  if (!data.issues || !data.permalink) {
    return { props: { errorCode: 400, errorMessage: "This issue does not exist" } }
  }
  return <SearchPage {...data} />
}

async function getData(): Promise<SearchProps> {
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

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
