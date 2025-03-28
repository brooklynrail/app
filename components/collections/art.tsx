"use client"

import { Articles, Collections } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import FeaturedImage from "../featuredImage"
import Frame from "../frames/frame"
import FrameScrollable from "../frames/frameScrollable"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Excerpt from "./promos/excerpt"
import Title from "./promos/title"

const CollectionArt = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const { articles } = section

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  return (
    <div key={collection.id} className="collection theme-art">
      <CollectionHead title={collection.title} permalink={section.featured ? sectionPermalink : null} />
      <div className="hidden tablet-lg:block">
        <Frame
          LeadPromo={<LeadPromoArt article={leadArticle} />}
          Promos={<PromosArt articles={restOfArticles} />}
          alt={false}
        />
      </div>
      <div className="tablet-lg:hidden">
        <FrameScrollable Promos={<PromosMobile articles={articles} />} />
      </div>
    </div>
  )
}

const PromosMobile = (props: PromoProps) => {
  const articles = props.articles.map((article) => {
    const { issue, section, title, featured_artwork, featured_image } = article
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
      <div key={article.id} className="p-3 tablet:pr-0 snap-center">
        <div className="flex flex-col space-y-3 flex-none w-[calc(100vw-6.5rem)] tablet:w-auto">
          <div className="!mt-0 tablet:mt-auto flex flex-col-reverse tablet:flex-row tablet:space-x-6">
            <div className="pt-3 tablet:pt-0 flex flex-col space-y-3">
              <Title title={article.title} permalink={permalink} classes="text-3xl tablet:text-4xl font-light" />
              <Bylines article={article} type={BylineType.Default} />
              <Excerpt excerpt={article.excerpt} classes={`excerpt-sm tablet-lg:excerpt-md desktop-lg:excerpt-lg`} />
            </div>
            {artwork && (
              <div ref={divRef} className="flex-none tablet:w-card desktop-lg:w-[336px]">
                <FeaturedImage
                  containerWidth={divWidth}
                  image={artwork}
                  title={title}
                  hideCaption={true}
                  permalink={permalink}
                  sizes={`100vw`}
                  priority={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface PromoProps {
  articles: Articles[]
}

const PromosArt = (props: PromoProps) => {
  const articles = props.articles.map((article) => {
    const { issue, section, title, featured_artwork, featured_image, kicker } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={article.id} className="grid grid-cols-4 tablet:grid-cols-6 gap-3 pt-3 pb-6 px-3">
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-2 desktop-lg:col-span-3 tablet-lg:order-last">
          {artwork && (
            <div className="">
              <FeaturedImage
                priority={true}
                image={artwork}
                title={title}
                hideCaption={true}
                permalink={permalink}
                sizes={`25vw`}
              />
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop-lg:col-span-3">
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} classes="text-3xl tablet:text-4xl font-light" />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface LeadPromoArtProps {
  article: Articles
}
const LeadPromoArt = (props: LeadPromoArtProps) => {
  const { article } = props
  const { title, issue, section, featured_artwork, featured_image } = article

  const artwork = featured_artwork ? featured_artwork : featured_image
  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <>
      <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-3">
        <div className="col-span-4 tablet:col-span-6" itemType="http://schema.org/Article">
          {artwork && (
            <div className="">
              <FeaturedImage
                priority={true}
                image={artwork}
                hideCaption={true}
                title={title}
                permalink={permalink}
                sizes={`50vw`}
              />
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-3">
            <Title h2 title={article.title} permalink={permalink} classes="text-4xl tablet:text-5xl font-light" />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} classes="excerpt-2xl" />
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionArt
