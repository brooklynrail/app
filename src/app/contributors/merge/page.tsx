import ContributorsMerge from "@/app/components/contributors/merge"
import { notFound } from "next/navigation"
import { getNavData } from "../../../../lib/utils/homepage"

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
