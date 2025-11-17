import { getGlobalSettings } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const revalidate = 3600 // 1 hour

export async function GET() {
  try {
    const settings = await getGlobalSettings()

    if (!settings) {
      return Response.json(
        { error: "Settings not found" },
        { status: 404 },
      )
    }

    return Response.json(
      {
        activePopup: settings.active_popup || "none",
      },
      {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        },
      },
    )
  } catch (error) {
    console.error("❌ Error in settings API:", error)
    return Response.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    )
  }
}

