"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import ContributorsBox from "../contributorsBox"
import NextPrev, { NextPrevType } from "../nextPrev"
import ArticleHead from "./articleHead"
import BookshopWidget from "./bookshop"
import styles from "./poetry.module.scss"
import replaceShortcodes from "./shortcodes"

const ArticleBody = (props: ArticleProps) => {
  const { thisIssueData, articleData, permalink, currentSection } = props
  const { body_text, images, endnote, contributors } = articleData

  return (
    <>
      <div className="col-span-4 tablet-lg:col-span-12 border-b rail-border">
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
      <div className="col-span-4 tablet-lg:col-span-10 tablet-lg:col-start-2 space-y-12">
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
      </div>
      <div className="col-span-4 tablet-lg:col-span-12 border-t rail-border">
        <NextPrev
          parentCollection={thisIssueData}
          articles={thisIssueData.articles}
          currentSlug={articleData.slug}
          type={NextPrevType.Issues}
        />
      </div>
    </>
  )
}

export default ArticleBody
