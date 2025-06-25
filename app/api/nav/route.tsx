import { getNavData } from "@/lib/utils/homepage"

export async function GET() {
  try {
    try {
      const navData = await getNavData()
      if (!navData) {
        return Response.json({ error: "Navigation data not found" }, { status: 404 })
      }
      const cleanedData = JSON.parse(JSON.stringify(navData))
      return Response.json(cleanedData, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "Content-Type": "application/json",
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
        },
      })
    } catch (error) {
      console.error("Error fetching Nav data:", error)
      return Response.json({ error: "Navigation data not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    return Response.json({ error: "Failed to fetch navigation data" }, { status: 500 })
  }
}
