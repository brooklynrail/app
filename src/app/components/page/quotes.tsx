import { PagesQuotes } from "../../../../lib/types"
import parse from "html-react-parser"

interface QuotesProps {
  quotes?: PagesQuotes[] | null
}

const Quotes = (props: QuotesProps) => {
  const { quotes } = props

  if (!quotes) {
    return <></>
  }

  // shuffle the list of quotes and get the first two
  const shuffledQuotes = quotes.sort(() => 0.5 - Math.random())
  const selectedQuotes = shuffledQuotes.slice(0, 2)

  const allQuotes = selectedQuotes.map((quote, i: number) => {
    return (
      <div key={i} className="px-3 tablet-lg:px-6">
        <blockquote className="font-serif text-xl -indent-2">
          {parse(quote.quote)}
          <cite className="pt-2 pl-2 block">– {parse(quote.name)}</cite>
        </blockquote>
      </div>
    )
  })

  return <div className="py-6 space-y-9">{allQuotes}</div>
}

export default Quotes
