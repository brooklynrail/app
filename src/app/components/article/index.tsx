"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import CoversPopup from "../issuePage/coversPopup"
import Paper, { PaperType } from "../paper"
import ArticlePage from "./page/article"
import ArticleCriticsPage from "./page/criticsPage"

const Article = (props: ArticleProps) => {
  const { articleData, currentSection, navData } = props

  const type = currentSection.slug === "criticspage" ? PaperType.CriticsPage : PaperType.Default

  return (
    <Paper pageClass={`theme-${currentSection.slug}`} type={type} navData={navData}>
      <article className="px-3 tablet-lg:px-6">
        {articleData.section.slug === "criticspage" ? <ArticleCriticsPage {...props} /> : <ArticlePage {...props} />}
      </article>
      <CoversPopup />
    </Paper>
  )
}

export default Article
