import parse from "html-react-parser"
import { Articles } from "../../../lib/types"
import { stripHtml } from "string-strip-html"

export interface PromoProps {
  article: Articles
  dateSlug: string
  showImage: boolean
  showSection: boolean
}

export const PromoSection = (props: PromoProps) => {
  const { dateSlug, article } = props
  const { sections, kicker } = article
  const sectionSlug = sections[0].sections_id.slug
  const sectionName = sections[0].sections_id.name
  return (
    <p className="article_type">
      <a
        className="section"
        href={`/${dateSlug}/${sectionSlug}`}
        title={`Go to the ${stripHtml(sectionName).result} section`}
      >
        {sectionName}
      </a>
      {kicker && (
        <>
          <span className="divider"></span>
          <span className="type">{article.kicker}</span>
        </>
      )}
    </p>
  )
}

const PromoStandard = (props: PromoProps) => {
  const { dateSlug, article, showSection, showImage } = props
  const { title, excerpt, slug, sections, sort } = article
  const sectionSlug = sections[0].sections_id.slug
  const permalink = `/${dateSlug}/${sectionSlug}/${slug}`
  const sortNum = (
    <span className="sort">
      <span>{sort}</span>
    </span>
  )

  return (
    <>
      <div className="promo promo-standard" itemType="http://schema.org/Article">
        {showSection && <PromoSection {...props} />}
        {showImage && (
          <div className="media">
            <a href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <img src="https://placehold.co/316x96/C57AFF/9D20FF" alt="" />
            </a>
          </div>
        )}
        <h4>
          {sortNum}
          <a href={permalink} title={`Visit ${stripHtml(title).result}`}>
            {parse(title)}
          </a>
        </h4>
        <p className="excerpt">{parse(excerpt)}</p>
      </div>
    </>
  )
}
export default PromoStandard
