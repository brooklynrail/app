import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { PromoProps, PromoSection } from "./standard"

const PromoThumb = (props: PromoProps) => {
  const { dateSlug, article, showImage, showSection } = props
  const { title, excerpt, slug, sections } = article
  const sectionSlug = sections[0].sections_id.slug
  const permalink = `/${dateSlug}/${sectionSlug}/${slug}`
  const names = article.contributors.map((contributor: any, i: number) => {
    const { first_name, last_name } = contributor.contributors_id
    const name = `${first_name} ${last_name}`
    return <span key={`first_name-last_name-${i}`}>{name}</span>
  })

  return (
    <>
      <div className="promo promo-thumb" itemType="http://schema.org/Article">
        {showSection && <PromoSection {...props} />}
        {showImage && (
          <div className={`media media-thumb`}>
            <a href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <img src="https://placehold.co/60x60/C57AFF/9D20FF" alt="" />
            </a>
          </div>
        )}
        <h4>
          <a href={permalink} title={`Visit ${stripHtml(title).result}`}>
            {parse(title)}
          </a>
        </h4>
        <cite className="byline">By {names} </cite>
        <p className="excerpt">{parse(excerpt)}</p>
      </div>
    </>
  )
}
export default PromoThumb
