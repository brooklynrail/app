import parse from "html-react-parser"
import { Articles, DirectusFiles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import Link from "next/link"

export interface PromoProps {
  article: Articles
  showImage: boolean
  showSection: boolean
  permalink: string
  sectionPermalink: string
  order?: number | null
}

export const PromoSectionName = (props: PromoProps) => {
  const { article, sectionPermalink } = props
  const { section, kicker } = article
  const sectionName = section.name
  return (
    <p className="article_type">
      <Link className="section" href={sectionPermalink} title={`Go to the ${stripHtml(sectionName).result} section`}>
        {sectionName}
      </Link>
      {kicker && (
        <>
          <span className="divider"></span>
          <span className="type">{article.kicker}</span>
        </>
      )}
    </p>
  )
}

interface PromoBannerProps {
  image: DirectusFiles
  title: string
}
const PromoBanner = (props: PromoBannerProps) => {
  const { image, title } = props
  const { filename_disk } = image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = image.caption ? `${stripHtml(image.caption).result}` : `${stripHtml(title).result}`
  return <Image src={src} width={316} height={96} alt={alt} sizes="33vw" />
}

const PromoStandard = (props: PromoProps) => {
  const { article, showSection, showImage, permalink, order } = props
  const { title, excerpt, promo_banner } = article

  console.log("promo standard", props)
  const orderNum = (
    <span className="sort">
      <span>{order}</span>
    </span>
  )

  return (
    <>
      <div className="promo promo-standard" itemType="http://schema.org/Article">
        {showSection && <PromoSectionName {...props} />}
        {showImage && promo_banner && (
          <div className={`media media-thumb`}>
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <PromoBanner image={promo_banner} title={title} />
            </Link>
          </div>
        )}
        <h4>
          {orderNum}
          <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
            {parse(title)}
          </Link>
        </h4>
        <div className="excerpt">{parse(excerpt)}</div>
      </div>
    </>
  )
}
export default PromoStandard
