import parse from "html-react-parser"
import { Articles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import Bylines, { BylineType } from "../collections/promos/bylines"

interface PromoSlimProps {
  article: Articles
  i?: number
  permalink: string
  prefetch?: boolean
}

const PromoSlim = (props: PromoSlimProps) => {
  const { article, i = 0, permalink, prefetch } = props
  const { title, contributors, hide_bylines_downstream } = article

  const isDraft = article.status === "draft" && <span className="absolute w-2 h-2 bg-slate-500 rounded-full"></span>

  const altClass = i % 2 === 0 ? "" : "bg-zinc-200 dark:bg-zinc-700"

  return (
    <li className={`text-xl ${altClass}`} itemType="http://schema.org/Article">
      <h4 className="inline">
        <Link
          prefetch={prefetch === false ? false : true}
          href={permalink}
          itemProp="name"
          title={`Visit ${stripHtml(title).result}`}
        >
          {parse(title)}
          {isDraft}
        </Link>
      </h4>
      {!hide_bylines_downstream && contributors && contributors.length != 0 && (
        <div className="block tablet-lg:inline">
          {` –`} <Bylines article={article} type={BylineType.TOC} />
        </div>
      )}
    </li>
  )
}
export default PromoSlim
