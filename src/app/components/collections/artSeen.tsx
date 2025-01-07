"use client"
import { useEffect, useRef, useState } from "react"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedImage from "../featuredImage"
import Frame from "../frames/frame"
import Frame333 from "../frames/frame333"
import FrameScrollable from "../frames/frameScrollable"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Kicker from "./promos/kicker"
import Title, { TitleType } from "./promos/title"

const CollectionArtSeen = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const { articles } = section

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  const third = Math.ceil(articles.length / 3)
  const colA = articles.slice(0, third)
  const colB = articles.slice(third, 2 * third)
  const colC = articles.slice(2 * third)

  return (
    <div key={collection.id} className="collection theme-artseen">
      <CollectionHead title={collection.title} permalink={section.featured ? sectionPermalink : null} />
      <div className="hidden tablet-lg:block">
        <Frame333
          colA={<PromosArtSeen articles={colA} />}
          colB={<PromosArtSeen articles={colB} />}
          colC={<PromosArtSeen articles={colC} />}
          alt={false}
        />
      </div>
      <div className="tablet-lg:hidden">
        <FrameScrollable Promos={<PromosMobile articles={articles} />} />
      </div>
    </div>
  )
}

interface PromoProps {
  articles: Articles[]
}

const PromosMobile = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, featured_artwork, featured_image, kicker } = article

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

    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={article.id} className="px-3 py-1 snap-center">
        <div className="flex flex-col space-y-3 flex-none w-[calc(100vw-6.5rem)] tablet:w-auto">
          <Kicker issue={article.issue} articleID={article.id} />
          {artwork && (
            <div ref={divRef} className="flex-none tablet:w-card desktop-lg:w-[336px]">
              <FeaturedImage
                containerWidth={divWidth}
                image={artwork}
                title={title}
                hideCaption={true}
                permalink={permalink}
                sizes={`100vw`}
              />
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} classes="text-xl tablet:text-lg font-normal" />
            <Bylines article={article} type={BylineType.Default} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

const PromosArtSeen = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
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
      <div key={article.id} className="p-3 tablet:pr-0 snap-center">
        <div className="flex flex-col w-[calc(100vw-6.5rem)] tablet:w-auto">
          <div className="flex flex-col space-y-3 tablet:space-y-0 tablet:flex-row tablet:space-x-3">
            {artwork && (
              <div className="flex-none tablet:w-card tablet-lg:w-28">
                <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} sizes={`25vw`} />
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Title title={article.title} permalink={permalink} classes="text-lg font-normal" />
              <Bylines article={article} type={BylineType.CollectionArtSeen} />
            </div>
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

export default CollectionArtSeen
