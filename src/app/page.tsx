import { Collections, Covers, Homepage, HomepageBanners, HomepageCollections, Issues } from "../../lib/types"
import { getPermalink, PageType } from "../../lib/utils"
import { getCoversData, getCurrentIssueData, getHomepageData, getNavData } from "../../lib/utils/homepage"
import { notFound } from "next/navigation"
import HomePage, { CollectionType } from "./components/homepage"

// Dynamic segments not included in generateStaticParams are generated on demand.
// See: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true

export interface HomePageProps {
  navData: Homepage
  covers: Covers[]
  homepageData: Homepage
  currentIssue: Issues
  banners: HomepageBanners[]
  permalink: string
  errorCode?: number
  errorMessage?: string
}

export default async function HomepagePage() {
  const data = await getData()

  return <HomePage {...data} />
}

async function getData() {
  const currentIssue = await getCurrentIssueData()
  if (!currentIssue) {
    return notFound()
  }

  const navData = await getNavData()
  if (!navData) {
    return notFound()
  }

  const homepageData = await getHomepageData(currentIssue)
  if (!homepageData) {
    return notFound()
  }

  const banners = homepageData.banners
  if (!banners) {
    return notFound()
  }

  const covers = await getCoversData()
  if (!covers) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    navData,
    covers,
    homepageData,
    banners,
    currentIssue,
    permalink,
  }
}
