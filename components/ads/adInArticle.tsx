import { Ads } from "@/lib/types"
import { AdTypes } from "@/lib/utils/ads"
import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"
import Link from "next/link"
import { usePostHog } from "posthog-js/react"
import { useCallback, useEffect, useRef, useState } from "react"

const AdInArticle = () => {
  const [currentAd, setCurrentAd] = useState<Ads | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const posthog = usePostHog()
  const adRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Fetch ad data only once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/ads/?type=${AdTypes.InArticleStandard}`,
        )
        const ads = await adsResponse.json()

        if (Array.isArray(ads) && ads.length > 0) {
          const selectedAd = ads[Math.floor(Math.random() * ads.length)]
          setCurrentAd(selectedAd)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch Ad data on Article page:", error)
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [])

  // Memoized function to handle GA and PostHog events
  const handleAdEvent = useCallback(
    (action: "impression" | "click") => {
      if (currentAd) {
        const { slug, ad_url, campaign_title } = currentAd

        // Send PostHog event
        if (posthog) {
          posthog.capture(`${action}_ad`, {
            slug,
            campaign_title,
            ad_format: AdTypes.InArticleStandard,
          })
        }

        // Send GA event
        sendGAEvent("event", action, {
          event_category: "ads",
          event_label: slug,
          event_value: ad_url,
          ad_format: AdTypes.InArticleStandard,
          campaign: campaign_title,
          campaign_id: slug,
          ad_source: "br-studio",
        })
      }
    },
    [currentAd, posthog],
  )

  // Use IntersectionObserver to track if the ad is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting && currentAd) {
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
  }, [currentAd, handleAdEvent])

  if (!currentAd || !currentAd.banner_image || !currentAd.banner_image_mobile || !currentAd.ad_url) {
    // Only show DonationAd if we've attempted to fetch ads (randomAd is null) and found none
    if (!isLoading && !currentAd) {
      // return <DonationAd />
      return <></>
    }
    // Otherwise show nothing while we're still loading
    return <></>
  }

  const { banner_image, banner_image_mobile, ad_url, campaign_title } = currentAd
  const desktopSrc = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${banner_image.filename_disk}`
  const mobileSrc = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${banner_image_mobile.filename_disk}`

  const getImageDimensions = (image: { width?: number; height?: number }, maxWidth: number) => {
    const width = image.width ?? 0
    const height = image.height ?? 0
    const scaledWidth = width > maxWidth ? maxWidth : width
    const scaledHeight = width > maxWidth ? (maxWidth * height) / width : (height * scaledWidth) / width
    return { width: scaledWidth, height: scaledHeight }
  }

  const desktopDimensions = getImageDimensions(banner_image, 900)
  const mobileDimensions = getImageDimensions(banner_image_mobile, 640)

  return (
    <div
      ref={adRef}
      className="w-full max-w-[120ex] m-0 my-12 pt-1 pb-5 tablet-lg:pt-1 bg-white dark:bg-zinc-700 bg-opacity-80 backdrop-blur-md clear-both"
    >
      <p className="z-10 text-[10px] leading-4 text-center uppercase text-gray-700 dark:text-slate-100">
        Advertisement
      </p>
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
}

export default AdInArticle
