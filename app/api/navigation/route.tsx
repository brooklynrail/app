import { notFound } from "next/navigation"
import { GlobalSettingsNavigation } from "@/lib/types"
import directus from "@/lib/directus"
import { readSingleton, readItem } from "@directus/sdk"

export const revalidate = 3600 // 1 hour cache

export async function GET() {
  try {
    // Fetch global settings using Directus SDK
    const globalSettings = await directus.request(
      readSingleton("global_settings", {
        fields: [
          "navigation",
          {
            navigation: ["id", "collection", "item", "sort"],
          },
          "preview_password",
        ],
      }),
    )

    if (!globalSettings) {
      return notFound()
    }

    // Keep existing fetch logic for navigation items
    const navigationPromises = globalSettings.navigation.map(async (item: GlobalSettingsNavigation) => {
      if (item.collection === "sections" && item.item) {
        const data = await directus.request(
          readItem("sections", item.item, {
            fields: ["id", "name", "slug"],
          }),
        )
        return { ...data, type: "section" }
      }
      if (item.collection === "tributes" && item.item) {
        const data = await directus.request(
          readItem("tributes", item.item, {
            fields: ["id", "title", "slug"],
          }),
        )
        return { ...data, name: data.title, type: "tribute" }
      }
      if (item.collection === "pages" && item.item) {
        const data = await directus.request(
          readItem("pages", item.item, {
            fields: ["id", "title", "slug"],
          }),
        )
        return { ...data, name: data.title, type: "page" }
      }
    })

    const navigationData = await Promise.all(navigationPromises)
    const cleanedData = JSON.parse(JSON.stringify(navigationData))

    return Response.json(cleanedData, {
      headers: {
        ContentType: "application/json",
        "Cache-Control": `public, s-maxage=${revalidate}, stale-while-revalidate=86400`,
      },
    })
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    return Response.json({ error: "Failed to fetch navigation data" }, { status: 500 })
  }
}
