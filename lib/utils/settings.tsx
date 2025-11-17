export interface SiteSettings {
  activePopup: "none" | "newsletter" | "donate"
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/settings`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["settings"],
      },
    })

    if (!response.ok) {
      console.error(`Settings API returned ${response.status}`)
      return { activePopup: "none" }
    }

    const data = await response.json()
    return data as SiteSettings
  } catch (error) {
    console.error("Failed to fetch settings from API:", error)
    return { activePopup: "none" }
  }
}

