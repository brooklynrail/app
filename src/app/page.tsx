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

  const navResponse = await fetch(`${process.env.VERCEL_URL}/api/nav/`)
  if (!navResponse.ok) {
    return notFound()
  }
  const navData = await navResponse.json()

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
