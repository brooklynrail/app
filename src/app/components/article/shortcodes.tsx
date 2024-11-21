import parse from "html-react-parser"
import RailImage from "./railImage"
import { ArticlesFiles } from "../../../../lib/types"

// [promo type="free-text"]<h6>On View</h6><strong>Lisson Gallery</strong><br/>January 11&#150;February 17, 2024<br/>New York[/promo]
const replacePromo = (html: string) => {
  const regex = /\[promo type="([^"]*)"\]([\s\S]*?)\[\/promo\]/g
  // Replace the promo shortcode with a custom HTML structure
  return html.replace(regex, (match, type, content) => {
    return `<div class="width-sm promo ${type}" data-type="${type}">${content}</div>`
  })
}

// [quote cite="Phong Bui" url="https://brooklynrail.org"] ... [/quote]
const replaceQuote = (html: string) => {
  const regex = /\[quote cite="([^"]*)"(?:\s+url="([^"]*)")?\]([\s\S]*?)\[\/quote\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, cite, url, content) => {
    const linkedCite = url ? `<a href="${url}">${cite}</a>` : cite
    const citeTag = cite ? `<cite>— ${linkedCite}</cite>` : ""
    return `<blockquote class="quote" data-type="${cite}">“${content}”${citeTag}</blockquote>`
  })
}

// [pullquote cite="Phong Bui" url="https://brooklynrail.org"] ... [/pullquote]
const replacePullQuote = (html: string) => {
  const regex = /\[pullquote cite="([^"]*)"(?:\s+url="([^"]*)")?\]([\s\S]*?)\[\/pullquote\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, cite, url, content) => {
    const linkedCite = url ? `<a href="${url}">${cite}</a>` : cite
    const citeTag = cite ? `<cite>— ${linkedCite}</cite>` : ""
    return `<div class="pullquote width-sm" data-type="${cite}"><pullquote>“${content}”${citeTag}</pullquote></div>`
  })
}

// [blockquote cite="Phong Bui" url="https://brooklynrail.org"] ... [/blockquote]
const replaceBlockquoteCite = (html: string) => {
  const regex = /\[blockquote cite="([^"]*)"(?:\s+url="([^"]*)")?\]([\s\S]*?)\[\/blockquote\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, cite, url, content) => {
    const linkedCite = url ? `<a href="${url}">${cite}</a>` : cite
    const citeTag = cite ? `<cite>— ${linkedCite}</cite>` : ""
    return `<blockquote class="blockquote" data-type="${cite}">“${content}”${citeTag}</blockquote>`
  })
}

// [blockquote] ... [/blockquote]
const replaceBlockquote = (html: string) => {
  const regex = /\[blockquote]([\s\S]*?)\[\/blockquote\]/g
  // Replace the blockquote shortcode with a custom HTML structure
  return html.replace(regex, (match, content) => {
    return `<blockquote>${content}</blockquote>`
  })
}

// [dropcap letter="A"]
const replaceDropcap = (html: string) => {
  const regex = /\[dropcap letter="([^"]*)"\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, letter) => {
    return `<span class="dropcap">${letter}</span>`
  })
}

// [lead] ... [/lead]
const replaceLead = (html: string) => {
  const regex = /\[lead]([\s\S]*?)\[\/lead\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, content) => {
    // First, replace double line breaks with a new paragraph
    const updatedContent = content
      .replace(/\n\n/g, "</p><p>") // Replace double line breaks with new paragraphs
      .replace(/\n/g, "<br>") // Then, replace single line breaks with <br>
    return `<div class="lead"><p>${updatedContent}</p></div>`
  })
}

// [center] ... [/center]
const replaceCenter = (html: string) => {
  const regex = /\[center]([\s\S]*?)\[\/center\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, content) => {
    // First, replace double line breaks with a new paragraph
    const updatedContent = content
      .replace(/\n\n/g, "</p><p>") // Replace double line breaks with new paragraphs
      .replace(/\n/g, "<br>") // Then, replace single line breaks with <br>
    return `<div class="text-align-center"><p>${updatedContent}</p></div>`
  })
}

// [right] ... [/right]
const replaceRightAlign = (html: string) => {
  const regex = /\[right]([\s\S]*?)\[\/right\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, content) => {
    // First, replace double line breaks with a new paragraph
    const updatedContent = content
      .replace(/\n\n/g, "</p><p>") // Replace double line breaks with new paragraphs
      .replace(/\n/g, "<br>") // Then, replace single line breaks with <br>
    return `<div class="text-align-right"><p>${updatedContent}</p></div>`
  })
}

// [rule size="sm"]
const replaceRule = (html: string) => {
  const regex = /\[rule(?:\s+size="([^"]*)")?\]/g
  // Replace the quote shortcode with a custom HTML structure
  return html.replace(regex, (match, size) => {
    return `<hr class="${size}" />`
  })
}

// [poetry] ... [/poetry]
const replacePoetry = (html: string) => {
  const regex = /\[poetry]([\s\S]*?)\[\/poetry\]/g
  // Replace the poetry shortcode with a custom HTML structure
  return html.replace(regex, (match, content) => {
    return `<div class="poetry"><div class="poem">${content}</div></div>`
  })
}

interface ReplaceShortcodesProps {
  html: string
  images: Array<ArticlesFiles>
  preview?: boolean
}
const replaceShortcodes = (props: ReplaceShortcodesProps) => {
  const { html, images, preview } = props
  if (!html) {
    return null
  }
  // Remove <p> and </p> tags surrounding the shortcodes
  let cleanedHtml = html.replace(/<p>\s*(\[img name="[^"]*" type="[^"]*"\s*\/?\])\s*<\/p>/g, "<div>$1</div>")
  cleanedHtml = replacePromo(cleanedHtml)
  cleanedHtml = replaceQuote(cleanedHtml)
  cleanedHtml = replacePullQuote(cleanedHtml)
  cleanedHtml = replaceBlockquoteCite(cleanedHtml)
  cleanedHtml = replaceBlockquote(cleanedHtml)
  cleanedHtml = replaceDropcap(cleanedHtml)
  cleanedHtml = replaceLead(cleanedHtml)
  cleanedHtml = replaceCenter(cleanedHtml)
  cleanedHtml = replaceRightAlign(cleanedHtml)
  cleanedHtml = replaceRule(cleanedHtml)
  cleanedHtml = replacePoetry(cleanedHtml)

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
          const railImageComponent = (
            <RailImage name={name} type={type} images={images} preview={preview} priority={isFirstImage} />
          )
          // Replace the matched shortcode with the RailImage component
          newData = newData.replace(match[0], railImageComponent)
          return railImageComponent
        }
      }
    },
  }

  // Clean up the HTML content before parsing
  const finalHtml = cleanup(cleanedHtml)
  return parse(finalHtml, options)
}

const cleanup = (str: string) => {
  // remove and <p> tags that are wrapping <div> tags
  str = str.replace(/<p>\s*(<div[^>]*>)\s*<\/p>/g, "$1")

  return str
}

export default replaceShortcodes
