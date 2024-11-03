import Link from "next/link"
import { Articles, Issues, Tributes } from "../../../../lib/types"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Title, { TitleType } from "../collections/promos/title"
import { useArticleSwitcher } from "@/app/hooks/useArticleSwitcher"
import { useEffect } from "react"

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
  switchArticle?: (slug: string) => void
}

const NextPrev = ({ articles, currentSlug, parentCollection, type, switchArticle }: NextPrevProps) => {
  const currentArticleIndex = articles.findIndex((article) => article.slug === currentSlug)
  const articlesListCount = articles.length

  // Initialize the hook with the current article and list of articles
  const { currentArticle, setArticleSlug, swipeHandlers } = useArticleSwitcher(articles[currentArticleIndex], articles)

  useEffect(() => {
    console.log("Viewing article:", currentArticle.title)
  }, [currentArticle])

  const getParentPermalink = () => {
    if (type === NextPrevType.Issues) {
      return getPermalink({
        issueSlug: parentCollection.slug,
        type: PageType.Issue,
      })
    }
    return getPermalink({
      tributeSlug: parentCollection.slug,
      type: PageType.Tribute,
    })
  }

  const getArticlePermalink = (article: Articles) => {
    if (type === NextPrevType.Issues) {
      return getPermalink({
        year: article.issue.year,
        month: article.issue.month,
        section: article.section.slug,
        slug: article.slug,
        type: PageType.Article,
      })
    }
    return getPermalink({
      tributeSlug: parentCollection.slug,
      slug: article.slug,
      type: PageType.TributeArticle,
    })
  }

  const getParentCollectionTitle = () => (
    <h3 className={type === NextPrevType.Issues ? "uppercase font-bold text-sm" : ""}>{parentCollection.title}</h3>
  )

  const renderLink = (article: Articles, text: string) => (
    <ArticleLink
      article={article}
      permalink={getArticlePermalink(article)}
      text={text}
      parentCollection={parentCollection}
      type={type}
      switchArticle={switchArticle}
    />
  )

  const prevLink = () => {
    if (currentArticleIndex <= 0) {
      return (
        <div className="text-xs w-1/2">
          <Link href={getParentPermalink()}>
            <span className="uppercase">{type === NextPrevType.Issues ? "Issue" : "In Memoriam"}</span>
            {getParentCollectionTitle()}
          </Link>
        </div>
      )
    }
    return renderLink(articles[currentArticleIndex - 1], "Previous")
  }

  const nextLink = () => {
    if (currentArticleIndex >= articlesListCount - 1) {
      return (
        <div className="text-xs w-1/2 text-right">
          <Link href={getParentPermalink()}>
            <span className="uppercase">{type === NextPrevType.Issues ? "Issue" : "In Memoriam"}</span>
            {getParentCollectionTitle()}
          </Link>
        </div>
      )
    }
    return renderLink(articles[currentArticleIndex + 1], "Next")
  }

  return (
    <nav
      {...swipeHandlers} // Attach swipe handlers to the nav for mobile swipe support
      className={`py-3 flex justify-between ${type === NextPrevType.Tributes ? "pt-0 pb-6" : "pb-3 tablet:pb-3"}`}
    >
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
  if (type === NextPrevType.Issues) {
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
  }
  return <>{parentCollection.title}</>
}

const ArticleLink = ({
  article,
  permalink,
  text,
  parentCollection,
  type,
  switchArticle,
}: {
  article: Articles
  permalink: string
  text: string
  parentCollection: Tributes | Issues
  type: NextPrevType
  switchArticle?: (slug: string) => void
}) => {
  return (
    <div className={`text-xs w-1/2 ${text === "Next" && "text-right"}`}>
      <Link
        href={permalink}
        onClick={(e) => {
          if (switchArticle) {
            e.preventDefault() // Prevent default navigation behavior
            switchArticle(article.slug) // Trigger article switch
          }
        }}
      >
        <span className="uppercase block">{text}</span>
        {type === NextPrevType.Issues && <Section article={article} parentCollection={parentCollection} type={type} />}
        <ArticleTitle article={article} type={type} />
      </Link>
    </div>
  )
}

const ArticleTitle = ({ article, type }: { article: Articles; type: NextPrevType }) => {
  if (type === NextPrevType.Issues) {
    return <Title title={article.title} type={TitleType.NextPrev} />
  }
  return <Bylines article={article} type={BylineType.TributeNextPrev} hideBy={true} />
}

export default NextPrev
