"use client"
import { useEffect } from "react"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import Paper, { PaperType } from "../paper"
import ArticlePage from "./page/article"
import ArticleCriticsPage from "./page/criticsPage"
import { useArticleSwitcher } from "@/app/hooks/useArticleSwitcher"

const Article = (props: ArticleProps) => {
  const { articleData, currentSection, navData, thisIssueData } = props

  // Use the article switcher hook, which now returns next and previous articles
  const { currentArticle, nextArticle, prevArticle, swipeHandlers, animationState } = useArticleSwitcher(
    articleData,
    thisIssueData.articles,
  )

  const type = currentSection.slug === "criticspage" ? PaperType.CriticsPage : PaperType.Default

  // Scroll to the top when the current article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [currentArticle])

  const articleContainerStyles = `w-[100%] h-full flex-none flex overflow-hidden opacity-100 px-3 tablet-lg:px-6 `
  return (
    <Paper pageClass={`theme-${currentSection.slug}`} type={type} navData={navData}>
      {/* Container for swipeable articles */}
      <div className="flex w-screen h-full overflow-hidden" {...swipeHandlers}>
        {/* Current article */}
        <article className={`article-container ${articleContainerStyles} ${animationState} sticky top-0`}>
          {currentArticle.section.slug === "criticspage" ? (
            <ArticleCriticsPage {...props} articleData={currentArticle} />
          ) : (
            <ArticlePage {...props} articleData={currentArticle} />
          )}
        </article>
      </div>
    </Paper>
  )
}

export default Article
