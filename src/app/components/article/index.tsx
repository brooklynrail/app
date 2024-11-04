"use client"
import { useEffect } from "react"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import CoversPopup from "../issuePage/coversPopup"
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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentArticle])

  const articleContainerStyles = `w-[60%] flex-none flex overflow-hidden opacity-100 px-3 tablet-lg:px-6 `
  return (
    <Paper pageClass={`theme-${currentSection.slug}`} type={type} navData={navData}>
      {/* Container for swipeable articles */}
      <div className="relative flex w-full bg-pink-100 overflow-hidden" {...swipeHandlers}>
        {/* Previous article (sticky to the left) */}
        {prevArticle && (
          <article
            className={`bg-amber-400 bg-opacity-20 sticky top-0 right-[80%] article-container ${articleContainerStyles} ${
              animationState === "prev-enter" ? "enter-animation" : ""
            }`}
          >
            {prevArticle.section.slug === "criticspage" ? (
              <ArticleCriticsPage {...props} articleData={prevArticle} />
            ) : (
              <ArticlePage {...props} articleData={prevArticle} />
            )}
          </article>
        )}

        {/* Current article */}
        <article className={`mx-auto article-container ${articleContainerStyles} ${animationState} sticky top-0`}>
          {currentArticle.section.slug === "criticspage" ? (
            <ArticleCriticsPage {...props} articleData={currentArticle} />
          ) : (
            <ArticlePage {...props} articleData={currentArticle} />
          )}
        </article>

        {/* Next article (sticky to the right) */}
        {nextArticle && (
          <article
            className={`bg-amber-400 bg-opacity-20 sticky top-0 left-[80%] article-container ${articleContainerStyles} ${
              animationState === "next-enter" ? "enter-animation" : ""
            } `}
          >
            {nextArticle.section.slug === "criticspage" ? (
              <ArticleCriticsPage {...props} articleData={nextArticle} />
            ) : (
              <ArticlePage {...props} articleData={nextArticle} />
            )}
          </article>
        )}
      </div>

      <CoversPopup />
    </Paper>
  )
}

export default Article
