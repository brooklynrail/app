import parse from "html-react-parser"

interface ExcerptProps {
  excerpt: string
  classes?: string
}

const Excerpt = (props: ExcerptProps) => {
  const { excerpt, classes } = props

  if (!excerpt) {
    return null
  }

  return <div className={`excerpt ${classes}`}>{parse(excerpt)}</div>
}
export default Excerpt
