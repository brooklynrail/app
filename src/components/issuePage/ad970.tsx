import { Ads } from "../../../lib/types"
import Image from "next/image"

interface Ad970Props {
  ads: Array<Ads>
}

const Ad970 = (props: Ad970Props) => {
  const { ads } = props
  const src = `https://placehold.co/1008x101/C57AFF/9D20FF`
  const src_mobile = `https://placehold.co/1008x101/C57AFF/9D20FF`
  const alt = `alt text for ad970`
  const href = `https://example.com`

  return (
    <>
      <div className="ad ad_970 visible">
        <p>Advertisement</p>
        <div>
          <div className="ad">
            <a href={href} target="_blank">
              <img className="image_desktop" alt={alt} src={src} />
              <img className="image_mobile" alt={alt} src={src_mobile} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ad970
