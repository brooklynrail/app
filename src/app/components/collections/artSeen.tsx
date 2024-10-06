"use client"
import Link from "next/link"
import { Articles, Collections, Sections } from "../../../../lib/types"
import { getPermalink, getSectionData, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import Bylines, { BylineType } from "./promos/bylines"
import Title, { TitleType } from "./promos/title"
import { useEffect, useRef, useState } from "react"

const CollectionArtSeen = (collection: Collections) => {
  const { section } = collection
  if (!section) {
    return null
  }

  const limit = collection.limit || 4

  const [currentSection, setCurrentSection] = useState<Sections | null>(null)
  const [articles, setArticles] = useState<Articles[]>(section.articles)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (isInView && !currentSection) {
        console.log("loading artseen......")
        const response = await fetch(`/api/sections?slug=${section.slug}&limit=6`)
        if (!response.ok) throw new Error("Failed to fetch article")
        const sectionData = getSectionData({ slug: section.slug, limit: limit })
        // Fetch all the data in parallel
        const [fetchedSection] = await Promise.all([sectionData])
        // Update the state with the fetched data as it becomes available
        setCurrentSection(fetchedSection)
        fetchedSection && setArticles(fetchedSection.articles)
      }
    }
    // Call the fetchData function and handle any errors
    fetchData().catch((error) => console.error("Failed to fetch data on Issue Page:", error))
  }, [isInView, currentSection, section.slug, articles, limit])

  console.log("artseen inView", isInView)
  console.log("artseen", currentSection)
  console.log("artseen articles", articles)

  // get the first article in the section.articles array
  const leadArticle = articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = articles.slice(1)

  const sectionPermalink = getPermalink({
    sectionSlug: section.slug,
    type: PageType.SuperSection,
  })

  return (
    <div key={collection.id} ref={sectionRef}>
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
              className={`col-span-4 tablet:col-span-6 tablet-lg:col-start-7 row-start-1 tablet:ml-3 divide-y rail-divide`}
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
    const { issue, section, title, featured_image } = article
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    return (
      <div key={i} className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 p-3 pb-3">
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-2 desktop-lg:col-span-1">
          {featured_image && (
            <div className="">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={featured_image} title={title} hideCaption={true} />
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop-lg:col-span-5">
          <div className="flex flex-col space-y-2">
            <Title title={article.title} permalink={permalink} type={TitleType.Small} />
            <Bylines article={article} type={BylineType.Default} />
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
  const { title, featured_image, issue, section, contributors, promo_banner } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 pt-3 pb-3">
      <div className="col-span-4 tablet:col-span-6" itemType="http://schema.org/Article">
        {featured_image && (
          <div className="">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <FeaturedImage image={featured_image} title={title} />
            </Link>
          </div>
        )}
      </div>
      <div className="col-span-4 tablet:col-span-6">
        <div className="flex flex-col space-y-3">
          <Title title={article.title} permalink={permalink} type={TitleType.Medium} />
          <Bylines article={article} type={BylineType.Default} />
        </div>
      </div>
    </div>
  )
}

export default CollectionArtSeen
