import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useState } from "react"
import { getAds } from "../../../../lib/utils"

const AdsTileStrip = () => {
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = getAds()
        const [fetchedAds] = await Promise.all([ads])
        setCurrentAds(fetchedAds)
      }
    }
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [currentAds])

  if (!currentAds) {
    return <p>Loading...</p>
  }

  // Filter the ads to only display tiles
  const tileAds = currentAds.filter((ad: Ads) => ad.ad_type === "tile")
  if (tileAds.length === 0) {
    return null
  }

  // Randomize the ads and duplicate them for infinite scrolling effect
  const randomizedTileAds = tileAds.sort(() => Math.random() - 0.5)

  const tiles = randomizedTileAds.map((ad: Ads, i: number) => {
    if (!ad.tile_image || !ad.ad_url) {
      return null
    }
    const adImage = ad.tile_image
    const width = adImage.width ?? 0
    const height = adImage.height ?? 0
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${ad.tile_image.filename_disk}`
    const size = 147
    const scaledWidth = width > size ? size : width
    const scaledHeight = width > size ? (size * height) / width : (height * scaledWidth) / width

    return (
      <li key={`adtile-${i}`} className="flex-none">
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
                ad_format: "tile",
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
                ad_format: "tile",
                campaign: ad.campaign_title,
                campaign_id: ad.slug,
                ad_position: i + 1,
                ad_source: "br-studio",
              })
            }
          />
        </Link>
      </li>
    )
  })

  return (
    <div className="flex flex-col tablet-lg:hidden py-6 !border-b-[1px] rail-border">
      <p className="pb-0.5 text-[11px] leading-4 uppercase text-zinc-700 dark:text-slate-400">Advertisements</p>
      <ul className={`flex items-center space-x-4 overflow-x-auto scroll-smooth`}>{tiles}</ul>
    </div>
  )
}

export default AdsTileStrip
