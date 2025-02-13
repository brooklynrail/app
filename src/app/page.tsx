import { notFound } from "next/navigation"
import { Homepage, HomepageBanners, Issues } from "../../lib/types"
import { getPermalink, PageType } from "../../lib/utils"
import { getCurrentIssueData, getHomepageData } from "../../lib/utils/homepage"
import HomePage from "./components/homepage"

export interface HomePageProps {
  navData: Homepage
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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_BRANCH_URL}`
  const navData = await fetch(`${baseUrl}/api/nav/`, {
    cache: "no-store", // Avoids caching issues during SSR
  }).then((res) => res.json())
  console.log("Nav data", navData)

  const homepageData = await getHomepageData(currentIssue)
  if (!homepageData) {
    return notFound()
  }

  const banners = homepageData.banners
  if (!banners) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    navData,
    homepageData,
    banners,
    currentIssue,
    permalink,
  }
}
