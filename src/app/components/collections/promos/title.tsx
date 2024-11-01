import Link from "next/link"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import { cleanup } from "../../../../../lib/utils"

export enum TitleType {
  Medium = "text-3xl tablet:text-4xl font-light",
  CollectionBooksLead = "text-lg tablet:text-4xl font-normal",
  CollectionBooksPromo = "text-lg tablet:text-2xl font-normal",
  SectionPromo = "text-2xl tablet:text-3xl font-light",
  ArticleHead = "text-5xl tablet:text-6xl font-light",
  Lead = "text-4xl tablet:text-5xl desktop:text-6xl font-light",
  LeadArtSeen = "text-4xl tablet:text-4xl font-normal",
  NextPrev = "text-md font-sans font-light",
  TributeArticle = "text-2xl tablet-lg:text-3xl font-sans font-light",
  Tribute = "text-center tablet-lg:text-left font-bold text-3xl tablet-lg:text-5xl",
  CollectionTribute = "text-center tablet-lg:text-left font-bold text-3xl tablet-lg:text-4xl",
  CriticsPage = "text-center font-normal font-serif text-6xl",
  CriticsPageLead = "font-normal font-serif text-6xl",
}

interface TitleProps {
  title: string
  permalink?: string | null
  type?: TitleType
  classes?: string
  h2?: boolean
}

const Title = (props: TitleProps) => {
  const { title, permalink, type, classes, h2 } = props

  if (!title) {
    return <></>
  }

  let title_contents = parse(cleanup(title))

  if (permalink) {
    title_contents = (
      <Link href={permalink} title={`Visit ${stripHtml(cleanup(title)).result}`}>
        {title_contents}
      </Link>
    )
  }

  if (h2) {
    return <h2 className={`${type} ${classes}`}>{title_contents}</h2>
  }
  return <h3 className={`${type} ${classes}`}>{title_contents}</h3>
}
export default Title
