"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import ContributorsBox from "../contributorsBox"
import BookshopWidget from "./bookshop"
import replaceShortcodes from "./shortcodes"
import { useMemo } from "react"
import RailImage from "./railImage"
import { Articles } from "../../../../lib/types"
import ArticleAd from "./articleAd"

interface ArticleBodyProps {
  articleData: Articles
  showAd: boolean
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { articleData, showAd } = props
  const { body_text, images, endnote, contributors } = articleData

  const fullBodyText = body_text && replaceShortcodes({ html: body_text, images: images })
  if (!body_text || !fullBodyText) {
    return <></>
  }

  // IMAGES
  // Options for the html-react-parser
  // This function will replace the [img name="img1" type="lg"] shortcode with the RailImage component
  let firstImageFound = false
  const options = {
    replace: ({ data }: any) => {
      if (data) {
        const regex = /(?:<p>\s*)?\[img name="([^"]*)" type="([^"]*)"\s*\/?\](?:\s*<\/p>)?/g
        let match
        let newData = data
        while ((match = regex.exec(data)) !== null) {
          // Extract name and type from each match
          const name = match[1]
          const type = match[2]

          // Determine if this is the first image
          const isFirstImage = !firstImageFound
          firstImageFound = true

          // Construct the RailImage component for each match
          const railImageComponent = <RailImage name={name} type={type} images={images} priority={isFirstImage} />
          // Replace the matched shortcode with the RailImage component
          newData = newData.replace(match[0], railImageComponent)
          return railImageComponent
        }
      }
    },
  }

  // ================================================
  // Split the content by paragraphs
  const paragraphs = fullBodyText.split(/<\/p>/).map((para) => para + "</p>")

  // Calculate total word count
  const totalWordCount = paragraphs.reduce((count, para) => count + para.split(/\s+/).filter(Boolean).length, 0)

  const sectionSlug = articleData.section.slug

  // Calculate split content only for non-poetry articles
  const { firstHalf, secondHalf } = useMemo(() => {
    // For poetry section, return full content as firstHalf
    if (sectionSlug === "poetry") {
      return {
        firstHalf: fullBodyText,
        secondHalf: "",
      }
    }

    let splitIndex = 0
    let wordCount = 0

    // If the article is over 1500 words, put the Ad at 800 words
    // If the article is under 1500 words, split the content in half and put the Ad in the middle

    const targetWordCount = totalWordCount <= 1500 ? Math.ceil(totalWordCount / 2) : 800

    // Loop through paragraphs to find the split index
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraphWordCount = paragraphs[i].split(/\s+/).filter((word) => word).length
      wordCount += paragraphWordCount

      if (wordCount >= targetWordCount) {
        splitIndex = i + 1 // Ensure we split after this paragraph
        break
      }
    }

    // Split the paragraphs at the identified split index
    const firstHalf = paragraphs.slice(0, splitIndex).join("")
    const secondHalf = paragraphs.slice(splitIndex).join("")

    return { firstHalf, secondHalf }
  }, [paragraphs, totalWordCount, sectionSlug, fullBodyText])

  // ================================================

  return (
    <>
      <div className={`content`}>{parse(firstHalf, options)}</div>
      {sectionSlug !== "poetry" && secondHalf && showAd && <ArticleAd />}
      {secondHalf && <div className={`content`}>{parse(secondHalf, options)}</div>}

      {endnote && (
        <div className="content endnote">
          <span className="line"></span>
          {parse(articleData.endnote)}
        </div>
      )}

      <div className="hidden">
        <p>Word count: {totalWordCount}</p>
        <p>Paragraphs: {paragraphs.length}</p>
      </div>

      <BookshopWidget {...articleData} />

      {contributors && <ContributorsBox contributors={contributors} />}
    </>
  )
}

export default ArticleBody
