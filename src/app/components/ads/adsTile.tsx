import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useState } from "react"
import { AdTypes, getAds } from "../../../../lib/utils/ads"

const AdsTile = () => {
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = getAds({ adType: AdTypes.Tile })
        // Fetch all the data in parallel
        const [fetchedAds] = await Promise.all([ads])
        // Update the state with the fetched data as it becomes available
        setCurrentAds(fetchedAds)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [currentAds])

  if (!currentAds) {
    return <div>Loading...</div>
  }

  // filter the ads that are only ad.ad_type === "tile"
  const tileAds = currentAds.filter((ad: Ads) => ad.ad_type === "tile")
  if (tileAds.length === 0) {
    return null
  }

  // get only the currentAds where today is equal to or between the start_date and end_date
  const currentDate = new Date()
  const filteredTileAds = tileAds.filter((ad: Ads) => {
    const startDate = new Date(ad.start_date)
    const endDate = new Date(ad.end_date)
    return (
      (startDate <= currentDate && currentDate <= endDate) ||
      startDate.toDateString() === currentDate.toDateString() ||
      endDate.toDateString() === currentDate.toDateString()
    )
  })

  const ramdomizeTileAds = filteredTileAds.sort(() => Math.random() - 0.5)
  const tiles = ramdomizeTileAds.map((ad: Ads, i: number) => {
    if (!ad.tile_image || !ad.ad_url) {
      return
    }
    const adImage = ad.tile_image
    const width = adImage.width ?? 0
    const height = adImage.height ?? 0
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${ad.tile_image.filename_disk}`
    const size = 147
    const scaledWidth = width > size ? size : width
    const scaledHeight = width > size ? (size * height) / width : (height * scaledWidth) / width

    return (
      <div key={`adtile-${i}`} className="">
        <Link href={ad.ad_url} target="_blank">
          <Image
            src={src}
            width={scaledWidth}
            height={scaledHeight}
            alt={ad.campaign_title}
            onLoad={() =>
              sendGAEvent("event", "impression", {
                event_category: "ads",
                event_label: ad.slug,
                event_value: ad.ad_url,
                ad_format: AdTypes.Tile,
                campaign: ad.campaign_title,
                campaign_id: ad.slug,
                ad_position: i + 1,
                ad_source: "br-studio",
              })
            }
            onClick={() =>
              sendGAEvent("event", "click", {
                event_category: "ads",
                event_label: ad.slug,
                event_value: ad.ad_url,
                ad_format: AdTypes.Tile,
                campaign: ad.campaign_title,
                campaign_id: ad.slug,
                ad_position: i + 1,
                ad_source: "br-studio",
              })
            }
          />
        </Link>
      </div>
    )
  })

  return (
    <div className="flex flex-col divide-y-[1px] rail-divide">
      <p className="pb-0.5 text-[11px] leading-4 uppercase text-zinc-700 dark:text-slate-400">Advertisements</p>
      <div className="py-2 flex flex-col space-y-4">{tiles}</div>
    </div>
  )
}

export default AdsTile
