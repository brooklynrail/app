import { Articles } from "../../../../../lib/types"

interface KickerProps {
  article: Articles
}

const Kicker = (props: KickerProps) => {
  const { article } = props
  const { kicker, issue } = article

  if (!kicker) {
    return <></>
  }

  return (
    <p className="text-nowrap flex flex-row space-x-4 text-xs uppercase font-medium">
      <span className="">{article.kicker}</span>
      <span className=""> | </span>
      <span className="">{issue.title}</span>
    </p>
  )
}
export default Kicker
