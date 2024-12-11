"use client"
import { useEffect } from "react"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import Paper from "../paper"
import ArticlePage from "./page/article"
import ArticleCriticsPage from "./page/criticsPage"
import { useArticleSwitcher } from "@/app/hooks/useArticleSwitcher"
import ArticleBar from "../articleBar"
import { getPermalink, PageType } from "../../../../lib/utils"
import SlideShow from "./slideshow"

const Article = (props: ArticleProps) => {
  const { articleData, currentSection, navData, thisIssueData } = props

  const issuePermalink = getPermalink({
    issueSlug: thisIssueData.slug,
    type: PageType.Issue,
  })

  // Use the article switcher hook, which now returns next and previous articles
  const { currentArticle } = useArticleSwitcher(articleData, thisIssueData.articles, issuePermalink)

  // Scroll to the top when the current article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [currentArticle])

  return (
    <Paper pageClass={`theme-${currentArticle.section.slug}`} navData={navData}>
      <SlideShow article={articleData} />
      <div className="flex w-screen h-full overflow-hidden">
        {/* Current article */}
        <article className={`article-container w-screen h-full overflow-hidden opacity-100 px-3 tablet-lg:px-6`}>
          {currentArticle.section.slug === "criticspage" ? (
            <ArticleCriticsPage {...props} articleData={currentArticle} />
          ) : (
            <ArticlePage {...props} articleData={currentArticle} />
          )}

          {/* <ArticleBar
            goToNextArticle={goToNextArticle}
            goToPrevArticle={goToPrevArticle}
            collectionPermalink={issuePermalink}
          /> */}
        </article>
      </div>
    </Paper>
  )
}

export default Article
