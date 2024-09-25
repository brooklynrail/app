"use client"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"

interface TributeWritersProps {
  articles: Articles[]
  tributeSlug: string
}

const TributeWritersList = (props: TributeWritersProps) => {
  const { articles, tributeSlug } = props

  const list = articles.map((article, index) => {
    const permalink = getPermalink({
      tributeSlug: tributeSlug,
      slug: article.slug,
      type: PageType.TributeArticle,
    })

    let separator = ", "
    if (index === articles.length - 2) {
      separator = ", and "
    } else if (index === articles.length - 1) {
      separator = ""
    }
    return (
      <span key={index}>
        <a href={permalink} className="font-medium">
          <Bylines hideBy={true} article={article} type={BylineType.TributeWritersList} />
        </a>
        {separator}
      </span>
    )
  })

  return <aside className="text-sm desktop-lg:text-lg text-center">With contributions from {list}.</aside>
}

export default TributeWritersList
