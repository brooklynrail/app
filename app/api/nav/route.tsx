import { getNavData } from "@/lib/utils/homepage"

export async function GET(request: Request) {
  try {
    const navData = await getNavData()

    if (!navData) {
      return Response.json({ error: "Navigation data not found" }, { status: 404 })
    }

    return Response.json(navData)
  } catch (error) {
    console.error("Error fetching navigation data:", error)
    return Response.json({ error: "Failed to fetch navigation data" }, { status: 500 })
  }
}
