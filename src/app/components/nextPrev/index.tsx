import Link from "next/link"
import { Articles, Issues, Tributes } from "../../../../lib/types"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Title, { TitleType } from "../collections/promos/title"

export enum NextPrevType {
  Issues = "issues",
  Tributes = "tributes",
  Sections = "sections",
  Events = "events",
}
interface NextPrevProps {
  articles: Articles[]
  currentSlug: string
  parentCollection: Tributes | Issues
  type: NextPrevType
}

const NextPrev = (props: NextPrevProps) => {
  const { articles, currentSlug, parentCollection, type } = props

  const articlesListCount = articles.length
  // get the currentArticleIndex
  const currentArticleIndex = articles.findIndex((article: Articles) => article.slug === currentSlug)

  const parentPermalink = (() => {
    switch (type) {
      case NextPrevType.Issues:
        return getPermalink({
          issueSlug: parentCollection.slug,
          type: PageType.Issue,
        })
      case NextPrevType.Tributes:
        return getPermalink({
          tributeSlug: parentCollection.slug,
          type: PageType.Tribute,
        })
      default:
        return ""
    }
  })()

  const articlePermalink = (article: Articles, type: NextPrevType) => {
    switch (type) {
      case NextPrevType.Issues:
        return getPermalink({
          year: article.issue.year,
          month: article.issue.month,
          section: article.section.slug,
          slug: article.slug,
          type: PageType.Article,
        })
      case NextPrevType.Tributes:
        return getPermalink({
          tributeSlug: parentCollection.slug,
          slug: article.slug,
          type: PageType.TributeArticle,
        })
      default:
        return ""
    }
  }

  const parentCollectionType = (type: NextPrevType) => {
    switch (type) {
      case NextPrevType.Issues:
        return "Issue"
      case NextPrevType.Tributes:
        return "In Memorium"
      default:
        return ""
    }
  }

  const parentCollectionTitle = (type: NextPrevType) => {
    switch (type) {
      case NextPrevType.Issues:
        return <h3 className="uppercase font-bold text-sm">{parentCollection.title}</h3>
      case NextPrevType.Tributes:
        return <h3 className="">{parentCollection.title}</h3>
      default:
        return ""
    }
  }

  const prevLink = () => {
    // if is the first article
    if (currentArticleIndex == 0 || currentArticleIndex == articlesListCount) {
      return (
        <div className="prev">
          <Link href={parentPermalink} className="text-sm tablet-lg:text-md">
            <span className="uppercase text-xs">{parentCollectionType(type)}</span>
            {parentCollectionTitle(type)}
          </Link>
        </div>
      )
    }
    const prev: Articles = articles[currentArticleIndex - 1]

    return <ArticleLink {...props} permalink={articlePermalink(prev, type)} article={prev} text="Previous" />
  }

  const nextLink = () => {
    if (currentArticleIndex === articlesListCount - 1) {
      return (
        <div className="text-xs text-right">
          <Link href={parentPermalink}>
            <span className="uppercase">{parentCollectionType(type)}</span>
            {parentCollectionTitle(type)}
          </Link>
        </div>
      )
    }

    const next: Articles = articles[currentArticleIndex + 1]
    return <ArticleLink {...props} permalink={articlePermalink(next, type)} article={next} text="Next" />
  }

  return (
    <nav className="flex justify-between border-t-[1px] rail-border py-6">
      {prevLink()}
      {nextLink()}
    </nav>
  )
}

const Section = ({
  article,
  type,
  parentCollection,
}: {
  article: Articles
  type: NextPrevType
  parentCollection: Tributes | Issues
}) => {
  switch (type) {
    case NextPrevType.Issues:
      return (
        <h4 className="text-sm space-x-2">
          <span className="font-bold">{parse(article.section.name)}</span>
          {article.kicker && (
            <>
              <span className="border-r rail-border !border-solid h-3 relative top-[1px] inline-block"></span>
              <span>{parse(article.kicker)}</span>
            </>
          )}
        </h4>
      )
    case NextPrevType.Tributes:
      return <>{parentCollection.title}</>
    default:
      return <></>
  }
}

const ArticleLink = ({
  article,
  permalink,
  text,
  parentCollection,
  type,
}: {
  article: Articles
  permalink: string
  text: string
  parentCollection: Tributes | Issues
  type: NextPrevType
}) => {
  return (
    <div className={`text-xs ${text === "Next" && "text-right"}`}>
      <Link href={permalink}>
        <span className="uppercase block">{text}</span>
        <Section article={article} parentCollection={parentCollection} type={type} />
        <ArticleTitle article={article} type={type} />
      </Link>
    </div>
  )
}

const ArticleTitle = ({ article, type }: { article: Articles; type: NextPrevType }) => {
  switch (type) {
    case NextPrevType.Issues:
      return <Title title={article.title} type={TitleType.NextPrev} />
    case NextPrevType.Tributes:
      return <Bylines article={article} type={BylineType.TributeNextPrev} hideBy={true} />
    default:
      return <></>
  }
}

export default NextPrev
