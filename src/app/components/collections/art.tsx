"use client"
import Link from "next/link"
import { Articles, Sections } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Bylines from "./promos/bylines"
import Kicker from "./promos/kicker"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Title, { TitleType } from "./promos/title"

const CollectionArt = (collection: Sections) => {
  const spaceRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef<HTMLDivElement>(null)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [dimensions, setDimensions] = useState({
    size: { width: 0, height: 0 },
    space: { width: 0, height: 0 },
    scaled: 1,
    scaledHeight: 1,
  })

  // Function to update the dimensions
  const updateDimensions = () => {
    if (sizeRef.current && spaceRef.current && originalDimensions) {
      const newSize = {
        width: sizeRef.current.clientWidth,
        height: sizeRef.current.clientHeight,
      }
      const newSpace = {
        width: spaceRef.current.clientWidth,
        height: spaceRef.current.clientHeight,
      }

      // Generate the scale that we can use to scale down the element as the page gets smaller.
      // 1 is equal to 1440px
      // If the element is larger than 1440, keep the scale to 1
      // If the element is smaller than 1440, scale it down to the new size
      // const newScale = newSize.width > 1440 ? 1 : newSpace.width / 1440
      const newScale = newSpace.width / 1440
      console.log("==================================")
      console.log("newSize.width ========", newSize.width)
      console.log("newScale ========", newScale)

      // Calculate the height of the element if the width were 1440px
      const newScaledH = newSize.height / newScale
      console.log("newSize.height ========", newSize.height)
      console.log("newScaledH ========", newScaledH)

      // console.log("originalHeight ========", originalHeight)
      // console.log("newScaledW ========", newScaledW)
      // console.log("newScaledH ========", newScaledH)
      // console.log("newSpace ========", newSpace)
      // console.log("newSize ========", newSize)
      // console.log("newScaledHeight ========", newScaledHeight)

      setDimensions({
        size: newSize,
        space: newSpace,
        scaled: newScale,
        scaledHeight: newSpace.height,
      })
    }
  }

  useLayoutEffect(() => {
    if (originalDimensions.height === 0 && sizeRef.current) {
      console.log("setting original dimensions")
      setOriginalDimensions({ width: sizeRef.current.clientWidth, height: sizeRef.current.clientHeight })
    } else {
      updateDimensions()
      window.addEventListener("resize", updateDimensions)
      return () => window.removeEventListener("resize", updateDimensions)
    }
  }, [sizeRef, originalDimensions])

  // ==================================================

  console.log("originalDimensions", originalDimensions)
  // console.log("dimensions", dimensions)
  // console.log("dimensions scaled", dimensions.scaled)
  // console.log("dimensions scaledHeight", dimensions.scaledHeight)
  // get the first article in the section.articles array
  const leadArticle = collection.articles[0]
  // get the list of articles in the section.articles array minus the first article
  const restOfArticles = collection.articles.slice(1, 5)

  const permalink = getPermalink({
    section: collection.slug,
    type: PageType.Section,
  })

  const grid_rows = `grid-rows-${restOfArticles.length}`
  // const grid_rows = `grid-rows-1`

  return (
    <>
      <div
        key={collection.id}
        // className="relative resize-y h-auto"
        ref={spaceRef}
        // style={
        //   dimensions.scaledHeight > originalDimensions.height
        //     ? { height: `${originalDimensions.height}px` }
        //     : { height: `${dimensions.scaledHeight}px` }
        // }
      >
        <div
          ref={sizeRef}
          // className="relative transform top-1/2 left-1/2 "
          // style={{ transform: `translate(-50%, -50%) scale(${dimensions.scaled})` }}
          // style={{ transform: `translate(-50%, -50%) scale(1)` }}
        >
          <div className="px-6 pb-16 border-b-2 border-dotted border-black">
            <CollectionHead title={collection.name} slug={collection.slug} permalink={permalink} />
            <div className={`grid grid-cols-4 tablet:grid-cols-12 ${grid_rows}`}>
              <div className="col-span-4 tablet:col-span-6 tablet:row-span-4 tablet:border-r-2 border-black border-dotted tablet:pr-3">
                <div className="grid grid-cols-4 tablet:grid-cols-6 gap-3">
                  <div className="col-span-4 tablet:col-span-6">
                    <LeadPromo article={leadArticle} />
                  </div>
                </div>
              </div>
              <div
                className={`col-span-4 tablet:col-span-6 tablet:col-start-7 tablet:ml-3 divide-y-2 divide-black divide-dotted`}
                itemType="http://schema.org/Article"
              >
                <Promos articles={restOfArticles} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

interface PromoProps {
  articles: Articles[]
}

const Promos = (props: PromoProps) => {
  const articles = props.articles.map((article, i = 1) => {
    const { issue, section, title, excerpt, promo_banner, kicker } = article
    const permalink = getPermalink({
      year: issue.year,
      month: issue.month,
      section: section.slug,
      slug: article.slug,
      type: PageType.Article,
    })

    const row_start = i > 0 ? `row-start-${i + 1}` : ``
    const skip_divide = i === 0 ? `!border-t-0` : ``

    return (
      <div className="grid grid-cols-4 tablet:grid-cols-6 gap-x-3 gap-y-2 p-3 pb-6">
        <div className="col-span-4 tablet:col-span-6">
          <Kicker article={article} />
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-2 desktop-lg:col-span-3 tablet-lg:order-last">
          {promo_banner && (
            <div className="">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={promo_banner} title={title} />
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6 tablet-lg:col-span-4 desktop-lg:col-span-3">
          <div className="flex flex-col space-y-2">
            <Title article={article} permalink={permalink} type={TitleType.Medium} />
            <Bylines article={article} />
            <div className="text-sm tablet-lg:text-md desktop-lg:text-lg font-normal">{parse(excerpt)}</div>
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
  const { title, issue, section, promo_banner } = article

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
          {promo_banner && (
            <div className="">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={promo_banner} title={title} />
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-4 tablet:col-span-6">
          <div className="flex flex-col space-y-3">
            <Title article={article} permalink={permalink} type={TitleType.Lead} />
            <Bylines article={article} />
            <div className="text-lg tablet-lg:text-xl desktop-lg:text-2xl font-normal">{parse(article.excerpt)}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionArt
