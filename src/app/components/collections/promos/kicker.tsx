import Link from "next/link"
import { Issues, Sections } from "../../../../../lib/types"

interface KickerProps {
  kicker?: string | null
  issue?: Issues
  section?: Sections
  onArticle?: boolean // Optional prop to control the size
  isCentered?: boolean // Optional prop to control the size
  order?: Array<"issue" | "section" | "kicker"> // Optional prop to control the order
  articleID: string
}

const Kicker = (props: KickerProps) => {
  const { kicker, issue, section, articleID, order = ["issue", "section", "kicker"] } = props

  const kickerText = (kicker: string) => <span className="">{kicker}</span>
  const issueText = (issue: Issues) => {
    const issuePermalink = `/issue/${issue.slug}`
    return (
      <Link href={issuePermalink} className="">
        <span>{issue.title}</span>
      </Link>
    )
  }
  const sectionText = (section: Sections) => {
    if (section && section.featured) {
      const sectionPermalink = `/section/${section.slug}`
      return (
        <Link href={sectionPermalink} className="font-medium">
          <span>{section.name}</span>
        </Link>
      )
    }
    return <span className="font-medium">{section.name}</span>
  }

  // Create an array of elements in the specified order, filtering out any undefined ones
  const elements = order
    .map((key) => {
      if (key === "issue" && issue) return issueText(issue)
      if (key === "section" && section) return sectionText(section)
      if (key === "kicker" && kicker) return kickerText(kicker)
      return null
    })
    .filter(Boolean) // Remove any null or undefined elements

  // If no elements, return null
  if (elements.length === 0) {
    return null
  }

  const centered = props.isCentered ? "text-center" : ""
  const articleStyles = props.onArticle ? `text-sm font-normal ${centered}` : `text-xs font-medium ${centered}`

  return (
    <p className={`${articleStyles} uppercase divide-x divide-solid divide-zinc-600`}>
      {elements.map((element, i) => (
        <span key={articleID} className="px-2 first:pl-0 last:pr-0">
          {element}
        </span>
      ))}
    </p>
  )
}

export default Kicker
