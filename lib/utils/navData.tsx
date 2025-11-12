import { Homepage } from "../types"

/**
 * Fetches navigation data from the API endpoint instead of Directus directly
 * This is faster and better cached than calling Directus directly
 */
export async function getNavDataFromAPI(): Promise<Homepage | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/nav`, {
      next: {
        revalidate: 31536000, // Cache for 1 year
        tags: ["navigation"],
      },
    })

    if (!response.ok) {
      console.error(`Nav API returned ${response.status}`)
      return null
    }

    const data = await response.json()
    return data as Homepage
  } catch (error) {
    console.error("Failed to fetch nav data from API:", error)
    return null
  }
}

