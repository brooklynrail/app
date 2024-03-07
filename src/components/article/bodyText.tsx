import replaceShortcodes from "./shortcodes"

const BodyText = (props: any) => {
  const { body_text, images } = props
  return (
    <>
      <div className="content">{replaceShortcodes(body_text, images)}</div>
    </>
  )
}

export default BodyText
