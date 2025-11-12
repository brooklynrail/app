import NotFound from "@/components/notFound"
import { NotFoundProps } from "@/lib/railTypes"
import { getNavDataFromAPI } from "@/lib/utils/navData"

export const revalidate = 2592000 // revalidate every month

// Main Page Component
export default async function NotFoundPage() {
  const data = await getData()

  if (!data || !data.navData) {
    // If we can't get nav data (extremely rare with API), throw error instead
    // This prevents caching a broken 404 page
    console.error("404 page: Failed to load navigation data")
    throw new Error("Failed to load navigation data for 404 page")
  }

  return <NotFound {...data} />
}

// Data Fetching
async function getData(): Promise<NotFoundProps | undefined> {
  try {
    // Add 5 second timeout for 404 page to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const navData = await getNavDataFromAPI()
    clearTimeout(timeoutId)

    if (!navData) {
      console.error("404 page: navData API returned null")
      return undefined
    }

    return {
      navData,
    }
  } catch (error) {
    console.error("404 page: Failed to fetch navData from API:", error)
    return undefined
  }
}
