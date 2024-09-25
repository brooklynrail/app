import Link from "next/link"
import { Articles, Tributes } from "../../../../lib/types"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"

interface NextPrevProps {
  articles: Articles[]
  currentSlug: string
  tribute: Tributes
}

const NextPrev = (props: NextPrevProps) => {
  const { articles, currentSlug, tribute } = props

  const articlesListCount = articles.length
  // get the currentArticleIndex
  const currentArticleIndex = articles.findIndex((article: Articles) => article.slug === currentSlug)

  const tributePermalink = getPermalink({
    tributeSlug: tribute.slug,
    type: PageType.Tribute,
  })

  const prevLink = () => {
    // if is the first article
    if (currentArticleIndex == 0 || currentArticleIndex == articlesListCount) {
      return (
        <div className="prev">
          <Link href={tributePermalink} className="text-sm tablet-lg:text-md">
            <span className="uppercase text-xs">In Memorium</span>
            <h3 className="">{tribute.title}</h3>
          </Link>
        </div>
      )
    }
    const prev: Articles = articles[currentArticleIndex - 1]

    const prevPermalink = getPermalink({
      tributeSlug: tribute.slug,
      slug: prev.slug,
      type: PageType.TributeArticle,
    })

    return (
      <div className="prev">
        <Link href={prevPermalink} className="text-sm tablet-lg:text-md flex flex-col space-y-2">
          <div>
            <span className="uppercase text-xs">Previous</span>
            <h4>{parse(tribute.title)}</h4>
          </div>

          <Bylines article={prev} type={BylineType.TributeNextPrev} hideBy={true} />
        </Link>
      </div>
    )
  }

  const nextLink = () => {
    // if is the last article

    if (currentArticleIndex === articlesListCount - 1) {
      return (
        <div className="next">
          <Link href={tributePermalink}>
            <span className="uppercase text-xs">In Memorium</span>
            <h3 className="">{tribute.title}</h3>
          </Link>
        </div>
      )
    }

    const next: Articles = articles[currentArticleIndex + 1]

    const nextPermalink = getPermalink({
      tributeSlug: tribute.slug,
      slug: next.slug,
      type: PageType.TributeArticle,
    })
    const nextKicker = next.kicker ? <span>{parse(next.kicker)}</span> : null
    return (
      <div className="next">
        <Link href={nextPermalink} className="text-sm tablet-lg:text-md flex flex-col space-y-2">
          <div>
            <span className="uppercase text-xs">Next</span>
            <h4>
              {parse(next.section.name)}
              {nextKicker}
            </h4>
          </div>

          <Bylines article={next} type={BylineType.TributeNextPrev} hideBy={true} />
        </Link>
      </div>
    )
  }

  return (
    <nav className="flex justify-between border-t-[1px] rail-border py-6">
      {prevLink()}
      {nextLink()}
    </nav>
  )
}

export default NextPrev
