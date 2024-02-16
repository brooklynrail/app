import parse from "html-react-parser"
import { Articles } from "../../../lib/types"
import { stripHtml } from "string-strip-html"

interface PromoStandardProps {
  article: Articles
  dateSlug: string
}

const PromoStandard = (props: PromoStandardProps) => {
  const { dateSlug, article } = props
  const { title, excerpt, slug, sections } = article
  const sectionSlug = sections[0].sections_id.slug
  const sectionName = sections[0].sections_id.name
  const articleType = (
    <p className="article_type">
      <a className="section" href={`/${dateSlug}/${sectionSlug}`} title={`Go to the ${sectionName} section`}>
        {sectionName}
      </a>
      {article.kicker && (
        <>
          <span className="divider"></span>
          <span className="type">{article.kicker}</span>
        </>
      )}
    </p>
  )

  const permalink = `/${dateSlug}/${sectionSlug}/${slug}`

  return (
    <>
      <div className="promo promo-standard" itemType="http://schema.org/Article">
        {sections && articleType}
        <div className="media">
          <a href={permalink} title={`Visit ${stripHtml(title).result}`}>
            <img src="https://placehold.co/316x96/C57AFF/9D20FF" alt="" />
          </a>
        </div>
        <h4>
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
