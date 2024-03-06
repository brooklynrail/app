import { Ads } from "../../../lib/types"
import Image from "next/image"

interface AdsTileProps {
  ads: Array<Ads>
}

const AdsTile = (props: AdsTileProps) => {
  const { ads } = props

  // limit ads to any 5 from the array
  const limitedAds = ads.slice(0, 5)
  const tiles = limitedAds.map((ad: Ads, i: number) => {
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
        <a href={ad.ad_url} target="_blank">
          <Image src={src} width={scaledWidth} height={scaledHeight} alt={`description`} />
        </a>
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
