"use client"

import parse from "html-react-parser"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import Header, { HeaderType } from "../header"
import Paper from "../paper"
import NextPrev, { NextPrevType } from "../nextPrev"
import ArticleHead from "./articleHead"
import replaceShortcodes from "./shortcodes"
import BookshopWidget from "./bookshop"
import ContributorsBox from "../contributorsBox"
import styles from "./poetry.module.scss"
import CoversPopup from "../issueRail/coversPopup"

const Article = (props: ArticleProps) => {
  const { thisIssueData, articleData, permalink, currentSection } = props
  const { body_text, images, endnote, contributors } = articleData

  return (
    <Paper pageClass="paper-article">
      <header role="banner">
        <div className="grid grid-cols-4 tablet:grid-cols-12 gap-4 desktop:gap-3 gap-y-4">
          <div className="col-span-12">
            <Header type={HeaderType.Alt} />
          </div>
        </div>
      </header>

      <article className="">
        <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3 gap-x-6 desktop-lg:gap-x-12">
          <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2">
            <NextPrev
              parentCollection={thisIssueData}
              articles={thisIssueData.articles}
              currentSlug={articleData.slug}
              type={NextPrevType.Issues}
            />
          </div>

          <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 ">
            <ArticleHead {...{ permalink, thisIssueData, currentSection, articleData }} />
          </div>
          <div className="col-span-4 tablet-lg:col-span-10 desktop:col-span-8 tablet-lg:col-start-2 desktop:col-start-3">
            {body_text && (
              <div className={`${styles.content_poetry} content`}>
                {replaceShortcodes({ html: body_text, images: images })}
                {endnote && (
                  <div className="endnote">
                    <span className="line"></span>
                    {parse(articleData.endnote)}
                  </div>
                )}
                <BookshopWidget {...articleData} />
              </div>
            )}

            {contributors && <ContributorsBox contributors={contributors} />}
            <NextPrev
              parentCollection={thisIssueData}
              articles={thisIssueData.articles}
              currentSlug={articleData.slug}
              type={NextPrevType.Issues}
            />
          </div>
        </div>
      </article>
      <CoversPopup />
    </Paper>
  )
}

export default Article
