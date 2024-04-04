import parse from "html-react-parser"
import { Articles, DirectusFiles } from "../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import { PageType, getPermalink } from "../../../lib/utils"
import Link from "next/link"

export interface PromoProps {
  article: Articles
  showImage: boolean
  showSection: boolean
  permalink: string
  year: number
  month: number
  order?: number | null
}

export const PromoSectionName = (props: PromoProps) => {
  const { article, year, month } = props
  const { sections, kicker } = article
  const sectionName = sections[0].sections_id.name
  const permalink = getPermalink({
    year: year,
    month: month,
    section: article.sections[0].sections_id.slug,
    type: PageType.Section,
  })
  return (
    <p className="article_type">
      <Link className="section" href={permalink} title={`Go to the ${stripHtml(sectionName).result} section`}>
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

const PromoBanner = (props: DirectusFiles) => {
  const { filename_disk } = props
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}?key=promo-banner`
  return <Image src={src} width={316} height={96} alt={"tktk"} />
}

const PromoStandard = (props: PromoProps) => {
  const { article, showSection, showImage, permalink, order } = props
  const { title, excerpt, promo_banner } = article
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
              <PromoBanner {...promo_banner} />
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
