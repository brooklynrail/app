"use client"
import { useEffect, useState } from "react"
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import TributeWritersList from "./writersList"

interface TributeWritersProps {
  articles: Articles[]
  tributeSlug: string
  currentSlug: string
  switchArticle: (slug: string) => void
}

const TributeWriters = (props: TributeWritersProps) => {
  const { articles, tributeSlug, currentSlug, switchArticle } = props

  const [selectedArticle, setSelectedArticle] = useState<string>(currentSlug)

  // Update the selected article whenever the currentSlug changes
  useEffect(() => {
    setSelectedArticle(currentSlug)
  }, [currentSlug])

  // Handle article change for the select box
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = event.target.value
    setSelectedArticle(selectedSlug)

    // Find the article based on the selected slug
    const selectedArticle = articles.find((article) => article.slug === selectedSlug)
    if (selectedArticle) {
      switchArticle(selectedArticle.slug) // Trigger article change using the passed function
    }
  }

  // Generate the list of articles for the sidebar and the select dropdown
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
        <h4 className="font-bold text-md desktop:text-lg">
          <a
            href={permalink}
            onClick={(e) => {
              e.preventDefault() // Prevent the default link behavior
              switchArticle(article.slug) // Trigger article change
            }}
          >
            <Bylines hideBy={true} article={article} type={BylineType.None} />
          </a>
        </h4>
      </li>
    )
  })

  // Generate the options for the select dropdown
  const options = articles.map((article, index) => (
    <option key={`option-${index}`} value={article.slug}>
      <Bylines hideBy={true} article={article} type={BylineType.Option} />
    </option>
  ))

  return (
    <>
      {/* Mobile view: Render the select dropdown */}
      <div className="space-y-3 py-3 block tablet-lg:hidden">
        {/* Writers list (hidden on tablet-lg and above) */}
        <TributeWritersList articles={articles} tributeSlug={tributeSlug} switchArticle={switchArticle} />

        {/* Select dropdown for mobile view */}
        <select
          className="w-full bg-zinc-50 dark:bg-zinc-700 rounded-full border-r-8 border-transparent px-3 py-1 text-sm tablet-lg:hidden outline order-last tablet-lg:order-none outline-neutral-700"
          value={selectedArticle}
          onChange={handleSelectChange}
        >
          {options}
        </select>
      </div>

      {/* Sidebar view: Render the list of articles */}
      <ul className="hidden tablet-lg:block divide-y-[1px] rail-divide">{list}</ul>
    </>
  )
}

export default TributeWriters
