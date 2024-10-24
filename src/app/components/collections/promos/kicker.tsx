import { Articles } from "../../../../../lib/types"

interface KickerProps {
  article: Articles
}

const Kicker = (props: KickerProps) => {
  const { article } = props
  const { kicker, issue } = article

  if (!kicker && !issue) {
    return <></>
  }

  return (
    <p className="text-nowrap flex flex-row space-x-3 text-xs uppercase font-medium">
      {kicker && <span className="">{article.kicker}</span>}
      {kicker && <span aria-hidden={true}>{` | `}</span>}
      <span className="">{issue.title}</span>
    </p>
  )
}
export default Kicker
