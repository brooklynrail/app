import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import CoversPopup from "../issuePage/coversPopup"
import Paper, { PaperType } from "../paper"
import ArticlePage from "./page/article"
import ArticleCriticsPage from "./page/criticsPage"
import { useArticleSwitcher } from "@/app/hooks/useArticleSwitcher"

const Article = (props: ArticleProps) => {
  const { articleData, currentSection, navData, thisIssueData } = props
  const { currentArticle, swipeHandlers, animationState } = useArticleSwitcher(articleData, thisIssueData.articles)

  const type = currentSection.slug === "criticspage" ? PaperType.CriticsPage : PaperType.Default

  return (
    <Paper pageClass={`theme-${currentSection.slug}`} type={type} navData={navData}>
      <article className={`px-3 tablet-lg:px-6 article-container ${animationState}`} {...swipeHandlers}>
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
