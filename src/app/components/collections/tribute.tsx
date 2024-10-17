"use client"
import Link from "next/link"
import { Collections, Tributes } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import CollectionHead from "./head"
import FeaturedImage from "../featuredImage"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import Title, { TitleType } from "./promos/title"
import TributeWritersList from "../tributePage/writersList"
import TributeHead from "../tributePage/tributeHead"

const CollectionTribute = (collection: Collections) => {
  const { tribute } = collection

  if (!tribute) {
    return null
  }

  const permalink = getPermalink({
    tributeSlug: tribute.slug,
    type: PageType.Tribute,
  })

  return (
    <>
      <div key={collection.id} className="rail-tribute-bg py-9">
        <TributeHead thisTributeData={tribute} articleData={tribute.articles[0]} permalink={permalink} />
      </div>
    </>
  )
}

export default CollectionTribute
