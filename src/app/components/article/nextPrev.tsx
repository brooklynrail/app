import parse from "html-react-parser"
import { Articles } from "../../../../lib/types"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import { PageType, getPermalink } from "../../../../lib/utils"
import Link from "next/link"

export const NextPrev = (props: ArticleProps) => {
  const { thisIssueData, currentSection, articleData } = props
  const { slug } = articleData
  const issueName = thisIssueData.title

  const issuePermalink = getPermalink({
    year: thisIssueData.year,
    month: thisIssueData.month,
    type: PageType.Issue,
  })

  const issueArticles = thisIssueData.articles

  const articlesListCount = issueArticles.length
  // get the currentArticleIndex
  const currentArticleIndex = issueArticles.findIndex((article: Articles) => article.slug === slug)

  const prevLink = () => {
    // if is the first article
    if (currentArticleIndex == 0 || currentArticleIndex == articlesListCount) {
      return (
        <div className="text-xs">
          <Link href={issuePermalink}>
            <span className="">ISSUE</span>
            <h3 className="text-xs uppercase font-bold">{issueName}</h3>
          </Link>
        </div>
      )
    }
    const prev: Articles = issueArticles[currentArticleIndex - 1]

    const prevPermalink = getPermalink({
      year: thisIssueData.year,
      month: thisIssueData.month,
      section: prev.section.slug,
      slug: prev.slug,
      type: PageType.Article,
    })
    const prevKicker = prev.kicker ? (
      <>
        <span className="border-r-[1px] border-zinc-900"></span>
        <span>{parse(prev.kicker)}</span>
      </>
    ) : null
    return (
      <div className="text-xs">
        <Link href={prevPermalink}>
          <span className="uppercase">Previous</span>
          <h4 className="uppercase text-xs space-x-1.5">
            <strong>{parse(prev.section.name)}</strong>
            {prevKicker}
          </h4>
          <h3 className="text-md font-light">{parse(prev.title)}</h3>
        </Link>
      </div>
    )
  }

  const nextLink = () => {
    // if is the last article

    if (currentArticleIndex === articlesListCount - 1) {
      return (
        <div className="text-xs text-right">
          <Link href={issuePermalink}>
            <span className="">ISSUE</span>
            <h3 className="text-xs uppercase font-bold">{issueName}</h3>
          </Link>
        </div>
      )
    }
    const nextPermalink = getPermalink({
      year: thisIssueData.year,
      month: thisIssueData.month,
      section: next.section.slug,
      slug: next.slug,
      type: PageType.Article,
    })
    const nextKicker = next.kicker ? (
      <>
        <span className="border-r-[1px] border-zinc-900"></span>
        <span>{parse(next.kicker)}</span>
      </>
    ) : null
    return (
      <div className="text-xs text-right">
        <Link href={nextPermalink}>
          <span className="uppercase">Next</span>
          <h4 className="uppercase text-xs space-x-1.5">
            <strong>{parse(next.section.name)}</strong>
            {nextKicker}
          </h4>
          <h3 className="text-md font-light">{parse(next.title)}</h3>
        </Link>
      </div>
    )
  }

  const next: Articles = issueArticles[currentArticleIndex + 1]

  return (
    <nav className="flex w-full justify-between py-3 ">
      {prevLink()}
      {nextLink()}
    </nav>
  )
}

export default NextPrev
