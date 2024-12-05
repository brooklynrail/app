import ContributorsMerge from "@/app/components/contributors/merge"
import { notFound } from "next/navigation"
import { getCurrentIssueData } from "../../../../lib/utils"
import { getNavData } from "../../../../lib/utils/homepage"
import { getAllContributorsMerge, getAllPeople } from "../../../../lib/utils/people"

export default async function ContributorsMergeIndex() {
  const data = await getData()

  return <ContributorsMerge navData={data.navData} />
}

async function getData() {
  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  return {
    navData,
  }
}
