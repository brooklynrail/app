"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import ContributorsBox from "../../contributorsBox"
import BookshopWidget from "../bookshop"
import styles from "../poetry.module.scss"
import replaceShortcodes from "../shortcodes"

const ArticleBody = (props: ArticleProps) => {
  const { articleData } = props
  const { body_text, images, endnote, contributors } = articleData

  // Use the article switcher hook, which now returns next and previous articles
  return (
    <>
      {body_text && (
        <>
          <div className={`${styles.content_poetry} content`}>
            <div>
              {replaceShortcodes({ html: body_text, images: images })}
              {endnote && (
                <div className="endnote">
                  <span className="line"></span>
                  {parse(articleData.endnote)}
                </div>
              )}
              <BookshopWidget {...articleData} />
            </div>
          </div>
        </>
      )}

      {contributors && <ContributorsBox contributors={contributors} />}
    </>
  )
}

export default ArticleBody
