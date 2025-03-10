import HomePage from "@/components/homepage"
import { notFound } from "next/navigation"
import { Homepage, HomepageBanners, Issues } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getCurrentIssueData, getHomepageCollectionData, getHomepageHeaderData, getNavData } from "@/lib/utils/homepage"

export interface HomePageProps {
  navData: Homepage
  currentIssue: Issues
  collectionsData: Homepage
  homepageHeaderData: Homepage
  permalink: string
  errorCode?: number
  errorMessage?: string
  previewURL?: string
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

  const collectionsData = await getHomepageCollectionData()
  if (!collectionsData) {
    return notFound()
  }

  const homepageHeaderData = await getHomepageHeaderData()
  if (!homepageHeaderData || !homepageHeaderData.banners) {
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  return {
    navData,
    collectionsData,
    homepageHeaderData,
    currentIssue,
    permalink,
  }
}
