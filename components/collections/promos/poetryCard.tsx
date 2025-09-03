import parse from "html-react-parser"
import { Articles } from "@/lib/types"
import styles from "./promos.module.scss"
import { getPermalink, PageType } from "@/lib/utils"
import Link from "next/link"
import RailImage from "@/components/article/railImage"

const PoetryCard = (article: Articles) => {
  const { body_text, excerpt, issue, section, images } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  // This checks for the existence of a poetry tag in tag in the body_text

  // find all of the text between the first instance of [poetry] and the second [/poetry] tags
  const poetryRegex = /\[poetry\]([\s\S]*?)\[\/poetry\]/
  const poetryMatch = body_text && body_text.match(poetryRegex)

  if (poetryMatch && poetryMatch[1]) {
    // Clean up any unwanted <p> or </p> tags at the start and end
    let poetryContent = poetryMatch[1]

    // Remove starting </p> if it exists
    if (poetryContent.startsWith("</p>")) {
      poetryContent = poetryContent.replace(/^<\/p>/, "")
    }

    // Remove starting <br/> if it exists
    if (poetryContent.startsWith("<br />")) {
      poetryContent = poetryContent.replace(/^<br \/>/, "")
    }

    // Remove ending <p> if it exists
    if (poetryContent.endsWith("<p>")) {
      poetryContent = poetryContent.replace(/<p>$/, "")
    }

    // Sometimes there are images in the poetryContent and they need to render in the poetryCard
    // Remove wrapping <p> tags around any image shortcode
    const imageShortcodeRegex = /<p>\[img name="([^"]*)" type="([^"]*)"\s*\/?\]<\/p>/g
    poetryContent = poetryContent.replace(imageShortcodeRegex, '[img name="$1" type="$2" /]')

    // These are the options for the html-react-parser
    // which will replace the image shortcode with the RailImage component
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

            // Construct the RailImage component for each match
            const railImageComponent = <RailImage name={name} type={type} images={images} priority={true} />

            // Replace the matched shortcode with the RailImage component
            newData = newData.replace(match[0], railImageComponent)
            return railImageComponent
          }
        }
      },
    }

    return (
      <div className={`bg-white relative h-[350px] overflow-hidden shadow-lg ${styles.poetrycard}`}>
        <Link href={permalink}>
          <div className="absolute bg-gradient-to-t from-stone-50 h-full w-full top-0 bottom-0 z-20"></div>
          <div className="p-3 text-zinc-800">{parse(poetryContent, options)}</div>
        </Link>
      </div>
    )
  }

  return <div className={styles.poetrycard}>{excerpt && parse(excerpt)}</div>
}
export default PoetryCard
