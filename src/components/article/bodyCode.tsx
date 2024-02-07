import replaceShortcodes from "./shortcodes"

const BodyCode = (props: any) => {
  const { body_code, images } = props

  return (
    <>
      <div className="content">{replaceShortcodes(body_code, images)}</div>
    </>
  )
}

export default BodyCode
