import Link from "next/link"
import parse from "html-react-parser"
import Image from "next/image"
import { useEffect, useState } from "react"

// Promo shortcodes
//  <p>[promo type="free-text"]</p>
//  <h6>On View</h6>
//  <p><strong>Lisson Gallery</strong><br>January 11February 17, 2024<br>New York[/promo]</p>
const replacePromoShortcodes = (htmlString: string) => {
  const regex = /<div>\[promo type="([^"]*?)"\]([\s\S]*?)\[\/promo\]<\/div>/g
  return htmlString.replace(regex, (match: any, type: string, content: string) => {
    return `<div className="width-sm promo ${type}">${content}</div>`
  })
}

// Image shortcodes
// [img name="img7" type="lg" /]
const replaceImageShortcodes = (htmlString: string, imageData: Array<any>): Array<React.ReactNode> => {
  const elements: Array<React.ReactNode> = []
  let lastIndex = 0
  const imgRegex = /(?:<p>\s*)?\[img name="(.*?)" type="(.*?)" \/\](?:\s*<\/p>)?/g
  if (imageData) {
    htmlString.replace(imgRegex, (match: any, key: string, type: string, index: number) => {
      // Add the text before the shortcode as a string
      elements.push(htmlString.substring(lastIndex, index))

      // Find the image data and create the Image component
      const thisImg = imageData.find((obj) => obj.shortcode_key === key)
      if (thisImg) {
        let size
        switch (type) {
          case `sm`:
            size = 240
            break
          case `md`:
            size = 440
            break
          case `lg`:
            size = 800
            break
          default:
            size = 1020
        }

        const width = thisImg.width > size ? size : thisImg.width
        const height =
          thisImg.width > size ? (size * thisImg.height) / thisImg.width : (thisImg.height * width) / thisImg.width

        const src = `http://localhost:8055/assets/${thisImg.filename_disk}`
        elements.push(
          <div className={`media width-${type}`} key={key}>
            <Image src={src} width={width} height={height} alt={thisImg.caption ? thisImg.caption : thisImg.title} />
            {thisImg.caption && (
              <figcaption dangerouslySetInnerHTML={{ __html: thisImg.caption }} className={`width-${type}`} />
            )}
          </div>,
        )
      }

      lastIndex = index + match.length
      return "" // Return an empty string (required by .replace, but we're not using its result)
    })
  }

  // Add the remaining text after the last image
  elements.push(htmlString.substring(lastIndex))
  return elements
}

const BodyElements = (props: any) => {
  const { body, images, id } = props

  const imageData = images && images.map((image: any) => ({ ...image.directus_files_id }))

  // Process the content
  const processedContent = replaceImageShortcodes(body, imageData)
  // const processedContent = replacePromoShortcodes(processedImages)

  // Render the processed HTML content
  return (
    <div className="content">
      {processedContent.map((item, index) => (typeof item === "string" ? <div key={index}>{parse(item)}</div> : item))}
    </div>
  )
}

export default BodyElements
