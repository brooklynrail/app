import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { Ads } from "../../../../lib/types"
import { AdTypes } from "../../../../lib/utils/ads"
import { usePostHog } from "posthog-js/react"

const AdsTileStrip = () => {
  const [randomAds, setRandomAds] = useState<Ads[] | undefined>(undefined)
  const posthog = usePostHog()

  // Fetch ad data only once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ads/?type=${AdTypes.Tile}`)
        const ads = await adsResponse.json()

        if (Array.isArray(ads) && ads.length > 0) {
          const shuffledAds = ads.sort(() => 0.5 - Math.random())
          setRandomAds(shuffledAds)
        }
      } catch (error) {
        console.error("Failed to fetch Ad data on Article page:", error)
      }
    }

    fetchData()
  }, [])

  // Unified event handler for PostHog and GA tracking
  const handleAdEvent = useCallback(
    (action: "impression" | "click", ad: Ads, position: number) => {
      const { slug, ad_url, campaign_title } = ad

      // PostHog tracking
      if (posthog) {
        posthog.capture(`${action}_ad`, {
          slug,
          campaign_title,
          ad_format: AdTypes.Tile,
        })
      }

      // GA tracking
      sendGAEvent("event", action, {
        event_category: "ads",
        event_label: slug,
        event_value: ad_url,
        ad_format: AdTypes.Tile,
        campaign: campaign_title,
        campaign_id: slug,
        ad_position: position,
        ad_source: "br-studio",
      })
    },
    [posthog],
  )

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
      <li key={`adtile-${ad.id}`} className="flex-none">
        <Link href={ad.ad_url} target="_blank" onClick={() => handleAdEvent("click", ad, i + 1)}>
          <Image
            src={src}
            width={scaledWidth}
            height={scaledHeight}
            sizes="20vw"
            alt={ad.campaign_title}
            onLoad={() => handleAdEvent("impression", ad, i + 1)}
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
      <ul className="flex w-full justify-center items-center space-x-4 overflow-x-auto scroll-smooth min-h-[147px]">
        {tiles}
      </ul>
    </div>
  )
}

export default AdsTileStrip
