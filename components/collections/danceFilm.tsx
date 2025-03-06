"use client"

import { useEffect, useRef, useState } from "react"
import { Articles, Collections } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import FeaturedImage from "../featuredImage"
import Frame633 from "../frames/frame633"
import FrameScrollable from "../frames/frameScrollable"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Excerpt from "./promos/excerpt"
import Title from "./promos/title"

const CollectionDanceFilm = (collection: Collections) => {
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

  // divide the restOfArticles into two arrays: ColB and ColC
  const midIndex = Math.ceil(restOfArticles.length / 2)
  const ColB = restOfArticles.slice(0, midIndex)
  const ColC = restOfArticles.slice(midIndex)

  return (
    <div key={collection.id} className="collection theme">
      <CollectionHead title={collection.title} permalink={section.featured ? sectionPermalink : null} />
      <div className="hidden tablet-lg:block">
        <Frame633
          LeadPromo={<LeadPromo article={leadArticle} />}
          ColB={<Promos articles={ColB} />}
          ColC={<Promos articles={ColC} />}
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
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, excerpt, featured_artwork, featured_image, kicker } = article
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
              <Excerpt excerpt={article.excerpt} classes={`excerpt-md`} />
            </div>
            {artwork && (
              <div className="flex-none tablet:w-card desktop-lg:w-[336px]">
                <FeaturedImage image={artwork} title={title} hideCaption={true} permalink={permalink} />
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

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, featured_artwork, featured_image, kicker } = article
    const artwork = featured_artwork ? featured_artwork : featured_image
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
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={article.id} className="py-6 pb-8 flex flex-col space-y-3">
        {artwork && (
          <div className="" ref={divRef}>
            <FeaturedImage
              containerWidth={divWidth}
              image={artwork}
              title={title}
              hideCaption={true}
              permalink={permalink}
              sizes={`(max-width: 640px) 85vw, 33vw`}
            />
          </div>
        )}
        <div className="flex flex-col space-y-6">
          <div className="space-y-1.5">
            <Title title={article.title} permalink={permalink} classes="text-2xl font-normal" />
            <Bylines article={article} type={BylineType.DancePromo} />
          </div>
          <Excerpt excerpt={article.excerpt} classes={`excerpt`} />
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface LeadPromoArtProps {
  article: Articles
}
const LeadPromo = (props: LeadPromoArtProps) => {
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
      <div className="flex flex-col py-6">
        {artwork && (
          <div className="">
            <FeaturedImage
              image={artwork}
              hideCaption={true}
              title={title}
              permalink={permalink}
              sizes={`(max-width: 640px) 85vw, 50vw`}
            />
          </div>
        )}
      </div>
      <div className="col-span-4 tablet:col-span-6">
        <div className="flex flex-col space-y-6">
          <div className="space-y-1.5">
            <Title title={article.title} permalink={permalink} classes="font-light text-4xl" />
            <Bylines article={article} type={BylineType.CollectionDance} />
          </div>
          <Excerpt excerpt={article.excerpt} classes={`excerpt-lg`} />
        </div>
      </div>
    </>
  )
}

export default CollectionDanceFilm
