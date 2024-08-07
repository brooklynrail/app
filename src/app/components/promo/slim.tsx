import parse from "html-react-parser"
import { Articles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import Bylines from "../issueRail/bylines"

interface PromoSlimProps {
  article: Articles
  i?: number
  permalink: string
  order?: number | null
}

const PromoSlim = (props: PromoSlimProps) => {
  const { article, i = 0, permalink, order } = props
  const { title, contributors, byline_override, hide_bylines_downstream } = article

  const orderNum = (
    <span className="sort">
      <span>{order}</span>
    </span>
  )

  const altClass = i % 2 === 0 ? "" : "promo-slim-alt"

  return (
    <li className={`promo promo-slim ${altClass}`} itemType="http://schema.org/Article">
      <h4>
        {orderNum}
        <Link href={permalink} itemProp="name" title={`Visit ${stripHtml(title).result}`}>
          {parse(title)}
        </Link>
      </h4>
      {!hide_bylines_downstream && contributors && contributors.length != 0 && (
        <cite className="byline">
          {` –`} <Bylines byline_override={byline_override} contributors={contributors} />
        </cite>
      )}
    </li>
  )
}
export default PromoSlim
