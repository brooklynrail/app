"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import ContributorsBox from "../../contributorsBox"
import BookshopWidget from "../bookshop"
import styles from "../poetry.module.scss"
import replaceShortcodes from "../shortcodes"

const ArticleBody = (props: ArticleProps) => {
  const { thisIssueData, articleData, permalink, currentSection } = props
  const { body_text, images, endnote, contributors } = articleData

  return (
    <>
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
    </>
  )
}

export default ArticleBody
