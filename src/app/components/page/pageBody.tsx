import { Pages } from "../../../../lib/types"
import replaceShortcodes from "../article/shortcodes"

interface PageBodyProps {
  pageData: Pages
}

const PageBody = (props: PageBodyProps) => {
  const { pageData } = props

  if (!pageData.body_text) {
    return <></>
  }

  return <div className={`content`}>{replaceShortcodes({ html: pageData.body_text, images: pageData.images })}</div>
}
export default PageBody
