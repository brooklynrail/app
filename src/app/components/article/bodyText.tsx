import { Articles } from "../../../../lib/types"
import replaceShortcodes from "./shortcodes"

const BodyText = (props: Articles) => {
  const { body_text, images } = props
  if (!body_text) {
    return <></>
  }
  return (
    <>
      <div className="content">{replaceShortcodes({ html: body_text, images: images })}</div>
    </>
  )
}

export default BodyText
