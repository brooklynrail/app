import { Articles, Issues, Sections } from "../../../../lib/types"
import parse from "html-react-parser"
import replaceShortcodes from "./shortcodes"
import BookshopWidget from "./bookshop"
import ArticleHead from "./articleHead"
import ContributorsBox from "../contributorsBox"

interface ArticleBodyProps {
  preview?: boolean
  articleData: Articles
  thisIssueData?: Issues
  currentSection?: Sections
  permalink?: string
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { articleData, preview, thisIssueData, currentSection, permalink } = props
  const { body_text, images } = articleData
  if (!body_text) {
    return <></>
  }

  return (
    <div className="">
      {thisIssueData && currentSection && permalink && (
        <ArticleHead {...{ permalink, thisIssueData, currentSection, articleData }} />
      )}
      <div className="grid grid-cols-4 tablet-lg:grid-cols-8 desktop-lg:grid-cols-9 gap-3">
        <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
          <div className={`content`}>
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
  )
}
export default ArticleBody
