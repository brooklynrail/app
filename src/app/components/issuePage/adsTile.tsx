import Link from "next/link"
import { Ads } from "../../../../lib/types"
import Image from "next/image"

interface AdsTileProps {
  currentAds?: Array<Ads>
}

const AdsTile = (props: AdsTileProps) => {
  const { currentAds } = props

  if (!currentAds) {
    return <>Loading...</>
  }

  // filter the ads that are only ad.ad_type === "tile"
  const tileAds = currentAds.filter((ad: Ads) => ad.ad_type === "tile")
  if (tileAds.length === 0) {
    return <></>
  }

  const tiles = tileAds.map((ad: Ads, i: number) => {
    if (!ad.tile_image || !ad.ad_url) {
      return
    }
    const adImage = ad.tile_image
    const width = adImage.width ?? 0
    const height = adImage.height ?? 0
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${ad.tile_image.filename_disk}`
    const size = 147
    const scaledWidth = width > size ? size : width
    const scaledHeight = width > size ? (size * height) / width : (height * scaledWidth) / width

    return (
      <div key={`adtile-${i}`} className="ad">
        <Link href={ad.ad_url} target="_blank">
          <Image src={src} width={scaledWidth} height={scaledHeight} alt={`description`} />
        </Link>
      </div>
    )
  })

  return (
    <div id="extra">
      <div id="ads">
        <div className="ad_label">ADVERTISEMENTS</div>
        <div className="ads_container">{tiles}</div>
      </div>
    </div>
  )
}

export default AdsTile
