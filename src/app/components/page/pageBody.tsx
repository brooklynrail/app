import { Pages } from "../../../../lib/types"
import replaceShortcodes from "../article/shortcodes"
import Board from "./board"
import Staff from "./staff"

export interface PageBodyProps {
  pageData: Pages
}

const PageBody = (props: PageBodyProps) => {
  const { pageData } = props

  if (!pageData.body_text) {
    return <></>
  }

  return (
    <div className="divide-y rail-divide space-y-12">
      <div className={`content`}>{replaceShortcodes({ html: pageData.body_text, images: pageData.images })}</div>
      <Board pageData={pageData} />
      <Staff pageData={pageData} />
    </div>
  )
}

export default PageBody
