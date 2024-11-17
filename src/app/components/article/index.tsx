"use client"
import { useEffect } from "react"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import Paper from "../paper"
import ArticlePage from "./page/article"
import ArticleCriticsPage from "./page/criticsPage"
import { useArticleSwitcher } from "@/app/hooks/useArticleSwitcher"
import ArticleBar from "../articleBar"
import { getPermalink, PageType } from "../../../../lib/utils"

const Article = (props: ArticleProps) => {
  const { articleData, currentSection, navData, thisIssueData } = props

  const issuePermalink = getPermalink({
    issueSlug: thisIssueData.slug,
    type: PageType.Issue,
  })

  // Use the article switcher hook, which now returns next and previous articles
  const { swipeHandlers, nextArticlePermalink, prevArticlePermalink, collectionPermalink } = useArticleSwitcher(
    articleData,
    thisIssueData.articles,
    issuePermalink,
  )

  // Scroll to the top when the current article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [articleData])

  return (
    <Paper pageClass={`theme-${articleData.section.slug}`} navData={navData}>
      {/* Container for swipeable articles */}
      <div className="flex w-screen h-full overflow-hidden" {...swipeHandlers}>
        {/* Current article */}
        <article className={`article-container w-screen h-full overflow-hidden opacity-100 px-3 tablet-lg:px-6`}>
          {articleData.section.slug === "criticspage" ? (
            <ArticleCriticsPage {...props} articleData={articleData} />
          ) : (
            <ArticlePage {...props} articleData={articleData} />
          )}

          <ArticleBar
            collectionPermalink={collectionPermalink}
            nextArticlePermalink={nextArticlePermalink}
            prevArticlePermalink={prevArticlePermalink}
          />
        </article>
      </div>
    </Paper>
  )
}

export default Article
