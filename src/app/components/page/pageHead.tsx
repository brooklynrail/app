import parse from "html-react-parser"
import { Pages } from "../../../../lib/types"

interface PageHeadProps {
  pageData: Pages
}

const PageHead = (props: PageHeadProps) => {
  const { pageData } = props
  const { title } = pageData

  return (
    <header className="">
      <h1 className="font-bold text-4xl tablet-lg:text-5xl">{parse(title)}</h1>
    </header>
  )
}
export default PageHead
