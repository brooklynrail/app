"use client"
import parse from "html-react-parser"
import { useMemo } from "react"
import { Articles } from "../../../../lib/types"
import ContributorsBox from "../contributorsBox"
import BookshopWidget from "./bookshop"
import RailImage from "./railImage"
import replaceShortcodes from "./shortcodes"
import AdInArticle from "../ads/adInArticle"

interface ArticleBodyProps {
  articleData: Articles
  showAd: boolean
}

interface ContentSection {
  content: string
  showAd: boolean
}

function splitContent(paragraphs: string[], totalWordCount: number, sectionSlug: string): ContentSection[] {
  // Poetry articles don't get split
  if (sectionSlug === "poetry") {
    return [{ content: paragraphs.join(""), showAd: false }]
  }

  const sections: ContentSection[] = []
  let currentIndex = 0
  let currentWordCount = 0

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
  // For articles over 2000 words, split at 800, 1600, and remaining
  else {
    const firstSplit = findNextSplit(0, 800)
    const secondSplit = findNextSplit(firstSplit, 800)

    sections.push({ content: paragraphs.slice(0, firstSplit).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(firstSplit, secondSplit).join(""), showAd: true })
    sections.push({ content: paragraphs.slice(secondSplit).join(""), showAd: false })
  }

  return sections
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

  const contentSections = useMemo(() => {
    return splitContent(paragraphs, totalWordCount, sectionSlug)
  }, [paragraphs, totalWordCount, sectionSlug])

  // ================================================

  return (
    <>
      <div className="max-w-[120ex] p-3 text-xl bg-white dark:bg-zinc-700 bg-opacity-80 dark:bg-opacity-60 backdrop-blur-md">
        <p>Word count: {totalWordCount}</p>
        <p>Paragraphs: {paragraphs.length}</p>
      </div>

      {contentSections.map((section, index) => (
        <div key={index}>
          <div className={`content`}>{parse(section.content, options)}</div>
          {section.showAd && showAd && <AdInArticle />}
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
