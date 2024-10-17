import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useRef, useState } from "react"
import { getAds } from "../../../../lib/utils"
import { FastAverageColor } from "fast-average-color"

const Ad970 = () => {
  const [currentAds, setCurrentAds] = useState<Ads[] | undefined>(undefined)
  const [bgColor, setBgColor] = useState<string | null>(null) // State to track the background color
  const imageRef = useRef(null) // Ref for the image element
  const [showAd, setShowAd] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!currentAds) {
        const ads = getAds()
        const [fetchedAds] = await Promise.all([ads])
        setCurrentAds(fetchedAds)
      }
    }

    fetchData().catch((error) => console.error("Failed to fetch Ad data on Article page:", error))
  }, [currentAds])

  if (!currentAds) {
    return null
  }

  const filteredAds = currentAds.filter((ad) => ad.ad_type === "banner")
  if (filteredAds.length === 0) {
    return null
  }

  const randomAd = filteredAds[Math.floor(Math.random() * filteredAds.length)]
  if (!randomAd.banner_image || !randomAd.banner_image_mobile || !randomAd.ad_url) {
    return null
  }

  const alt = randomAd.campaign_title
  const desktopImage = randomAd.banner_image
  const srcDesktop = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${desktopImage.filename_disk}`
  const desktopSize = 1008
  const dwidth = desktopImage.width ?? 0
  const dheight = desktopImage.height ?? 0
  const desktopWidth = dwidth > desktopSize ? desktopSize : dwidth
  const desktopHeight = dwidth > desktopSize ? (desktopSize * dheight) / dwidth : (dheight * desktopWidth) / dwidth

  const mobileImage = randomAd.banner_image_mobile
  const srcMobile = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${mobileImage.filename_disk}`
  const mwidth = mobileImage.width ?? 0
  const mheight = mobileImage.height ?? 0
  const mobileSize = 640
  const mobileWidth = mwidth > mobileSize ? mobileSize : mwidth
  const mobileHeight = mwidth > mobileSize ? (mobileSize * mheight) / mwidth : (mheight * mobileWidth) / mwidth

  // Function to extract and set the dominant color using `fast-average-color`
  const handleImageLoad = async (imageElement: HTMLImageElement) => {
    try {
      const fac = new FastAverageColor()
      let color = await fac.getColorAsync(imageElement, { algorithm: "dominant", ignoredColor: [255, 255, 255, 255] })
      setBgColor(color.rgba) // Update the background color
    } catch (error) {
      console.error("Error extracting color:", error)
    }
  }

  return (
    showAd && (
      <div
        style={{ backgroundColor: bgColor ? `${bgColor}` : "#FFFFFF" }}
        className={`m-0 mt-2 bg-slate-300 fixed bottom-0 left-0 right-0 z-10 pt-1.5 tablet-lg:pt-3 pb-3 tablet-lg:pb-6`}
      >
        <div className="absolute -z-10 top-0 bottom-0 left-0 right-0 bg-white bg-opacity-30"></div>
        <button
          className="w-10 h-10 text-center absolute top-3 right-3 text-zinc-700 font-medium text-2xl tablet:text-3xl rounded-full bg-white bg-opacity-40 hover:bg-opacity-60"
          onClick={() => setShowAd(false)}
        >
          &#x2715;
        </button>
        <p className="z-10 text-[11px] leading-4 text-center uppercase text-gray-700">Advertisement</p>
        <div>
          <Link href={randomAd.ad_url} target="_blank">
            <Image
              ref={imageRef} // Attach the ref to the Image component
              className="hidden tablet:block mx-auto"
              src={srcDesktop}
              width={desktopWidth}
              height={desktopHeight}
              alt={alt}
              onLoad={(e) => {
                handleImageLoad(e.currentTarget) // Use the loaded image to extract color
                sendGAEvent("event", "impression", {
                  event_category: "ads",
                  event_label: randomAd.slug,
                  event_value: randomAd.ad_url,
                  ad_format: "banner",
                  campaign: randomAd.campaign_title,
                  campaign_id: randomAd.slug,
                  ad_source: "br-studio",
                })
              }}
              onClick={() =>
                sendGAEvent("event", "click", {
                  event_category: "ads",
                  event_label: randomAd.slug,
                  event_value: randomAd.ad_url,
                  ad_format: "banner",
                  campaign: randomAd.campaign_title,
                  campaign_id: randomAd.slug,
                  ad_source: "br-studio",
                })
              }
            />
            <Image
              className="block tablet:hidden"
              src={srcMobile}
              width={mobileWidth}
              height={mobileHeight}
              alt={alt}
              onLoad={(e) => {
                handleImageLoad(e.currentTarget) // Use the loaded image to extract color
                sendGAEvent("event", "impression", {
                  event_category: "ads",
                  event_label: randomAd.slug,
                  event_value: randomAd.ad_url,
                })
              }}
              onClick={() =>
                sendGAEvent("event", "click", {
                  event_category: "ads",
                  event_label: randomAd.slug,
                  event_value: randomAd.ad_url,
                })
              }
            />
          </Link>
        </div>
      </div>
    )
  )
}

export default Ad970
