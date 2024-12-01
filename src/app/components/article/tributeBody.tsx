import { Articles, Issues, Sections } from "../../../../lib/types"
import NextPrev, { NextPrevType } from "../nextPrev"
import ArticleHead from "./articleHead"
import ArticleBody from "./articleBody"

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

const TributeBody = (props: ArticleBodyProps) => {
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
        <div className="grid grid-cols-4 tablet-lg:grid-cols-10 gap-3">
          <div className="col-span-4 tablet-lg:col-span-8 tablet-lg:col-start-2">
            <ArticleBody articleData={articleData} />
          </div>
        </div>
      </div>

      {thisIssueData && type === BodyTypes.Article && (
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
export default TributeBody
