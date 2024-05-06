import { Articles } from "../../../../lib/types"
import replaceShortcodes from "./shortcodes"

const BodyCode = (props: Articles) => {
  const { body_code, images } = props
  if (!body_code) {
    return <></>
  }
  return (
    <>
      <div className="content">{replaceShortcodes({ html: body_code, images: images })}</div>
    </>
  )
}

export default BodyCode
