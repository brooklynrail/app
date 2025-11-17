import { unstable_cache } from "next/cache"

const getCachedSettings = unstable_cache(
  async () => {
    const globalSettingsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=active_popup`

    const res = await fetch(globalSettingsAPI, {
      cache: "no-store", // Don't cache the fetch itself, let unstable_cache handle it
    })

    if (!res.ok) {
      throw new Error("Failed to fetch from Directus")
    }

    const { data } = await res.json()
    return data?.active_popup || "none"
  },
  ["active-popup-setting"], // Cache key
  {
    revalidate: false, // Never auto-revalidate
    tags: ["settings"], // Only revalidate when tag is cleared
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
          "Cache-Control": "public, s-maxage=31536000, immutable", // Cache for 1 year at CDN
        },
      },
    )
  } catch (error) {
    console.error("❌ Error in settings API:", error)
    return Response.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}
