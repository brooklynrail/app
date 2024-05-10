import Link from "next/link"
import { ArticlesContributors, Contributors } from "../../../../lib/types"

interface ContributorsProps {
  contributors: Contributors[] | ArticlesContributors[]
}

const ContributorsBox = (props: ContributorsProps) => {
  const { contributors } = props

  const title = contributors.length > 1 ? "Contributors" : "Contributor"
  const authors = contributors.map((contributor: any, i: number) => {
    return (
      <div key={i}>
        <h4>
          <Link href={`/contributor/${contributor.contributors_id.slug}`}>
            {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
          </Link>
        </h4>
        <p dangerouslySetInnerHTML={{ __html: contributor.contributors_id.bio }} />
      </div>
    )
  })
  return (
    <cite>
      <footer>
        <section className="contributors">
          <h3>{title}</h3>
          {authors}
        </section>
      </footer>
    </cite>
  )
}

export default ContributorsBox
