import Link from "next/link"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import { cleanup } from "../../../../../lib/utils"

export enum TitleType {
  XSmall = "text-base font-serif font-normal",
  Small = "text-2xl font-light",
  Medium = "text-3xl tablet:text-4xl font-light",
  ArticleHead = "text-5xl tablet:text-6xl font-light",
  ArticleHeadDiptych = "text-5xl tablet:text-6xl font-light text-center",
  Lead = "text-4xl tablet:text-5xl desktop:text-6xl font-light",
  TributeArticle = "text-lg tablet-lg:text-2xl font-serif font-light",
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

  const title_contents = parse(cleanup(title))

  if (!permalink) {
    return <h2 className={`${type}`}>{title_contents}</h2>
  }

  return (
    <h2 className={`${type}`}>
      <Link href={permalink} title={`Visit ${stripHtml(cleanup(title)).result}`}>
        {title_contents}
      </Link>
    </h2>
  )
}
export default Title
