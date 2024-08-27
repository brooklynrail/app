import { ArticlesFiles } from "../../../../lib/types"
import replaceShortcodes from "./shortcodes"

interface BodyTextProps {
  body_text?: string | null
  images: any[] | ArticlesFiles[]
  preview?: boolean
}

const BodyText = (props: BodyTextProps) => {
  const { body_text, images, preview } = props
  if (!body_text) {
    return <></>
  }
  return <div className="content">{replaceShortcodes({ html: body_text, images: images, preview: preview })}</div>
}

export default BodyText
