import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { Ads } from "../../../../lib/types"
import { AdTypes } from "../../../../lib/utils/ads"
import { useAdVisibility } from "@/app/hooks/adVisibilityContext"

const Ad970 = () => {
  const [randomAd, setRandomAd] = useState<Ads | null>(null)
  const { isAdVisible, closeAd } = useAdVisibility()

  // Fetch ad data only once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ads/?type=${AdTypes.Banner}`)
        const ads = await adsResponse.json()

        if (Array.isArray(ads) && ads.length > 0) {
          const selectedAd = ads[Math.floor(Math.random() * ads.length)]
          setRandomAd(selectedAd)
        }
      } catch (error) {
        console.error("Failed to fetch Ad data on Article page:", error)
      }
    }

    fetchData()
  }, [])

  // Memoized function to handle GA events for impressions and clicks
  const handleGAEvent = useCallback(
    (action: "impression" | "click") => {
      if (isAdVisible && randomAd) {
        // Ensure ad is shown before logging
        const { slug, ad_url, campaign_title } = randomAd
        sendGAEvent("event", action, {
          event_category: "ads",
          event_label: slug,
          event_value: ad_url,
          ad_format: AdTypes.Banner,
          campaign: campaign_title,
          campaign_id: slug,
          ad_source: "br-studio",
        })
      }
    },
    [randomAd, isAdVisible], // Depend on `randomAd` and `isAdVisible`
  )

  // Trigger a new impression when `randomAd` changes, if `isAdVisible` is true
  useEffect(() => {
    if (isAdVisible && randomAd) {
      handleGAEvent("impression")
    }
  }, [randomAd, handleGAEvent, isAdVisible])

  // Listen for new ad impressions when navigating
  useEffect(() => {
    const handleNewAdImpression = () => {
      if (isAdVisible) {
        handleGAEvent("impression")
      }
    }

    document.addEventListener("newAdImpression", handleNewAdImpression)
    return () => {
      document.removeEventListener("newAdImpression", handleNewAdImpression)
    }
  }, [handleGAEvent, isAdVisible])

  if (!randomAd || !randomAd.banner_image || !randomAd.banner_image_mobile || !randomAd.ad_url) {
    return null
  }

  const { banner_image, banner_image_mobile, ad_url, campaign_title } = randomAd
  const desktopSrc = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${banner_image.filename_disk}`
  const mobileSrc = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${banner_image_mobile.filename_disk}`

  const getImageDimensions = (image: { width?: number; height?: number }, maxWidth: number) => {
    const width = image.width ?? 0
    const height = image.height ?? 0
    const scaledWidth = width > maxWidth ? maxWidth : width
    const scaledHeight = width > maxWidth ? (maxWidth * height) / width : (height * scaledWidth) / width
    return { width: scaledWidth, height: scaledHeight }
  }

  const desktopDimensions = getImageDimensions(banner_image, 1008)
  const mobileDimensions = getImageDimensions(banner_image_mobile, 640)

  return (
    isAdVisible && (
      <div className="m-0 fixed bottom-0 left-0 right-0 z-20 pt-1 tablet-lg:pt-1 bg-white bg-opacity-80 backdrop-blur-md">
        <button
          className="py-0 px-3 border border-zinc-200 text-zinc-500 text-center absolute -top-7 right-2 font-medium text-xs tablet:text-sm rounded-full bg-white flex items-center justify-center space-x-1 uppercase"
          onClick={closeAd} // Use `closeAd` from the hook to hide the ad
        >
          <span className="hover:underline">Close</span> <span className="text-sm">&#x2715;</span>
        </button>
        <p className="z-10 text-[10px] leading-4 text-center uppercase text-gray-700">Advertisement</p>
        <div>
          <Link href={ad_url} target="_blank">
            <Image
              className="hidden tablet:block mx-auto"
              src={desktopSrc}
              width={desktopDimensions.width}
              height={desktopDimensions.height}
              alt={campaign_title}
              onLoad={() => isAdVisible && handleGAEvent("impression")}
              onClick={() => handleGAEvent("click")}
            />
            <Image
              className="block tablet:hidden"
              src={mobileSrc}
              width={mobileDimensions.width}
              height={mobileDimensions.height}
              alt={campaign_title}
              onLoad={() => isAdVisible && handleGAEvent("impression")}
              onClick={() => handleGAEvent("click")}
            />
          </Link>
        </div>
      </div>
    )
  )
}

export default Ad970
