import { Articles, Issues, Sections } from "../../../../lib/types"
import parse from "html-react-parser"
import replaceShortcodes from "./shortcodes"
import BookshopWidget from "./bookshop"
import ArticleHead from "./articleHead"
import ContributorsBox from "../contributorsBox"
import styles from "./poetry.module.scss"
import { useArticleContext } from "@/app/context/ArticleProvider"
import NextPrev, { NextPrevType } from "../nextPrev"
import { useEffect, useRef } from "react"

interface ArticleBodyProps {
  preview?: boolean
  articleData: Articles
  thisIssueData?: Issues
  currentSection?: Sections
  permalink?: string
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { preview, thisIssueData, currentSection, permalink } = props
  const { currentArticle, setArticleRef, swipeHandlers } = useArticleContext()
  const articleData = currentArticle
  const articleRef = useRef<HTMLDivElement>(null)
  const { body_text, images } = articleData
  if (!body_text) {
    return <></>
  }

  // Pass the ref to the global context on mount
  useEffect(() => {
    setArticleRef(articleRef.current)
  }, [setArticleRef])

  return (
    <article className="border-t rail-border divide-y rail-divide my-6" {...{ ...swipeHandlers, ref: articleRef }}>
      {thisIssueData && (
        <NextPrev
          parentCollection={thisIssueData}
          articles={thisIssueData.articles}
          currentSlug={articleData.slug}
          type={NextPrevType.Issues}
        />
      )}

      <div className="">
        {thisIssueData && currentSection && permalink && (
          <ArticleHead {...{ permalink, thisIssueData, currentSection, articleData }} />
        )}
        <div className="grid grid-cols-4 tablet-lg:grid-cols-8 desktop-lg:grid-cols-9 gap-3">
          <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
            <div
              className={`content ${currentSection && currentSection.slug === "poetry" ? styles.content_poetry : ""}`}
            >
              {replaceShortcodes({ html: body_text, images: images, preview: preview })}

              {articleData.endnote && (
                <div className="endnote">
                  <span className="line"></span>
                  {parse(articleData.endnote)}
                </div>
              )}
              <BookshopWidget {...articleData} />
            </div>
            {articleData.contributors && <ContributorsBox contributors={articleData.contributors} />}
          </div>
        </div>
      </div>

      {thisIssueData && (
        <NextPrev
          parentCollection={thisIssueData}
          articles={thisIssueData.articles}
          currentSlug={articleData.slug}
          type={NextPrevType.Issues}
        />
      )}
    </article>
  )
}
export default ArticleBody
