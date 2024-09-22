import Link from "next/link"
import { Articles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"

export enum TitleType {
  Small = "text-2xl font-light",
  Medium = "text-3xl tablet:text-4xl font-light",
  Lead = "text-4xl tablet:text-5xl desktop:text-6xl font-light",
}

interface TitleProps {
  article: Articles
  permalink: string
  type: TitleType
}

const Title = (props: TitleProps) => {
  const { article, permalink, type } = props
  const { title } = article

  if (!title) {
    return <></>
  }

  // remove all of the &nbsp; from the title
  function replaceNbsps(str: string) {
    var re = new RegExp(String.fromCharCode(160), "g")
    return str.replace(re, " ")
  }

  return (
    <h3 className={`${type} font-thin hover:underline`}>
      <Link href={permalink} title={`Visit ${stripHtml(replaceNbsps(title)).result}`}>
        {parse(replaceNbsps(title))}
      </Link>
    </h3>
  )
}
export default Title
