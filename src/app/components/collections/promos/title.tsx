import Link from "next/link"
import { Articles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"

export enum TitleType {
  Small = "text-2xl font-light",
  Medium = "text-3xl tablet:text-4xl font-light",
  Lead = "text-4xl tablet:text-5xl desktop:text-6xl font-light",
  Tribute = "text-center font-bold text-5xl",
}

interface TitleProps {
  title: string
  permalink: string
  type: TitleType
}

const Title = (props: TitleProps) => {
  const { title, permalink, type } = props

  if (!title) {
    return <></>
  }

  // remove all of the &nbsp; from the title
  function replaceNbsps(str: string) {
    var re = new RegExp(String.fromCharCode(160), "g")
    return str.replace(re, " ")
  }

  return (
    <h2 className={`${type}`}>
      <Link href={permalink} title={`Visit ${stripHtml(replaceNbsps(title)).result}`}>
        {parse(replaceNbsps(title))}
      </Link>
    </h2>
  )
}
export default Title
