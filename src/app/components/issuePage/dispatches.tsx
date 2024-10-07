import parse from "html-react-parser"
import { PageType, getPermalink } from "../../../../lib/utils"
import { Articles } from "../../../../lib/types"
import Link from "next/link"

interface DispatchesProps {
  articles: Articles[]
}

const Dispatches = (props: DispatchesProps) => {
  const { articles } = props

  const list = (
    <ul className="list-disc pl-4">
      {articles.map((article: Articles, i: number) => {
        const permalink = getPermalink({
          year: article.issue.year,
          month: article.issue.month,
          section: article.section.slug,
          slug: article.slug,
          type: PageType.Article,
        })

        return (
          <li key={i} className="space-y-1 text-xs" itemType="http://schema.org/Article">
            <Link title={`Visit ${article.title}`} href={permalink}>
              {parse(article.title)}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  const sectionPermalink = getPermalink({
    issueSlug: "2024-07",
    section: "dispatches",
    type: PageType.Section,
  })

  return (
    <div className="py-2 pb-3 flex flex-col space-y-1" itemType="http://schema.org/Article">
      <p className="text-sm">
        <Link className="" title="Go to the Dispatches section" href={sectionPermalink}>
          <span className="font-bold">Dispatches</span> <span className="italic">from David Levi Strauss</span>
        </Link>
      </p>
      <p className="text-sm font-sans pb-1">
        Notes on the significant moments that are shaping our democratic process.
      </p>
      {list}
    </div>
  )
}

export default Dispatches
