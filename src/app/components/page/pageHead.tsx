import parse from "html-react-parser"
import { Pages } from "../../../../lib/types"

interface PageHeadProps {
  pageData: Pages
}

const PageHead = (props: PageHeadProps) => {
  const { pageData } = props
  const { title } = pageData

  return (
    <header>
      <h1>{parse(title)}</h1>
    </header>
  )
}
export default PageHead
