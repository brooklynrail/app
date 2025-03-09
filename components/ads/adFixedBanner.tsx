import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useCallback, useRef } from "react"
import { Ads } from "@/lib/types"
import { AdTypes } from "@/lib/utils/ads"
import { useAdVisibility } from "@/app/hooks/adVisibilityContext"
import { usePostHog } from "posthog-js/react"

const AdFixedBanner = () => {
  const [randomAd, setRandomAd] = useState<Ads | null>(null)
  const { isAdVisible, closeAd } = useAdVisibility()
  const posthog = usePostHog()
  const adRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Fetch ad data only once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const adsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ads/?type=${AdTypes.FixedBanner}`)
        const ads = await adsResponse.json()

        // More explicit handling of empty ads
        if (!Array.isArray(ads)) {
          console.warn("Invalid ads data format received")
          setRandomAd(null)
          return
        }

        if (ads.length === 0) {
          console.info("No active ads available")
          setRandomAd(null)
          return
        }

        const selectedAd = ads[Math.floor(Math.random() * ads.length)]
        setRandomAd(selectedAd)
      } catch (error) {
        console.error("Failed to fetch Ad data:", error)
        setRandomAd(null)
      }
    }

    void fetchData()
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
            ad_format: AdTypes.FixedBanner,
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
          ad_format: AdTypes.FixedBanner,
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
        if (entry.isIntersecting && isInView && randomAd) {
          handleAdEvent("impression")
        }
      },
      { threshold: 0.5 },
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current)
      }
    }
  }, [randomAd, handleAdEvent, isInView])

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
        className="m-0 fixed bottom-0 left-0 right-0 z-20 pt-1 tablet-lg:pt-1 bg-white dark:bg-zinc-700 bg-opacity-80 dark:bg-opacity-60 backdrop-blur-md"
      >
        <button
          className="border border-zinc-200 text-zinc-700 text-center shadow-lg absolute -top-3.5 tablet:-top-5 right-3 rounded-full bg-white w-8 tablet:w-9 h-8 tablet:h-9 flex items-center justify-center"
          onClick={() => handleAdEvent("close")}
        >
          <span className="text-lg tablet:text-xl font-bold">&#x2715;</span>
        </button>
        <p className="z-10 text-[10px] leading-4 text-center uppercase text-gray-700 dark:text-slate-100">
          Advertisement
        </p>
        <div className="flex justify-center items-center">
          <Link href={ad_url} target="_blank" onClick={() => handleAdEvent("click")}>
            <Image
              className="hidden tablet:block"
              src={desktopSrc}
              priority={true}
              width={desktopDimensions.width}
              height={desktopDimensions.height}
              alt={campaign_title}
              onLoad={() => setIsInView(true)}
            />
            <Image
              className="block tablet:hidden"
              src={mobileSrc}
              priority={true}
              width={mobileDimensions.width}
              height={mobileDimensions.height}
              alt={campaign_title}
              onLoad={() => setIsInView(true)}
            />
          </Link>
        </div>
      </div>
    )
  )
}

export default AdFixedBanner
