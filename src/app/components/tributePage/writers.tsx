"use client"
import { useEffect, useState } from "react"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import { useArticleContext } from "@/app/context/ArticleProvider"
import TributeWritersList from "./writersList"

interface TributeWritersProps {
  articles: Articles[]
  tributeSlug: string
  currentSlug: string
}

const TributeWriters = (props: TributeWritersProps) => {
  const { articles, tributeSlug, currentSlug } = props

  const { setArticleSlug, currentArticle } = useArticleContext()

  const [selectedArticle, setSelectedArticle] = useState<string>(currentSlug)

  useEffect(() => {
    setSelectedArticle(currentArticle.slug)
  }, [currentArticle])

  const list = articles.map((article, index) => {
    const permalink = getPermalink({
      tributeSlug: tributeSlug,
      slug: article.slug,
      type: PageType.TributeArticle,
    })

    const intro = "Introduction"

    const isCurrent = currentSlug === article.slug ? "bg-white dark:bg-zinc-700" : ""

    return (
      <li key={`item-${index}`} className={`${isCurrent} pl-3 py-1 desktop:py-2`}>
        {index === 0 && <p className="text-2xs">{intro}</p>}
        <h4 className="font-bold text-md desktop:text-lg uppercase">
          <a
            href={permalink}
            onClick={(e) => {
              e.preventDefault() // Prevent the default link behavior
              setArticleSlug(article.slug) // Trigger article change
            }}
          >
            <Bylines hideBy={true} article={article} type={BylineType.None} />
          </a>
        </h4>
      </li>
    )
  })

  const options = articles.map((article, index) => {
    return (
      <option key={`option-${index}`} value={article.slug}>
        <Bylines hideBy={true} article={article} type={BylineType.Option} />
      </option>
    )
  })

  return (
    <>
      <div className="space-y-3 py-3 block tablet-lg:hidden">
        <TributeWritersList articles={articles} tributeSlug={tributeSlug} />
        <select
          // className="px-2 pr-6 py-2 bg-zinc-50 dark:bg-zinc-700 uppercase text-sm font-bold w-full tablet-lg:py-3 tablet-lg:hidden order-last tablet-lg:order-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          className="w-full bg-zinc-50 dark:bg-zinc-700 rounded-full border-r-8 border-transparent px-3 py-1 text-sm tablet-lg:hidden outline order-last tablet-lg:order-none outline-neutral-700"
          onChange={(event) => setArticleSlug(event.target.value)}
          value={selectedArticle}
        >
          {options}
        </select>
      </div>

      <ul className="hidden  tablet-lg:block divide-y-[1px] rail-divide">{list}</ul>
    </>
  )
}

export default TributeWriters
