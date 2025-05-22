import { NextRequest } from "next/server"
import { AdTypes } from "@/lib/utils/ads"

// Revalidates every hour
export const revalidate = 3600

export async function GET(request: NextRequest) {
  // Add cache control headers to prevent browser caching
  const headers = {
    CacheControl: "no-store, must-revalidate",
    Pragma: "no-cache",
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (!type || !Object.values(AdTypes).includes(type as AdTypes)) {
    return new Response("Invalid ad type", { status: 400 })
  }

  interface GetAdsProps {
    adType: AdTypes
  }

  const adsData = async ({ adType }: GetAdsProps) => {
    const adsAPI =
      `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/ads` +
      `?fields[]=ad_type` +
      `&fields[]=ad_url` +
      `&fields[]=start_date` +
      `&fields[]=end_date` +
      `&fields[]=status` +
      `&fields[]=id` +
      `&fields[]=sort` +
      `&fields[]=campaign_title` +
      `&fields[]=slug` +
      `&fields[]=tile_image.filename_disk` +
      `&fields[]=tile_image.width` +
      `&fields[]=tile_image.height` +
      `&fields[]=banner_image.filename_disk` +
      `&fields[]=banner_image.width` +
      `&fields[]=banner_image.height` +
      `&fields[]=banner_image_mobile.filename_disk` +
      `&fields[]=banner_image_mobile.width` +
      `&fields[]=banner_image_mobile.height` +
      `&filter[status][_eq]=published` +
      `&filter[ad_url][_nnull]=true` +
      `&filter[ad_type][_eq]=${adType}` +
      `&filter[start_date][_lte]=NOW` +
      `&filter[end_date][_gte]=NOW`

    try {
      const res = await fetch(adsAPI, { next: { revalidate: 3600, tags: ["ads"] } }) // Revalidates every hour
      if (!res.ok) {
        console.warn(`Ads API returned status ${res.status}: ${res.statusText}`)
        return []
      }

      const result = await res.json()

      if (!result?.data) {
        console.warn("Ads API returned invalid data format")
        return []
      }

      const validAds = result.data.filter((ad: any) => {
        const isValid =
          ad?.ad_url &&
          ad?.status === "published" &&
          ((adType === AdTypes.Tile && ad?.tile_image) ||
            (adType === AdTypes.FixedBanner && ad?.banner_image && ad?.banner_image_mobile) ||
            (adType === AdTypes.InArticleStandard && ad?.banner_image && ad?.banner_image_mobile))

        if (!isValid) {
          console.warn(`Invalid ad data found for ID: ${ad?.id}`)
        }
        return isValid
      })

      return validAds
    } catch (error) {
      console.error("Error fetching ads:", error)
      return []
    }
  }

  const ads = await adsData({ adType: type as AdTypes })
  return Response.json(ads, { headers })
}
