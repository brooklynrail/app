import { getActivePopupSetting } from "@/lib/utils"

export const dynamic = "force-dynamic"
export const revalidate = 31536000 // 1 year

export async function GET() {
  try {
    // This awaits the Directus call - even if it's slow, it completes
    const activePopup = await getActivePopupSetting()

    if (!activePopup) {
      return Response.json(
        {
          error: "Settings not found",
          details: "Unable to fetch settings from Directus",
        },
        { status: 404 },
      )
    }

    // No Cache-Control header - rely only on Next.js data cache with tag revalidation
    return Response.json({ activePopup })
  } catch (error) {
    console.error("❌ Error in settings API:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })

    return Response.json(
      {
        error: "Failed to fetch settings",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
