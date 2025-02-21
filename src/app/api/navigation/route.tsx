import { notFound } from "next/navigation"
import { GlobalSettingsNavigation } from "../../../../lib/types"

export async function GET() {
  const globalSettingsData = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=navigation.collection&fields[]=navigation.id&fields[]=navigation.item&fields[]=navigation.item&fields[]=navigation.sort&fields[]=current_issue.month&fields[]=current_issue.year&fields[]=current_issue.special_issue&fields[]=current_issue.slug&fields[]=preview_password`
  const res = await fetch(globalSettingsData, { next: { revalidate: 3600, tags: ["homepage"] } })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch getGlobalSettings data")
  }
  const { data } = await res.json()

  if (!data) {
    return notFound()
  }

  // For each of the items in data.navigation, get the data for the item ID
  const navigationPromises = data.navigation.map(async (item: GlobalSettingsNavigation) => {
    if (item.collection === "sections") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/sections/${item.item}?fields[]=id&fields[]=name&fields[]=slug`,
        { next: { revalidate: 3600, tags: ["homepage"] } },
      )
      const { data } = await res.json()
      return { ...data, type: "section" }
    }
    if (item.collection === "tributes") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/tributes/${item.item}?fields[]=id&fields[]=title&fields[]=slug`,
        { next: { revalidate: 3600, tags: ["homepage"] } },
      )
      const { data } = await res.json()
      return { ...data, name: data.title, type: "tribute" }
    }
    if (item.collection === "pages") {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/pages/${item.item}?fields[]=id&fields[]=title&fields[]=slug`,
        { next: { revalidate: 3600, tags: ["homepage"] } },
      )
      const { data } = await res.json()
      return { ...data, name: data.title, type: "page" }
    }
  })

  const navigationData = await Promise.all(navigationPromises)

  return Response.json(navigationData)
}
