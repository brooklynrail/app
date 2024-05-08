import parse from "html-react-parser"
import { DirectusFiles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import { PromoProps, PromoSectionName } from "./standard"
import Link from "next/link"

interface PromoImageProps {
  image: DirectusFiles
  title: string
}
export const PromoImage = (props: PromoImageProps) => {
  const { image, title } = props
  const { filename_disk } = image
  if (!filename_disk || !image.width || !image.height) {
    return <></>
  }
  const caption = image.caption ? image.caption : `${stripHtml(title).result}`
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  return (
    <Image
      src={src}
      width={image.width}
      height={image.height}
      sizes="33vw"
      style={{
        width: "100%",
        height: "auto",
      }}
      alt={caption}
    />
  )
}

const PromoSection = (props: PromoProps) => {
  const { article, showSection, showImage, permalink, order } = props
  const { title, excerpt, featured_image } = article

  const orderNum = (
    <span className="sort">
      <span>{order}</span>
    </span>
  )

  return (
    <div className="promo promo-section" itemType="http://schema.org/Article">
      <div className="grid-row grid-gap-4">
        <div className="grid-col-12 tablet:grid-col-8">
          {showSection && <PromoSectionName {...props} />}
          <h4>
            {orderNum}
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {parse(title)}
            </Link>
          </h4>
          <p className="excerpt">{parse(excerpt)}</p>
        </div>
        <div className="grid-col-12 tablet:grid-col-4">
          {showImage && featured_image && (
            <div className={`media`}>
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <PromoImage image={featured_image} title={title} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default PromoSection
