import parse from "html-react-parser"

const HTMLBody = (props: any) => {
  const { code } = props

  // Render the processed HTML content
  return <div className="content">{parse(code)}</div>
}

export default HTMLBody
