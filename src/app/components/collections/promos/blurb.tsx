import parse from "html-react-parser"

interface BlurbProps {
  text: string
}

const Blurb = (props: BlurbProps) => {
  const { text } = props

  // if text, after the opening <p> tag, starts with a quote mark, then -indent the text to hang the quote
  const hang_quote = text && (text.match(/<p>“/) || text.match(/<p>&ldquo;/)) ? "-indent-2" : ""

  return <div className={`text-2xl tablet:text-3xl font-serif font-normal ${hang_quote}`}>{parse(text)}</div>
}
export default Blurb
