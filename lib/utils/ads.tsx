import { cache } from "react"
import { Ads } from "../types"

export enum AdTypes {
  Banner = "banner",
  Tile = "tile",
}

interface GetAdsProps {
  adType: AdTypes
}

export const getAds = cache(async (props: GetAdsProps): Promise<Ads[]> => {
  const { adType } = props

  const today = new Date()
  const adsAPI =
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/ads` +
    `?fields[]=ad_type` +
    `&fields[]=ad_url` +
    `&fields[]=start_date` +
    `&fields[]=end_date` +
    `&fields[]=status` +
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
    const res = await fetch(adsAPI)
    if (!res.ok) {
      console.error(`Failed to fetch ADs data: ${res.statusText}`)
      return []
    }

    const result = await res.json()

    if (!result || !result.data || !Array.isArray(result.data)) {
      console.error("Invalid data format received")
      return []
    }

    console.log("result.data", result.data)
    return result.data as Ads[]
  } catch (error) {
    console.error("Error fetching ads:", error)
    return []
  }
})
