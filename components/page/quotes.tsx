import { useEffect, useState } from "react"
import { PagesQuotes } from "@/lib/types"
import parse from "html-react-parser"

interface QuotesProps {
  quotes?: PagesQuotes[] | null
}

const Quotes = (props: QuotesProps) => {
  const { quotes } = props
  const [selectedQuotes, setSelectedQuotes] = useState<PagesQuotes[]>([])

  useEffect(() => {
    if (quotes) {
      // shuffle the list of quotes and get the first two
      const shuffledQuotes = quotes.sort(() => 0.5 - Math.random())
      setSelectedQuotes(shuffledQuotes.slice(0, 2))
    }
  }, [quotes])

  if (!quotes) {
    return <></>
  }

  const allQuotes = selectedQuotes.map((quote, i: number) => {
    return (
      <div key={`quote-${i}`} className="px-3 tablet-lg:px-6">
        <blockquote className="font-serif text-lg -indent-2">
          {parse(quote.quote)}
          <cite className="pt-2 pl-2 block">– {parse(quote.name)}</cite>
        </blockquote>
      </div>
    )
  })

  return <div className="mt-6 pt-10 space-y-9 border-t tablet-lg:border-0 rail-border">{allQuotes}</div>
}

export default Quotes
