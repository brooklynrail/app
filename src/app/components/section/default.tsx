"use client"

import { useEffect, useState } from "react"
import { SectionProps } from "."
import { Articles } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Title from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import { useBreakpoints } from "@/app/hooks/useBreakpoints"
import Excerpt from "../collections/promos/excerpt"
import Kicker from "../collections/promos/kicker"
import useMasonry, { LayoutMode } from "@/app/hooks/useMasonry"
import styles from "./section.module.scss"

interface SectionLayoutProps {
  layoutMode: LayoutMode
}

const SectionDefault = (props: SectionProps & SectionLayoutProps) => {
  const masonryContainer = useMasonry(props.layoutMode)

  const { articlesData } = props
  const currentBreakpoint = useBreakpoints()
  const [groupCount, setGroupCount] = useState(1)

  useEffect(() => {
    const calculateGroupNumber = () => {
      switch (currentBreakpoint) {
        case "tablet":
          return 2
        case "tablet-lg":
          return 3
        case "desktop":
        case "desktop-lg":
        case "widescreen":
          return 4
        default:
          return 1
      }
    }
    setGroupCount(calculateGroupNumber())
  }, [currentBreakpoint])

  // Utility function to split array into groups
  const groupArray = (array: Articles[], groupSize: number) => {
    const groups = []
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize))
    }
    return groups
  }

  // Split articles into groups of 4
  const articleGroups = groupArray(articlesData, groupCount).map((group, i) => {
    return (
      <div
        key={`group-${group[0].id}`}
        className="grid grid-cols-4 tablet:grid-cols-12 divide-x rail-divide px-0 tablet-lg:px-3"
      >
        <Promos articles={group} />
      </div>
    )
  })

  const isListMode = props.layoutMode === LayoutMode.List

  // Split articles into groups of 4
  const allArticles = articlesData.map((article, i) => {
    const { issue, section, title, featured_artwork, featured_image } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    const first = i === 0 && "col-span-1 tablet:col-span-2"

    if (isListMode) {
      return (
        <div key={article.id} className={`flex flex-col px-3 py-3`}>
          <div className={`flex flex-row space-x-12`}>
            {artwork && (
              <div className={`w-52 flex-none`}>
                <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
              </div>
            )}
            <div className="flex flex-col space-y-3">
              <div className="space-y-1">
                <Kicker article={article} />
                <Title title={article.title} permalink={permalink} classes="text-3xl tablet:text-3xl font-light" />
              </div>
              <Bylines article={article} type={BylineType.CollectionDefault} />
              <Excerpt excerpt={article.excerpt} classes={`excerpt-md max-w-[100ex]`} />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div key={article.id} className={`${first} flex flex-col px-3 pb-3 border-l rail-border ${styles.card}`}>
        <div className={`p-3 flex flex-col space-y-6 border-t rail-border`}>
          {artwork && (
            <div className={``}>
              <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <div className="space-y-1">
              <Kicker article={article} />
              <Title title={article.title} permalink={permalink} classes="text-3xl tablet:text-3xl font-light" />
            </div>
            <Bylines article={article} type={BylineType.CollectionDefault} />
            <Excerpt excerpt={article.excerpt} classes={`excerpt-md`} />
          </div>
        </div>
      </div>
    )
  })

  return (
    <div className={`py-6 ${isListMode && `max-w-screen-desktop-lg mx-auto`}`}>
      <div
        ref={masonryContainer}
        className={`grid items-start gap-0 grid-cols-1 ${isListMode ? `divide-y rail-divide` : `tablet:grid-cols-3 desktop:grid-cols-4`}`}
      >
        {allArticles}
      </div>
    </div>
  )
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article: Articles, i = 1) => {
    const { issue, section, title, featured_artwork, featured_image } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={article.id} className={`col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop:col-span-3`}>
        <div className="p-3 flex flex-col space-y-6">
          {artwork && <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />}
          <div className="flex flex-col space-y-3">
            <div className="space-y-1">
              <Kicker article={article} />
              <Title title={article.title} permalink={permalink} classes="text-3xl tablet:text-3xl font-light" />
            </div>
            <Bylines article={article} type={BylineType.CollectionDefault} />
            <Excerpt excerpt={article.excerpt} classes={`excerpt-md`} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default SectionDefault
