import Link from "next/link"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"

export enum TitleType {
  XSmall = "text-base font-serif font-normal",
  Small = "text-2xl font-light",
  Medium = "text-3xl tablet:text-4xl font-light",
  Lead = "text-4xl tablet:text-5xl desktop:text-6xl font-light",
  TributeArticle = "text-2xl font-serif font-light",
  Tribute = "text-center font-bold text-4xl tablet-lg:text-5xl",
  CriticsPage = "text-center font-normal font-serif text-6xl",
}

interface TitleProps {
  title: string
  permalink?: string
  type: TitleType
}

const Title = (props: TitleProps) => {
  const { title, permalink, type } = props

  if (!title) {
    return <></>
  }

  // remove some of the HTML from the titles
  function replaceNbsps(str: string) {
    // Replace non-breaking spaces
    var reNbsp = new RegExp(String.fromCharCode(160), "g")
    str = str.replace(reNbsp, " ")

    // Remove <br/> tags
    str = str.replace(/<br\s*\/?>/gi, " ")

    // Remove <span> tags with specific styles while preserving the text within
    str = str.replace(/<span[^>]*style=["'][^"']*font-size:\s*80%[^"']*["'][^>]*>(.*?)<\/span>/gi, "$1")

    return str
  }

  const title_contents = parse(replaceNbsps(title))

  if (!permalink) {
    return <h2 className={`${type}`}>{title_contents}</h2>
  }

  return (
    <h2 className={`${type}`}>
      <Link href={permalink} title={`Visit ${stripHtml(replaceNbsps(title)).result}`}>
        {title_contents}
      </Link>
    </h2>
  )
}
export default Title
