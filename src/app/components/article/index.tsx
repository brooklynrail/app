"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import CoversPopup from "../issuePage/coversPopup"
import Paper, { PaperType } from "../paper"
import ArticlePage from "./page/article"
import ArticleCriticsPage from "./page/criticsPage"
import { useArticleSwitcher } from "@/app/hooks/useArticleSwitcher"

const Article = (props: ArticleProps) => {
  const { articleData, currentSection, navData, thisIssueData } = props // Ensure articles list is passed as props

  // Initialize the hook with the current article data and list of articles
  const { currentArticle, swipeHandlers } = useArticleSwitcher(articleData, thisIssueData.articles)

  const type = currentSection.slug === "criticspage" ? PaperType.CriticsPage : PaperType.Default

  return (
    <Paper pageClass={`theme-${currentSection.slug}`} type={type} navData={navData}>
      <article className="px-3 tablet-lg:px-6" {...swipeHandlers}>
        {currentArticle.section.slug === "criticspage" ? (
          <ArticleCriticsPage {...props} articleData={currentArticle} />
        ) : (
          <ArticlePage {...props} articleData={currentArticle} />
        )}
      </article>
      <CoversPopup />
    </Paper>
  )
}

export default Article
