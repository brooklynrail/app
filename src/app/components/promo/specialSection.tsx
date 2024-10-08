import parse from "html-react-parser"
import { DirectusFiles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import { PromoProps, PromoSectionName } from "./standard"
import Link from "next/link"
import { PromoImage } from "./section"

interface SlideImageProps {
  image: DirectusFiles
  title: string
}
const SlideImage = (props: SlideImageProps) => {
  const { image, title } = props
  const { filename_disk } = image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = image.caption ? `${stripHtml(image.caption).result}` : `${stripHtml(title).result}`
  return <Image src={src} width={664} height={265} alt={alt} sizes="75vw" />
}

const PromoSpecialSection = (props: PromoProps) => {
  const { article, showSection, showImage, permalink, order } = props
  const { title, excerpt, featured_image } = article

  const orderNum = (
    <span className="sort">
      <span>{order}</span>
    </span>
  )
  const slideshow_image = article.slideshow_image
  if (slideshow_image) {
    return (
      <>
        <div className="promo promo-section" itemType="http://schema.org/Article">
          <div className="grid-row grid-gap-4">
            <div className="grid-col-12">
              {showImage && slideshow_image && (
                <div className={`media`}>
                  <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                    <SlideImage image={slideshow_image} title={title} />
                  </Link>
                </div>
              )}
              {showSection && <PromoSectionName {...props} />}
              <h4>
                {orderNum}
                <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                  {parse(title)}
                </Link>
              </h4>
              <div className="excerpt">{parse(excerpt)}</div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
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
            <div className="excerpt">{parse(excerpt)}</div>
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
    </>
  )
}
export default PromoSpecialSection
