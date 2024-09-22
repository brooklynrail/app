"use client"
import Link from "next/link"
import { Articles, Sections, Tributes } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Bylines from "./promos/bylines"
import Kicker from "./promos/kicker"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Title, { TitleType } from "./promos/title"

const CollectionTribute = (collection: Tributes) => {
  const { title, deck, summary, blurb, excerpt, curators, featured_image } = collection
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

  // const grid_rows = `grid-rows-${restOfArticles.length}`
  const grid_rows = `grid-rows-1`

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
            <CollectionHead title={collection.title} slug={collection.slug} permalink={permalink} />

            <div className="grid grid-cols-4 tablet:grid-cols-8 gap-3">
              <div className="col-span-4 tablet:col-span-8">TKTK</div>
            </div>

            <div className={`col-span-4 tablet:col-span-4 tablet-lg:col-start-9`} itemType="http://schema.org/Article">
              {collection.featured_image && (
                <div className="">
                  <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                    <FeaturedImage image={collection.featured_image} title={title} hideCaption={true} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CollectionTribute
