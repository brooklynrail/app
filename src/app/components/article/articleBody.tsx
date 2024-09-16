import { Articles } from "../../../../lib/types"
import BodyText from "./bodyText"

export enum ArticleType {
  BodyText = "body_text",
  BodyCode = "body_code",
}
interface ArticleBodyProps {
  type?: ArticleType
  articleData: Articles
  preview?: boolean
}

const ArticleBody = (props: ArticleBodyProps) => {
  const { articleData, preview } = props

  return <BodyText {...articleData} preview={preview} />
}
export default ArticleBody
