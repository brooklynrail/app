"use client"

import parse from "html-react-parser"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import Paper, { PaperType } from "../paper"
import NextPrev, { NextPrevType } from "../nextPrev"
import ArticleHead from "./articleHead"
import replaceShortcodes from "./shortcodes"
import BookshopWidget from "./bookshop"
import ContributorsBox from "../contributorsBox"
import styles from "./poetry.module.scss"
import CoversPopup from "../issuePage/coversPopup"
import ArticleBody from "./articleBody"
import ArticleCriticsPage from "./type/criticsPage"

const Article = (props: ArticleProps) => {
  const { articleData, permalink, currentSection, navData } = props
  const { body_text, images, endnote, contributors } = articleData

  const type = currentSection.slug === "criticspage" ? PaperType.CriticsPage : PaperType.Default

  return (
    <Paper pageClass={`paper-article paper-article-${currentSection.slug}`} type={type} navData={navData}>
      <article className="px-3 tablet-lg:px-6">
        {articleData.section.slug === "criticspage" ? <ArticleCriticsPage {...props} /> : <ArticleBody {...props} />}
      </article>
      <CoversPopup />
    </Paper>
  )
}

export default Article
