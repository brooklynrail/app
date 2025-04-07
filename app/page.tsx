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
  try {
    const currentIssue = await getCurrentIssueData()
    if (!currentIssue) {
      console.error("Failed to fetch currentIssue data")
      throw new Error("Failed to fetch currentIssue data")
    }

    const navData = await getNavData()
    if (!navData) {
      console.error("Failed to fetch navData")
      throw new Error("Failed to fetch navData")
    }

    const collectionsData = await getHomepageCollectionData()
    if (!collectionsData) {
      console.error("Failed to fetch collectionsData")
      throw new Error("Failed to fetch collectionsData")
    }

    const homepageHeaderData = await getHomepageHeaderData()
    if (!homepageHeaderData) {
      console.error("Failed to fetch homepageHeaderData")
      throw new Error("Failed to fetch homepageHeaderData")
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
  } catch (error) {
    console.error("❌ getData error:", {
      env: process.env.NODE_ENV,
      phase: process.env.NEXT_PHASE,
      error: error instanceof Error ? error.message : "Unknown error",
    })
    throw error
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
