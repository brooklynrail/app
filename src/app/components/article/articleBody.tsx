import { Articles, Issues, Sections } from "../../../../lib/types"
import parse from "html-react-parser"
import replaceShortcodes from "./shortcodes"
import BookshopWidget from "./bookshop"
import ArticleHead from "./articleHead"
import ContributorsBox from "../contributorsBox"
import styles from "./poetry.module.scss"
import NextPrev, { NextPrevType } from "../nextPrev"

export enum BodyTypes {
  Article = "article",
  Tribute = "tribute",
}

interface ArticleBodyProps {
  preview?: boolean
  articleData: Articles
  currentArticle?: Articles
  thisIssueData: Issues
  currentSection?: Sections
  permalink?: string
  articles: Articles[]
  type: BodyTypes
  switchArticle?: (slug: string) => void
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { articleData, preview, thisIssueData, currentSection, permalink, articles, type, switchArticle } = props

  const { body_text, images } = articleData
  if (!body_text) {
    return <></>
  }

  const articleStyles =
    type === BodyTypes.Tribute ? "divide-y rail-divide" : "border-t rail-border divide-y rail-divide my-6"

  return (
    <article className={articleStyles}>
      {thisIssueData && type === BodyTypes.Article && (
        <NextPrev
          parentCollection={thisIssueData}
          articles={articles}
          currentSlug={articleData.slug}
          type={NextPrevType.Issues}
          switchArticle={switchArticle}
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
          articles={articles}
          currentSlug={articleData.slug}
          type={NextPrevType.Issues}
          switchArticle={switchArticle}
        />
      )}
    </article>
  )
}
export default ArticleBody
