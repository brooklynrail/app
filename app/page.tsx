import HomePage from "@/components/homepage"
import AppLoader from "@/components/appLoader"
import { Homepage, Issues } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { getCurrentIssueData, getHomepageCollectionData, getHomepageHeaderData } from "@/lib/utils/homepage"
import { getNavDataFromAPI } from "@/lib/utils/navData"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getEventsBreakDetails } from "@/lib/utils/events"
import { EventsBreakDetails } from "@/lib/railTypes"

export const revalidate = 86400 // 1 day
export interface HomePageProps {
  navData: Homepage
  currentIssue: Issues
  collectionsData: Homepage
  homepageHeaderData: Homepage
  eventsBreakDetails: EventsBreakDetails
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

    const eventsBreakDetails = await getEventsBreakDetails()
    if (!eventsBreakDetails) {
      console.error("Failed to fetch eventsBreakDetails data")
      throw new Error("Failed to fetch eventsBreakDetails data")
    }

    const navData = await getNavDataFromAPI()
    if (!navData) {
      console.error("Failed to fetch navData from API")
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
      eventsBreakDetails,
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
