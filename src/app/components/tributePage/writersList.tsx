"use client"
import { useArticleContext } from "@/app/context/ArticleProvider"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"

interface TributeWritersProps {
  articles: Articles[]
  tributeSlug: string
}

const TributeWritersList = (props: TributeWritersProps) => {
  const { articles, tributeSlug } = props
  const { setArticleSlug } = useArticleContext()

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
        <a
          href={permalink}
          className="font-medium"
          onClick={(e) => {
            e.preventDefault() // Prevent the default link behavior
            setArticleSlug(article.slug) // Trigger article change
          }}
        >
          <Bylines hideBy={true} article={article} type={BylineType.TributeWritersList} />
        </a>
        {separator}
      </span>
    )
  })

  return <aside className="text-sm">With contributions from {list}.</aside>
}

export default TributeWritersList
