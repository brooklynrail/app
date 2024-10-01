import parse from "html-react-parser"
import styles from "../../tributePage/tribute.module.scss"

interface BlurbProps {
  text: string
}

const Blurb = (props: BlurbProps) => {
  const { text } = props

  // if text, after the opening <p> tag, starts with a quote mark, then -indent the text to hang the quote
  const hang_quote = text && (text.match(/<p>“/) || text.match(/<p>&ldquo;/)) ? "-indent-3" : ""

  return (
    <div className={`text-2xl tablet:text-3xl font-serif font-normal ${styles.blurb} ${hang_quote}`}>{parse(text)}</div>
  )
}
export default Blurb
