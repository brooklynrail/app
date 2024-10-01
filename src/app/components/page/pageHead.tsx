import parse from "html-react-parser"
import { Pages } from "../../../../lib/types"

interface PageHeadProps {
  pageData: Pages
}

const PageHead = (props: PageHeadProps) => {
  const { pageData } = props
  const { title } = pageData

  return (
    <header className="py-12">
      <h1 className="font-light text-5xl">{parse(title)}</h1>
    </header>
  )
}
export default PageHead
