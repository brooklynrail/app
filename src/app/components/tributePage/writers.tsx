"use client"
import { useState } from "react"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import { useArticleContext } from "@/app/context/ArticleProvider"

interface TributeWritersProps {
  articles: Articles[]
  tributeSlug: string
  currentSlug: string
}

const TributeWriters = (props: TributeWritersProps) => {
  const { articles, tributeSlug, currentSlug } = props

  const { setArticleSlug } = useArticleContext()

  const [selectedArticle, setSelectedArticle] = useState<string>(currentSlug)

  // const handleArticleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedValue = event.target.value
  //   // Set the selected article slug
  //   setSelectedArticle(selectedValue)
  //   // navigate to the selected article via the path
  //   const path = getPermalink({
  //     tributeSlug: tributeSlug,
  //     slug: selectedValue,
  //     type: PageType.TributeArticle,
  //   })
  //   // const path = `/tribute/${tributeSlug}/${selectedValue}`
  //   window.location.href = path
  // }

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
      {/* <select
        className="px-2 py-2 uppercase text-lg font-bold w-full tablet-lg:py-3 tablet-lg:hidden"
        // onChange={(event) => handleClick(event, article.slug)}
        value={selectedArticle}
      >
        {options}
      </select> */}

      <ul className="hidden  tablet-lg:block divide-y-[1px] rail-divide">{list}</ul>
    </>
  )
}

export default TributeWriters
