import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"
import { useEffect, useState } from "react"
import { AdTypes, getAds } from "../../../../lib/utils/ads"

const Ad970 = () => {
  const [randomAd, setRandomAd] = useState<Ads | undefined>(undefined) // Store the randomly selected ad
  const [showAd, setShowAd] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ads = await getAds({ adType: AdTypes.Banner })
        const [fetchedAds] = await Promise.all([ads])

        if (fetchedAds.length > 0) {
          const randomAd = fetchedAds[Math.floor(Math.random() * fetchedAds.length)]
          setRandomAd(randomAd) // Set the random ad here
        }
      } catch (error) {
        console.error("Failed to fetch Ad data on Article page:", error)
      }
    }

    fetchData()
  }, [])

  if (!randomAd) {
    return null // Don't render anything until the random ad is selected
  }

  const { banner_image, banner_image_mobile, ad_url, campaign_title, slug } = randomAd
  if (!banner_image || !banner_image_mobile || !ad_url) {
    return null
  }

  const alt = campaign_title
  const desktopImage = banner_image
  const srcDesktop = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${desktopImage.filename_disk}`
  const desktopSize = 1008
  const dwidth = desktopImage.width ?? 0
  const dheight = desktopImage.height ?? 0
  const desktopWidth = dwidth > desktopSize ? desktopSize : dwidth
  const desktopHeight = dwidth > desktopSize ? (desktopSize * dheight) / dwidth : (dheight * desktopWidth) / dwidth

  const mobileImage = banner_image_mobile
  const srcMobile = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${mobileImage.filename_disk}`
  const mwidth = mobileImage.width ?? 0
  const mheight = mobileImage.height ?? 0
  const mobileSize = 640
  const mobileWidth = mwidth > mobileSize ? mobileSize : mwidth
  const mobileHeight = mwidth > mobileSize ? (mobileSize * mheight) / mwidth : (mheight * mobileWidth) / mwidth

  return (
    showAd && (
      <div className="m-0 mt-2 fixed bottom-0 left-0 right-0 z-20 pt-1.5 tablet-lg:py-1.5 tablet-lg:pb-3 overflow-hidden bg-white bg-opacity-80 backdrop-blur-md">
        {/* <div className="absolute -z-10 top-0 bottom-0 left-0 right-0 bg-white backdrop-blur-md"></div> */}
        <button
          className="py-0 px-3 border border-zinc-200 text-zinc-500 text-center absolute -top-7 right-2 font-medium text-xs tablet:text-sm rounded-full bg-white flex items-center justify-center space-x-1 uppercase"
          onClick={() => setShowAd(false)}
        >
          <span className="hover:underline">Close</span> <span className="text-sm">&#x2715;</span>
        </button>
        <p className="z-10 text-[11px] leading-4 text-center uppercase text-gray-700">Advertisement</p>
        <div>
          <Link href={ad_url} target="_blank">
            <Image
              className="hidden tablet:block mx-auto"
              src={srcDesktop}
              width={desktopWidth}
              height={desktopHeight}
              alt={alt}
              onLoad={(e) => {
                sendGAEvent("event", "impression", {
                  event_category: "ads",
                  event_label: slug,
                  event_value: ad_url,
                  ad_format: AdTypes.Banner,
                  campaign: campaign_title,
                  campaign_id: slug,
                  ad_source: "br-studio",
                })
              }}
              onClick={() =>
                sendGAEvent("event", "click", {
                  event_category: "ads",
                  event_label: slug,
                  event_value: ad_url,
                  ad_format: AdTypes.Banner,
                  campaign: campaign_title,
                  campaign_id: slug,
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
                sendGAEvent("event", "impression", {
                  event_category: "ads",
                  event_label: slug,
                  event_value: ad_url,
                })
              }}
              onClick={() =>
                sendGAEvent("event", "click", {
                  event_category: "ads",
                  event_label: slug,
                  event_value: ad_url,
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
