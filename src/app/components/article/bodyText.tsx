import { ArticlesFiles } from "../../../../lib/types"
import replaceShortcodes from "./shortcodes"

interface BodyTextProps {
  body_text?: string | null
  images: any[] | ArticlesFiles[]
}

const BodyText = (props: BodyTextProps) => {
  const { body_text, images } = props
  if (!body_text) {
    return <></>
  }
  return <div className="content">{replaceShortcodes({ html: body_text, images: images })}</div>
}

export default BodyText
