import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useState } from "react"
import { AdTypes, getAds } from "../../../../lib/utils/ads"

const AdsTileStrip = () => {
  const [randomAds, setRandomAds] = useState<Ads[] | undefined>(undefined) // Store the randomly selected ad

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ads = await getAds({ adType: AdTypes.Tile })
        const filteredAds = ads.filter((ad) => ad.ad_type === "tile")

        if (filteredAds.length > 0) {
          const shuffledAds = filteredAds.sort(() => 0.5 - Math.random())
          setRandomAds(shuffledAds) // Set the shuffled ads array here
        }
      } catch (error) {
        console.error("Failed to fetch Ad data on Article page:", error)
      }
    }

    fetchData()
  }, [])

  if (!randomAds) {
    return (
      <div className="flex flex-col py-3 pb-6 bg-zinc-700">
        <p className="pb-0.5 text-slate-100 text-[11px] text-center leading-4 uppercase dark:text-slate-400">
          Advertisements
        </p>
        <p className="min-h-[147px] text-center text-slate-100 text-sm">Loading...</p>
      </div>
    )
  }

  const tiles = randomAds.map((ad: Ads, i: number) => {
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
            sizes="20vw"
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
      </li>
    )
  })

  return (
    <div className="flex flex-col py-3 pb-6 bg-zinc-700">
      <p className="pb-0.5 text-slate-100 text-[11px] text-center leading-4 uppercase dark:text-slate-400">
        Advertisements
      </p>
      <ul className={`flex w-full justify-center items-center space-x-4 overflow-x-auto scroll-smooth min-h-[147px]`}>
        {tiles}
      </ul>
    </div>
  )
}

export default AdsTileStrip
