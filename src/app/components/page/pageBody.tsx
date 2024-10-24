import { Pages } from "../../../../lib/types"
import replaceShortcodes from "../article/shortcodes"
import Board from "./board"
import Staff from "./staff"
import Supporters from "./supporters"

export interface PageBodyProps {
  pageData: Pages
}

const PageBody = (props: PageBodyProps) => {
  const { pageData } = props

  return (
    <div className="divide-y rail-divide space-y-12">
      {pageData.body_text && (
        <div className={`content`}>{replaceShortcodes({ html: pageData.body_text, images: pageData.images })}</div>
      )}
      <Board pageData={pageData} />
      <Staff pageData={pageData} />
      {/* <Supporters pageData={pageData} /> */}
    </div>
  )
}

export default PageBody
