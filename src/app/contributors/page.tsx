import { Contributors, Issues } from "../../../lib/types"
import { getAllContributors, getCurrentIssueData, getPermalink, PageType } from "../../../lib/utils"
import { notFound } from "next/navigation"
import ContributorsPage from "../components/contributors"
import { getNavData } from "../../../lib/utils/homepage"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export default async function ContributorsIndex() {
  const data = await getData()

  return (
    <ContributorsPage
      thisIssueData={data.thisIssueData}
      allContributors={data.allContributors}
      navData={data.navData}
    />
  )
}

async function getData() {
  let allContributors = await getAllContributors()
  if (!allContributors || allContributors.length === 0) {
    return notFound()
  }
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }
  // filter out contributors with no articles
  allContributors = allContributors.filter((contributor: Contributors) => contributor.articles.length > 0)
  const thisIssueData = await getCurrentIssueData()

  if (!thisIssueData) {
    return notFound()
  }

  return {
    navData,
    thisIssueData,
    allContributors,
  }
}
