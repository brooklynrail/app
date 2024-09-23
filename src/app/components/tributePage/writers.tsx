"use client"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"

interface TributeWritersProps {
  articles: Articles[]
  tributeSlug: string
}

const TributeWriters = (props: TributeWritersProps) => {
  const { articles, tributeSlug } = props

  const list = articles.map((article, index) => {
    const permalink = getPermalink({
      tributeSlug: tributeSlug,
      slug: article.slug,
      type: PageType.TributeArticle,
    })

    const intro = "Introduction"

    return (
      <li key={index} className="pl-3 py-2">
        {index === 0 && <p className="text-2xs">{intro}</p>}
        <h4 className="font-bold text-lg uppercase">
          <a href={permalink}>
            <Bylines hideBy={true} article={article} type={BylineType.None} />
          </a>
        </h4>
      </li>
    )
  })

  return (
    <aside>
      <ul className="divide-y-2 divide-dotted divide-black dark:divide-white">{list}</ul>
    </aside>
  )
}

export default TributeWriters
