"use client"
import Link from "next/link"
import { Articles, Collections, Sections } from "../../../../lib/types"
import { getPermalink, getSectionData, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Bylines, { BylineType } from "./promos/bylines"
import Kicker from "./promos/kicker"
import Title, { TitleType } from "./promos/title"
import Excerpt, { ExcerptType } from "./promos/excerpt"
import { useEffect, useState } from "react"

const CollectionArt = (collection: Collections) => {
  const { section, limit } = collection
  if (!section) {
    return null
  }

  const [currentSection, setCurrentSection] = useState<Sections | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      if (!currentSection) {
        const response = await fetch(`/api/sections?slug=${section.slug}&limit=6`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const sectionData = getSectionData({ slug: section.slug, limit: limit })
        // Fetch all the data in parallel
        const [fetchedSection] = await Promise.all([sectionData])
        // Update the state with the fetched data as it becomes available
        setCurrentSection(fetchedSection)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [currentSection])

  console.log("currentSection", currentSection)

  const { articles } = section

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  return (
    <div key={collection.id}>
      <div>
        <div className="px-6 pb-16 border-b rail-border">
          <CollectionHead title={section.name} permalink={sectionPermalink} />
          <div className={`grid grid-cols-4 tablet:grid-cols-12`}>
            <div className="col-span-4 tablet:col-span-6 tablet:row-span-4 tablet:border-r rail-border tablet:pr-3">
              <div className="grid grid-cols-4 tablet:grid-cols-6 gap-3">
                <div className="col-span-4 tablet:col-span-6">
                  <LeadPromo article={leadArticle} />
                </div>
              </div>
            </div>
            <div
              className={`col-span-4 tablet:col-span-6 tablet:col-start-7 tablet:ml-3 divide-y rail-divide`}
              itemType="http://schema.org/Article"
            >
              <Promos articles={restOfArticles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
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
      <div key={i} className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 p-3 pb-6">
        <div className="col-span-4 tablet:col-span-6">
          <Kicker article={article} />
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-2 desktop-lg:col-span-3 tablet-lg:order-last">
          {artwork && (
            <div className="">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={artwork} title={title} />
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop-lg:col-span-3">
          <div className="flex flex-col space-y-2">
            <Title title={article.title} permalink={permalink} type={TitleType.Medium} />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} type={ExcerptType.Art} />
          </div>
        </div>
      </div>
    )
  })

  return <>{articles}</>
}

interface LeadPromoProps {
  article: Articles
}
const LeadPromo = (props: LeadPromoProps) => {
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
      <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 pt-3 pb-6">
        <div className="col-span-4 tablet:col-span-6">
          <Kicker article={article} />
        </div>
        <div className="col-span-4 tablet:col-span-6" itemType="http://schema.org/Article">
          {artwork && (
            <div className="">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={artwork} title={title} />
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-3">
            <Title title={article.title} permalink={permalink} type={TitleType.Lead} />
            <Bylines article={article} type={BylineType.Default} />
            <Excerpt excerpt={article.excerpt} type={ExcerptType.ArtLead} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionArt
