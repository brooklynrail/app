import { Articles } from "../../../../lib/types"
import parse from "html-react-parser"
import replaceShortcodes from "./shortcodes"
import BookshopWidget from "./bookshop"
import Contributors from "../contributors"

interface ArticleBodyProps {
  articleData: Articles
  preview?: boolean
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { articleData, preview } = props
  const { body_text, images } = articleData
  if (!body_text) {
    return <></>
  }

  return (
    <div className="">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-9 gap-3">
        <div className="col-span-4 tablet-lg:col-span-9">
          <div className={`content`}>
            {replaceShortcodes({ html: body_text, images: images, preview: preview })}

            {articleData.endnote && (
              <div className="endnote">
                <span className="line"></span>
                {parse(articleData.endnote)}
              </div>
            )}
            <BookshopWidget {...articleData} />
            {articleData.contributors && (
              <div className="">
                <Contributors contributors={articleData.contributors} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ArticleBody
