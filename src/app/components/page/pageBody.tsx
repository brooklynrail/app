import { Articles, Pages } from "../../../../lib/types"
import BodyCode from "../article/bodyCode"
import BodyText from "../article/bodyText"

export enum ArticleType {
  BodyText = "body_text",
  BodyCode = "body_code",
}
interface PageBodyProps {
  pageData: Pages
}

const PageBody = (props: PageBodyProps) => {
  const { pageData } = props

  return <BodyText body_text={pageData.body_text} images={pageData.images} />
}
export default PageBody
