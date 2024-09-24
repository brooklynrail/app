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
  prefetch?: boolean
}

const PromoSlim = (props: PromoSlimProps) => {
  const { article, i = 0, permalink, order, prefetch } = props
  const { title, contributors, byline_override, hide_bylines_downstream } = article

  const altClass = i % 2 === 0 ? "" : "promo-slim-alt"

  return (
    <li className={`py-1 px-1 text-xs ${altClass}`} itemType="http://schema.org/Article">
      <h4 className="font-medium inline">
        <Link
          prefetch={prefetch === false ? false : true}
          href={permalink}
          itemProp="name"
          title={`Visit ${stripHtml(title).result}`}
        >
          {parse(title)}
        </Link>
      </h4>
      {!hide_bylines_downstream && contributors && contributors.length != 0 && (
        <cite className="not-italic inline">
          {` –`} <Bylines byline_override={byline_override} contributors={contributors} />
        </cite>
      )}
    </li>
  )
}
export default PromoSlim
