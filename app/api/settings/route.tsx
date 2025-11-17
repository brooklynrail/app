import { getGlobalSettings } from "@/lib/utils"
import { unstable_cache } from "next/cache"

export const dynamic = "force-dynamic"

const getCachedSettings = unstable_cache(
  async () => {
    const settings = await getGlobalSettings()
    return settings?.active_popup || "none"
  },
  ["settings-api"],
  {
    revalidate: 3600,
    tags: ["settings"],
  },
)

export async function GET() {
  try {
    const activePopup = await getCachedSettings()

    return Response.json(
      { activePopup },
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

