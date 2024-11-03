"use client"
import { useEffect, useRef, useState } from "react"
import { SectionProps } from "."
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Title from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import Excerpt from "../collections/promos/excerpt"
import Kicker from "../collections/promos/kicker"
import styles from "./section.module.scss"
import { groupByIssue } from "../../../../lib/utils/sections/utils"
import useLayout, { LayoutMode } from "@/app/hooks/useLayout"

interface SectionLayoutProps {
  layoutMode: LayoutMode
}

const SectionDefault = (props: SectionProps & SectionLayoutProps) => {
  const { layoutContainer } = useLayout()
  const { articlesData } = props
  const isListMode = props.layoutMode === LayoutMode.List

  // ==================================
  // Group articles by issue
  const grouped = false

  if (grouped) {
    // Take all of the articles,
    // and group articles by their respective issue
    const articlesByIssue = groupByIssue(articlesData)

    // Group articles by their respective issue
    const allArticles = (
      <>
        {Object.keys(articlesByIssue).map((issueId, index) => {
          const issueArticles = articlesByIssue[issueId]
          const issueTitle = issueArticles[0]?.issue.title || "Untitled Issue" // Assuming issue title is the same for all articles in the issue
          const thisGroup = issueArticles.map((article, i) => {
            const priority = index === 0 && i < 3 ? true : false
            return <Promo key={article.id} article={article} layoutMode={props.layoutMode} priority={priority} />
          })
          return (
            <div>
              <h3>{issueTitle}</h3>
              <div
                className={`grid items-start gap-0 grid-cols-1 ${isListMode ? `divide-y rail-divide` : `tablet:grid-cols-3 desktop:grid-cols-4`}`}
              >
                {thisGroup}
              </div>
            </div>
          )
        })}
      </>
    )

    return (
      <div ref={layoutContainer} className={`py-3 tablet-lg:py-6 ${isListMode && `max-w-screen-desktop-lg mx-auto`}`}>
        {allArticles}
      </div>
    )
  }

  // ==================================
  // All the articles
  const allArticles = articlesData.map((article, i) => {
    const priority = i < 3 ? true : false
    return <Promo key={article.id} article={article} layoutMode={props.layoutMode} priority={priority} />
  })

  return (
    <div className={`py-3 tablet-lg:py-6 ${isListMode && `tablet:px-3 max-w-screen-desktop-lg mx-auto`}`}>
      <div
        ref={layoutContainer}
        className={`grid items-start gap-0 grid-cols-1 ${isListMode ? `divide-y rail-divide` : `tablet:grid-cols-3 desktop:grid-cols-4`}`}
      >
        {allArticles}
      </div>
    </div>
  )
}

interface PromoProps {
  article: Articles
  layoutMode: LayoutMode
  priority: boolean
}

const Promo = ({ article, layoutMode, priority }: PromoProps) => {
  const { issue, section, title, featured_image, featured_artwork, slug, excerpt } = article
  const [divWidth, setDivWidth] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        setDivWidth(divRef.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug,
    type: PageType.Article,
  })
  const artwork = featured_artwork || featured_image

  // Define layout-specific classes
  const containerClasses =
    layoutMode === LayoutMode.List
      ? "flex flex-col px-3 py-3"
      : `flex flex-col tablet:px-3 pb-3 border-l rail-border ${styles.card} ${layoutMode === LayoutMode.Grid && "h-full"}`
  const contentClasses =
    layoutMode === LayoutMode.List
      ? "flex flex-row space-x-6 desktop:space-x-12"
      : "p-3 flex flex-col space-y-6 border-t rail-border"
  const imageContainerClasses = layoutMode === LayoutMode.List ? "w-28 tablet-lg:w-52 flex-none" : ""
  const titleClasses =
    layoutMode === LayoutMode.List
      ? "text-xl tablet:text-2xl desktop:text-3xl font-light"
      : "text-2xl tablet:text-2xl desktop:text-3xl font-light"

  return (
    <div key={article.id} className={containerClasses}>
      <div className={contentClasses}>
        {artwork && (
          <div ref={divRef} className={imageContainerClasses}>
            <FeaturedImage
              containerWidth={layoutMode === LayoutMode.Grid ? divWidth : undefined}
              image={artwork}
              title={title}
              hideCaption={true}
              permalink={permalink}
              priority={priority}
              sizes={layoutMode === LayoutMode.Grid ? `30vw` : `20vw`}
            />
          </div>
        )}
        <div className="flex flex-col space-y-3">
          <div className="space-y-1">
            <Kicker issue={article.issue} articleID={article.id} />
            <Title title={article.title} permalink={permalink} classes={titleClasses} />
          </div>
          <Bylines article={article} type={BylineType.CollectionDefault} />
          <Excerpt
            excerpt={article.excerpt}
            classes={`excerpt-md ${layoutMode === LayoutMode.List ? "max-w-[100ex]" : ""}`}
          />
        </div>
      </div>
    </div>
  )
}

export default SectionDefault
