import parse from "html-react-parser"

export enum ExcerptType {
  ArtLead = "text-lg tablet-lg:text-xl desktop-lg:text-2xl font-normal",
  Art = "text-sm tablet-lg:text-md desktop-lg:text-lg font-normal",
  CriticsPage = "text-lg tablet-lg:text-xl desktop-lg:text-xl font-serif font-normal",
}

interface ExcerptProps {
  excerpt: string
  type: ExcerptType
}

const Excerpt = (props: ExcerptProps) => {
  const { excerpt, type } = props

  if (!excerpt) {
    return <></>
  }

  return <div className={type}>{parse(excerpt)}</div>
}
export default Excerpt
