import { notFound } from "next/navigation"
import { Homepage, HomepageBanners, Issues } from "../../lib/types"
import { getBaseUrl, getPermalink, PageType } from "../../lib/utils"
import { getCurrentIssueData, getHomepageData, getNavData } from "../../lib/utils/homepage"
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

  const baseUrl = getBaseUrl()
  console.log("baseUrl ===========================", baseUrl)
  console.log("NEXT_PUBLIC_VERCEL_URL ===========================", `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`)
  // const navData = await fetch(`${baseUrl}/api/nav/`, {
  //   cache: "no-store", // Avoids caching issues during SSR
  // }).then((res) => res.json())

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
