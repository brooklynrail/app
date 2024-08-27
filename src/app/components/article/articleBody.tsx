import { Articles } from "../../../../lib/types"
import BodyText from "./bodyText"
import BodyCode from "./bodyCode"

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
  const { type, articleData, preview } = props
  const { body_type } = articleData

  switch (type ? type : body_type) {
    case `body_text`:
      return <BodyText {...articleData} preview={preview} />
    case `body_code`:
      return <BodyCode {...articleData} />
    default:
      return <></>
  }
}
export default ArticleBody
