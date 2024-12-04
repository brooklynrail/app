import ContributorsMerge from "@/app/components/contributors/merge"
import { notFound } from "next/navigation"
import { getCurrentIssueData } from "../../../../lib/utils"
import { getNavData } from "../../../../lib/utils/homepage"
import { getAllContributorsMerge } from "../../../../lib/utils/people"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export default async function ContributorsIndex() {
  const data = await getData()

  return (
    <ContributorsMerge
      thisIssueData={data.thisIssueData}
      allContributors={data.allContributors}
      navData={data.navData}
    />
  )
}

async function getData() {
  let allContributors = await getAllContributorsMerge()
  if (!allContributors || allContributors.length === 0) {
    return notFound()
  }
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

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
