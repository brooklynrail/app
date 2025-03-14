import HomePage from "@/components/homepage"
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
  // Fetch all data in parallel for better performance
  const [currentIssue, navData, collectionsData, homepageHeaderData] = await Promise.all([
    getCurrentIssueData().catch((error) => {
      console.error("❌ Error fetching current issue:", error)
      return null
    }),
    getNavData().catch((error) => {
      console.error("❌ Error fetching nav data:", error)
      return null
    }),
    getHomepageCollectionData().catch((error) => {
      console.error("❌ Error fetching collections data:", error)
      return null
    }),
    getHomepageHeaderData().catch((error) => {
      console.error("❌ Error fetching header data:", error)
      return null
    }),
  ])

  // Log what we received
  console.log("📦 Homepage data fetched:", {
    hasCurrentIssue: !!currentIssue,
    hasNavData: !!navData,
    hasCollections: !!collectionsData,
    hasHeaderData: !!homepageHeaderData,
  })

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

// Update the main component to handle errors gracefully
export default async function HomepagePage() {
  const data = await getData()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage {...data} />
    </Suspense>
  )
}
