import { ArticlesFiles } from "../../../lib/types"
import replaceShortcodes from "./shortcodes"
interface BodyCodeProps {
  body_code: string
  images: Array<ArticlesFiles>
}
const BodyCode = (props: BodyCodeProps) => {
  const { body_code, images } = props
  return (
    <>
      <div className="content">{replaceShortcodes({ html: body_code, images: images })}</div>
    </>
  )
}

export default BodyCode
