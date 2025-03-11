import HomePage from "@/components/homepage"
import { notFound } from "next/navigation"

import { getPermalink, PageType } from "@/lib/utils"
import { getCurrentIssueData, getHomepageCollectionData, getHomepageHeaderData, getNavData } from "@/lib/utils/homepage"
import { HomePageProps } from "@/lib/railTypes"

export default async function HomepagePage() {
  const data = await getData()
  if (!data) {
    return notFound()
  }

  return <HomePage {...data} />
}

async function getData(): Promise<HomePageProps | undefined> {
  // Fetch all data in parallel
  const [currentIssue, navData, collectionsData, homepageHeaderData] = await Promise.all([
    getCurrentIssueData(),
    getNavData(),
    getHomepageCollectionData(),
    getHomepageHeaderData(),
  ])
  if (!currentIssue || !navData || !collectionsData || !homepageHeaderData) {
    return notFound()
  }

  if (!navData?.collections) {
    console.error("Missing or invalid navData")
    return notFound()
  }

  if (!collectionsData?.collections) {
    console.error("Missing or invalid collectionsData")
    return notFound()
  }

  if (!homepageHeaderData?.banners || !Array.isArray(homepageHeaderData.banners)) {
    console.error("Missing or invalid homepageHeaderData")
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
