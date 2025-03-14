import HomePage from "@/components/homepage"
import { notFound } from "next/navigation"
import { Homepage, Issues } from "@/lib/types"
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

async function getData(): Promise<HomePageProps> {
  try {
    console.log("🏠 Starting homepage data fetch...")

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
      hasHeaderBanners: !!homepageHeaderData?.banners,
    })

    // During normal page load, if critical data is missing, show 404
    if (process.env.NEXT_PHASE !== "revalidate") {
      if (!currentIssue || !navData || !collectionsData || !homepageHeaderData) {
        console.error("❌ Critical data missing during normal page load")
        return notFound()
      }
    }

    const permalink = getPermalink({
      type: PageType.Home,
    })

    // Return data with safe fallbacks
    return {
      navData: navData ?? ({} as Homepage),
      collectionsData: collectionsData ?? ({} as Homepage),
      homepageHeaderData: homepageHeaderData ?? ({} as Homepage),
      currentIssue: currentIssue ?? ({} as Issues),
      permalink,
    }
  } catch (error) {
    console.error("❌ Error in getData:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    // During revalidation, return safe defaults instead of throwing
    if (process.env.NEXT_PHASE === "revalidate") {
      return {
        navData: {} as Homepage,
        collectionsData: {} as Homepage,
        homepageHeaderData: {} as Homepage,
        currentIssue: {} as Issues,
        permalink: "/",
      }
    }

    throw error
  }
}

// Add revalidation configuration
export const revalidate = 3600 // 1 hour

// Update the main component to handle errors gracefully
export default async function HomepagePage() {
  try {
    const data = await getData()
    return <HomePage {...data} />
  } catch (error) {
    console.error("❌ Error rendering homepage:", error)
    // Return a minimal error UI during revalidation
    if (process.env.NEXT_PHASE === "revalidate") {
      return (
        <HomePage
          navData={{} as Homepage}
          collectionsData={{} as Homepage}
          homepageHeaderData={{} as Homepage}
          currentIssue={{} as Issues}
          permalink="/"
        />
      )
    }
    throw error
  }
}
