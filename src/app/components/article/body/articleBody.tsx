"use client"
import { ArticleProps } from "@/app/[year]/[month]/[section]/[slug]/page"
import parse from "html-react-parser"
import ContributorsBox from "../../contributorsBox"
import BookshopWidget from "../bookshop"
import styles from "../poetry.module.scss"
import replaceShortcodes from "../shortcodes"
import { useArticleSwitcher } from "@/app/hooks/useArticleSwitcher"
import ArticleBar from "../../articleBar"

const ArticleBody = (props: ArticleProps) => {
  const { thisIssueData, articleData } = props
  const { currentArticle } = useArticleSwitcher(articleData, thisIssueData.articles)
  const { body_text, images, endnote, contributors } = currentArticle

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
                  {parse(currentArticle.endnote)}
                </div>
              )}
              <BookshopWidget {...currentArticle} />
            </div>
          </div>
        </>
      )}

      {contributors && <ContributorsBox contributors={contributors} />}
    </>
  )
}

export default ArticleBody
