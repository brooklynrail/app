import { Pages } from "../../../../lib/types"
import replaceShortcodes from "../article/shortcodes"
import Board from "./board"
import Staff from "./staff"
import Supporters from "./supporters"
import parse from "html-react-parser"

export interface PageBodyProps {
  pageData: Pages
}

const PageBody = (props: PageBodyProps) => {
  const { pageData } = props

  return (
    <div className="divide-y rail-divide space-y-12">
      {pageData.body_text && (
        <div className={`content content-page`}>
          {replaceShortcodes({ html: pageData.body_text, images: pageData.images })}
        </div>
      )}
      <Board pageData={pageData} />
      <Staff pageData={pageData} />
      <Supporters pageData={pageData} />
      {pageData.footnotes && <div className="py-6 text-sm">{parse(pageData.footnotes)}</div>}
    </div>
  )
}

export default PageBody
