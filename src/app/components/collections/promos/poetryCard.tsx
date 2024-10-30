import parse from "html-react-parser"
import { Articles } from "../../../../../lib/types"
import styles from "./promos.module.scss"
import { getPermalink, PageType } from "../../../../../lib/utils"
import Link from "next/link"

const PoetryCard = (article: Articles) => {
  const { body_text, excerpt, issue, section } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  // find all of the text between the first instance of [poetry] and the second [/poetry] tags
  const poetryRegex = /\[poetry\]([\s\S]*?)\[\/poetry\]/
  const poetryMatch = body_text && body_text.match(poetryRegex)

  if (poetryMatch) {
    return (
      <div className={`bg-white relative h-[350px] overflow-hidden shadow-lg ${styles.poetrycard}`}>
        <Link href={permalink}>
          <div className="absolute bg-gradient-to-t from-stone-50 h-full w-full top-0 bottom-0"></div>
          <div className="p-3 text-zinc-800">{parse(poetryMatch[1])}</div>
        </Link>
      </div>
    )
  }

  return <div className={styles.poetrycard}>{excerpt && parse(excerpt)}</div>
}
export default PoetryCard