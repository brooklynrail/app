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
    <div className="flex flex-row space-x-4 text-xs uppercase font-medium">
      <p className="">{article.kicker}</p>
      <p className=""> | </p>
      <p className="">{issue.title}</p>
    </div>
  )
}
export default Kicker
