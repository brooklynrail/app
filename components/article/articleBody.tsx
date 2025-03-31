"use client"
import { Articles } from "@/lib/types"
import parse from "html-react-parser"
import { useMemo } from "react"
import AdInArticle from "../ads/adInArticle"
import ContributorsBox from "../contributorsBox"
import BookshopWidget from "./bookshop"
import RailImage from "./railImage"
import replaceShortcodes from "./shortcodes"

interface ArticleBodyProps {
  articleData: Articles
}

interface ContentSection {
  content: string
  showAd: boolean
}

function splitContent(paragraphs: string[], totalWordCount: number): ContentSection[] {
  const sections: ContentSection[] = []

  // Helper function to find next split point
  const findNextSplit = (startIndex: number, targetWords: number) => {
    let wordCount = 0
    for (let i = startIndex; i < paragraphs.length; i++) {
      const paragraphWordCount = paragraphs[i].split(/\s+/).filter(Boolean).length
      wordCount += paragraphWordCount

      if (wordCount >= targetWords) {
        return i + 1 // Split after this paragraph
      }
    }
    return paragraphs.length // If we can't reach target, return end
  }

  // For articles under 1500 words, split once in the middle
  if (totalWordCount <= 1500) {
    const splitIndex = findNextSplit(0, Math.ceil(totalWordCount / 2))
    sections.push({ content: paragraphs.slice(0, splitIndex).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(splitIndex).join(""), showAd: false })
  }
  // For articles between 1500-2000 words, split at 800 words
  else if (totalWordCount <= 2000) {
    const splitIndex = findNextSplit(0, 800)
    sections.push({ content: paragraphs.slice(0, splitIndex).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(splitIndex).join(""), showAd: false })
  }
  // For articles between 2000-3000 words, split at 800, 1600, and remaining
  else if (totalWordCount <= 3000) {
    const firstSplit = findNextSplit(0, 800)
    const secondSplit = findNextSplit(firstSplit, 800)

    sections.push({ content: paragraphs.slice(0, firstSplit).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(firstSplit, secondSplit).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(secondSplit).join(""), showAd: false })
  }
  // For articles over 3000 words, split at 800, 1600, 2400, and remaining
  else {
    const firstSplit = findNextSplit(0, 800)
    const secondSplit = findNextSplit(firstSplit, 800)
    const thirdSplit = findNextSplit(secondSplit, 800)

    sections.push({ content: paragraphs.slice(0, firstSplit).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(firstSplit, secondSplit).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(secondSplit, thirdSplit).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(thirdSplit).join(""), showAd: false })
  }

  return sections
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { articleData } = props
  const { body_text, images, endnote, contributors, hide_in_article_ad } = articleData

  const showAd = !hide_in_article_ad
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

  const contentSections = useMemo(() => {
    // If hide_in_article_ad is true, don't split the content
    if (hide_in_article_ad) {
      return [{ content: paragraphs.join(""), showAd: false }]
    }
    return splitContent(paragraphs, totalWordCount)
  }, [paragraphs, totalWordCount])

  // ================================================

  return (
    <>
      <div className="hidden max-w-[120ex] text-xl">
        <p>Word count: {totalWordCount}</p>
        <p>Paragraphs: {paragraphs.length}</p>
      </div>

      {contentSections.map((section, index) => (
        <div key={index}>
          <div className={`content`}>{parse(section.content, options)}</div>
          {section.showAd &&
            showAd &&
            // Show DonationAd for second section in articles over 3000 words
            (totalWordCount > 3000 && index === 1 ? <></> : <AdInArticle />)}
        </div>
      ))}

      {endnote && (
        <div className="content endnote">
          <span className="line"></span>
          {parse(articleData.endnote)}
        </div>
      )}

      <BookshopWidget {...articleData} />

      {contributors && <ContributorsBox contributors={contributors} />}
    </>
  )
}

export default ArticleBody
