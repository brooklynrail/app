export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Fetch directly from Directus with indefinite cache until manually revalidated
    const globalSettingsAPI = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/global_settings?fields[]=active_popup`

    const res = await fetch(globalSettingsAPI, {
      next: {
        revalidate: false, // Cache indefinitely
        tags: ["settings"], // Revalidate via tag only
      },
    })

    if (!res.ok) {
      console.error("❌ Settings API: Failed to fetch from Directus")
      return Response.json({ error: "Failed to fetch settings" }, { status: 500 })
    }

    const { data } = await res.json()
    const activePopup = data?.active_popup || "none"

    // Return without CDN caching - let Next.js data cache handle it
    return Response.json({ activePopup })
  } catch (error) {
    console.error("❌ Error in settings API:", error)
    return Response.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}
