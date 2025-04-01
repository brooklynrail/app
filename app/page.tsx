import HomePage from "@/components/homepage"
import AppLoader from "@/components/appLoader"
import { Homepage, Issues } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getCurrentIssueData, getHomepageCollectionData, getHomepageHeaderData, getNavData } from "@/lib/utils/homepage"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const revalidate = 3600 // 1 hour
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

async function getData(): Promise<HomePageProps> {
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
  if (!homepageHeaderData) {
    return notFound()
  }

  if (!currentIssue || !navData || !collectionsData || !homepageHeaderData) {
    console.error("❌ Critical data missing:", {
      currentIssue: !currentIssue,
      navData: !navData,
      collectionsData: !collectionsData,
      homepageHeaderData: !homepageHeaderData,
    })
    return notFound()
  }

  const permalink = getPermalink({
    type: PageType.Home,
  })

  // Return data with safe fallbacks
  return {
    navData,
    collectionsData,
    homepageHeaderData,
    currentIssue,
    permalink,
  }
}

export default async function HomepagePage() {
  const data = await getData()
  return (
    <Suspense fallback={<AppLoader />}>
      <HomePage {...data} />
    </Suspense>
  )
}
