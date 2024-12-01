"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import ContributorsBox from "../../contributorsBox"
import BookshopWidget from "../bookshop"
import replaceShortcodes from "../shortcodes"
import { useMemo } from "react"
import RailImage from "../railImage"
import { Articles } from "../../../../../lib/types"

interface ArticleBodyProps {
  articleData: Articles
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { articleData } = props
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

  // Split the content by paragraphs
  const paragraphs = fullBodyText.split(/<\/p>/).map((para) => para + "</p>")

  // Calculate total word count
  const totalWordCount = paragraphs.reduce((count, para) => count + para.split(/\s+/).filter(Boolean).length, 0)

  const { firstHalf, secondHalf } = useMemo(() => {
    let splitIndex = 0
    let wordCount = 0

    // Determine target word count for splitting
    const targetWordCount = totalWordCount <= 1500 ? Math.ceil(totalWordCount / 2) : 1000

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
  }, [paragraphs, totalWordCount])

  return (
    <>
      <div className={`content`}>{parse(firstHalf, options)}</div>
      <div className="h-36 hidden">
        <div className="h-36 w-screen bg-zinc-900 absolute left-0 right-0"></div>
      </div>
      <div className={`content`}>{parse(secondHalf, options)}</div>

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
