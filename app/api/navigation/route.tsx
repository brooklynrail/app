import { notFound } from "next/navigation"
import { GlobalSettingsNavigation } from "@/lib/types"
import { getGlobalNavigation, getGlobalNavPage, getGlobalNavSection, getGlobalNavTribute } from "@/lib/utils"

export const revalidate = 604800 // 1 week

export async function GET() {
  try {
    // Fetch global settings using Directus SDK
    const globalSettings = await getGlobalNavigation()
    if (!globalSettings) {
      return notFound()
    }

    const navigationPromises = globalSettings.navigation.map(async (item: GlobalSettingsNavigation) => {
      if (item.collection === "sections" && item.item) {
        const data = await getGlobalNavSection(item.item)
        return { ...data, type: "section" }
      }
      if (item.collection === "tributes" && item.item) {
        const data = await getGlobalNavTribute(item.item)
        return { ...data, name: data.title, type: "tribute" }
      }
      if (item.collection === "pages" && item.item) {
        const data = await getGlobalNavPage(item.item)
        return { ...data, name: data.title, type: "page" }
      }
    })

    const navigationData = await Promise.all(navigationPromises)
    const cleanedData = JSON.parse(JSON.stringify(navigationData))

    return Response.json(cleanedData, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-Type": "application/json",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=86400`,
      },
    })
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    return Response.json({ error: "Failed to fetch navigation data" }, { status: 500 })
  }
}
