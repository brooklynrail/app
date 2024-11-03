"use client"
import { useEffect, useRef, useState } from "react"
import { Articles, Collections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import FeaturedImage from "../featuredImage"
import CollectionHead from "./head"
import Bylines, { BylineType } from "./promos/bylines"
import Excerpt from "./promos/excerpt"
import Title from "./promos/title"

const CollectionDefault = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const { articles } = section

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  return (
    <div key={collection.id} className={`collection theme theme-${section.slug}`}>
      <CollectionHead
        title={collection.title}
        permalink={section.featured ? sectionPermalink : null}
        description={section.description}
      />
      <div className="pl-6 py-3 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth w-screen">
        <Promos articles={articles} />
      </div>
    </div>
  )
}

interface PromosProps {
  articles: Articles[]
}

const Promos = (props: PromosProps) => {
  const { articles } = props
  return (
    <>
      {articles.map((article, index) => (
        <Promo key={article.id} article={article} />
      ))}
    </>
  )
}

interface PromoProps {
  article: Articles
}

const Promo = (props: PromoProps) => {
  const { article } = props
  const { issue, section, title, featured_image, slug, id, excerpt } = props.article

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
    slug: slug,
    type: PageType.Article,
  })

  return (
    <div
      key={id}
      className={`pt-1 pb-3 px-3 tablet-lg:px-6 first:pl-0 first:tablet:pr-6 snap-center w-60 desktop:w-1/4 flex-none space-y-3`}
    >
      {featured_image && (
        <div ref={divRef} className={`flex-none w-full`}>
          <FeaturedImage
            containerWidth={divWidth}
            image={featured_image}
            title={title}
            hideCaption={true}
            permalink={permalink}
            sizes={`(max-width: 640px) 85vw, 25vw`}
          />
        </div>
      )}
      <div className="flex flex-col space-y-6">
        <div className="space-y-1.5">
          <Title title={title} permalink={permalink} classes="text-xl tablet:text-2xl font-normal" />
          <Bylines article={article} type={BylineType.CollectionDefault} />
        </div>
        <Excerpt excerpt={excerpt} classes={`excerpt-md`} />
      </div>
    </div>
  )
}

export default CollectionDefault
