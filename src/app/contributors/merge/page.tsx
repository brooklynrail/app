import ContributorsMerge from "@/app/components/contributors/merge"
import { notFound } from "next/navigation"
import { getCurrentIssueData } from "../../../../lib/utils"
import { getNavData } from "../../../../lib/utils/homepage"
import { getAllContributorsMerge, getAllPeople } from "../../../../lib/utils/people"

export default async function ContributorsIndex() {
  const data = await getData()

  return (
    <ContributorsMerge
      thisIssueData={data.thisIssueData}
      allContributors={data.allContributors}
      navData={data.navData}
      allPeople={data.allPeople}
    />
  )
}

async function getData() {
  let allContributors = await getAllContributorsMerge()
  let allPeople = await getAllPeople()
  if (!allContributors || allContributors.length === 0 || !allPeople || allPeople.length === 0) {
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
    allPeople,
  }
}
