import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"

interface Ad970Props {
  currentAds?: Array<Ads>
}

const Ad970 = (props: Ad970Props) => {
  const { currentAds } = props
  if (!currentAds) {
    return <>Loading...</>
  }

  const filteredAds = currentAds.filter((ad) => ad.ad_type === "banner")
  if (filteredAds.length === 0) {
    return <></>
  }

  const randomAd = filteredAds[Math.floor(Math.random() * filteredAds.length)]
  if (!randomAd.banner_image || !randomAd.banner_image_mobile || !randomAd.ad_url) {
    return <></>
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

  return (
    <>
      <div className="m-0 mt-2 relative bottom-0 left-0 right-0 z-10 tablet:relative bg-white tablet:bg-transparent">
        <p className="text-[11px] leading-4 text-center uppercase text-gray-700">Advertisement</p>
        <div>
          <Link href={randomAd.ad_url} target="_blank">
            <Image
              className="hidden tablet:block mx-auto"
              src={srcDesktop}
              width={desktopWidth}
              height={desktopHeight}
              alt={alt}
              onLoad={() =>
                sendGAEvent("event", "impression", {
                  event_category: "ads",
                  event_label: randomAd.slug,
                  event_value: randomAd.ad_url,
                  ad_format: "banner",
                  campaign: randomAd.campaign_title,
                  campaign_id: randomAd.slug,
                  ad_source: "br-studio",
                })
              }
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
              onLoad={() =>
                sendGAEvent("event", "impression", {
                  event_category: "ads",
                  event_label: randomAd.slug,
                  event_value: randomAd.ad_url,
                })
              }
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
    </>
  )
}

export default Ad970
