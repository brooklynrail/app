import { notFound } from "next/navigation"
import { Homepage, HomepageBanners, Issues } from "../../lib/types"
import { getBaseUrl, getPermalink, PageType } from "../../lib/utils"
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

  const baseURL = getBaseUrl()
  console.log("baseURL===================", baseURL)
  const navData = await fetch(`${baseURL}/api/nav/`, {
    next: { revalidate: 86400, tags: ["homepage"] }, // 24 hours in seconds (24 * 60 * 60)
  })
    .then(async (res) => {
      if (!res.ok) throw new Error(`API returned ${res.status}`)
      return res.json()
    })
    .catch((error) => {
      console.error("Failed to fetch nav data:", error)
      return null
    })

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
