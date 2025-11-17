export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Fetch directly from Directus to avoid double caching
    const globalSettingsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=active_popup`
    
    const res = await fetch(globalSettingsAPI, { 
      next: { 
        revalidate: 3600, // 1 hour
        tags: ["settings"] 
      } 
    })
    
    if (!res.ok) {
      console.error("❌ Settings API: Failed to fetch from Directus")
      return Response.json(
        { error: "Failed to fetch settings" },
        { status: 500 },
      )
    }

    const { data } = await res.json()
    const activePopup = data?.active_popup || "none"

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

