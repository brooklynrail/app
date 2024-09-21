"use client"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines from "../issueRail/bylines"

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
      <>
        <a href={permalink} className="font-medium">
          <Bylines hideBy={true} contributors={article.contributors} />
        </a>
        {separator}
      </>
    )
  })

  return <p className="text-sm">With contributions from {list}.</p>
}

export default TributeWritersList
