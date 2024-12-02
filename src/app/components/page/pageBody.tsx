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
  const { body_text, images } = pageData

  const fullBodyText = body_text && replaceShortcodes({ html: body_text, images: images })
  if (!body_text || !fullBodyText) {
    return <></>
  }

  return (
    <div className="divide-y rail-divide space-y-12">
      <div className={`content content-page`}>{parse(fullBodyText)}</div>
      <Board pageData={pageData} />
      <Staff pageData={pageData} />
      <Supporters pageData={pageData} />
      {pageData.footnotes && <div className="py-6 text-sm">{parse(pageData.footnotes)}</div>}
    </div>
  )
}

export default PageBody
