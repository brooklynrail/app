import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useCallback, useRef } from "react"
import { Ads } from "../../../../lib/types"
import { AdTypes } from "../../../../lib/utils/ads"
import { useAdVisibility } from "@/app/hooks/adVisibilityContext"
import { usePostHog } from "posthog-js/react"

const Ad970 = () => {
  const [randomAd, setRandomAd] = useState<Ads | null>(null)
  const { isAdVisible, closeAd } = useAdVisibility()
  const posthog = usePostHog()
  const adRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

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

  // Memoized function to handle GA and PostHog events
  const handleAdEvent = useCallback(
    (action: "impression" | "click" | "close") => {
      if (isAdVisible && randomAd) {
        const { slug, ad_url, campaign_title } = randomAd

        // Send PostHog event
        if (posthog) {
          posthog.capture(`${action}_ad`, {
            slug,
            campaign_title,
            ad_format: AdTypes.Banner,
          })
        }

        if (action === "close") {
          closeAd()
        }

        // Send GA event
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
    [randomAd, isAdVisible, posthog],
  )

  // Use IntersectionObserver to track if the ad is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting && randomAd) {
          handleAdEvent("impression")
        }
      },
      { threshold: 0.5 },
      // A threshold of 0.5 means the ad must be at least 50% visible in the viewport to count as an impression.
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current)
      }
    }
  }, [randomAd, handleAdEvent])

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
      <div
        ref={adRef}
        className="m-0 fixed bottom-0 left-0 right-0 z-20 pt-1 tablet-lg:pt-1 bg-white bg-opacity-80 backdrop-blur-md"
      >
        <button
          className="border border-zinc-200 text-zinc-700 text-center shadow-lg absolute -top-3.5 tablet:-top-5 right-3 rounded-full bg-white w-8 tablet:w-9 h-8 tablet:h-9 flex items-center justify-center"
          onClick={() => handleAdEvent("close")}
        >
          <span className="text-lg tablet:text-xl font-bold">&#x2715;</span>
        </button>
        <p className="z-10 text-[10px] leading-4 text-center uppercase text-gray-700">Advertisement</p>
        <div className="flex justify-center items-center">
          <Link href={ad_url} target="_blank" onClick={() => handleAdEvent("click")}>
            <Image
              className="hidden tablet:block"
              src={desktopSrc}
              width={desktopDimensions.width}
              height={desktopDimensions.height}
              alt={campaign_title}
            />
            <Image
              className="block tablet:hidden"
              src={mobileSrc}
              width={mobileDimensions.width}
              height={mobileDimensions.height}
              alt={campaign_title}
            />
          </Link>
        </div>
      </div>
    )
  )
}

export default Ad970
