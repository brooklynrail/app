import parse from "html-react-parser"
import { Articles } from "../../../lib/types"
import { stripHtml } from "string-strip-html"

interface PromoSlimProps {
  article: Articles
  dateSlug: string
  i?: number
}

const PromoSlim = (props: PromoSlimProps) => {
  const { dateSlug, article, i = 0 } = props
  const { title, slug, sections, contributors, sort } = article
  const sectionSlug = sections[0].sections_id.slug
  const permalink = `/${dateSlug}/${sectionSlug}/${slug}`

  const names = contributors.map((contributor: any, i: number) => {
    const { first_name, last_name } = contributor.contributors_id
    const name = `${first_name} ${last_name}`
    return <span key={`first_name-last_name-${i}`}>{name}</span>
  })

  const sortNum = (
    <span className="sort">
      <span>{sort}</span>
    </span>
  )

  const altClass = i % 2 === 0 ? "" : "promo-slim-alt"

  return (
    <li className={`promo promo-slim ${altClass}`} itemType="http://schema.org/Article">
      <h4>
        {sortNum}
        <a href={permalink} itemProp="name" title={`Visit ${stripHtml(title).result}`}>
          {parse(title)}
        </a>
      </h4>
      <cite className="byline">– By {names}</cite>
    </li>
  )
}
export default PromoSlim
