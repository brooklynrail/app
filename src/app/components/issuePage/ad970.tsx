import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"

interface Ad970Props {
  currentAds?: Array<Ads>
}

const Ad970 = (props: Ad970Props) => {
  const { currentAds } = props
  if (!currentAds) {
    return <>Loading...</>
  }

  const filteredAds = currentAds.filter((ad) => ad.ad_type === "banner")
  const banners = filteredAds.map((ad: Ads, i: number) => {
    if (!ad.banner_image || !ad.banner_image_mobile || !ad.ad_url) {
      return
    }
    const alt = ad.title
    const desktopImage = ad.banner_image
    const srcDesktop = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${desktopImage.filename_disk}`
    const desktopSize = 1008
    const dwidth = desktopImage.width ?? 0
    const dheight = desktopImage.height ?? 0
    const desktopWidth = dwidth > desktopSize ? desktopSize : dwidth
    const desktopHeight = dwidth > desktopSize ? (desktopSize * dheight) / dwidth : (dheight * desktopWidth) / dwidth

    const mobileImage = ad.banner_image_mobile
    const srcMobile = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${mobileImage.filename_disk}`
    const mwidth = mobileImage.width ?? 0
    const mheight = mobileImage.height ?? 0
    const mobileSize = 640
    const mobileWidth = mwidth > mobileSize ? mobileSize : mwidth
    const mobileHeight = mwidth > mobileSize ? (mobileSize * mheight) / mwidth : (mheight * mobileWidth) / mwidth

    if (filteredAds === undefined || filteredAds.length === 0) {
      return <></>
    }

    return (
      <div key={`adtile-${i}`} className="ad">
        <Link href={ad.ad_url} target="_blank">
          <Image className="image_desktop" src={srcDesktop} width={desktopWidth} height={desktopHeight} alt={alt} />
          <Image className="image_mobile" src={srcMobile} width={mobileWidth} height={mobileHeight} alt={alt} />
        </Link>
      </div>
    )
  })

  if (banners === undefined || banners.length === 0) {
    return <></>
  }

  return (
    <>
      <section className="banner">
        <div className="grid-container grid-container-desktop">
          <div className="grid-row">
            <div className="grid-col-12">
              <div className="ad ad_970 visible">
                <p>Advertisement</p>
                <div>{banners}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Ad970
