import Link from "next/link"
import { ArticlesContributors } from "../../../../lib/types"
import parse from "html-react-parser"

interface ContributorsProps {
  contributors: ArticlesContributors[]
}

const ContributorsBox = (props: ContributorsProps) => {
  const { contributors } = props

  const heading = contributors.length > 1 ? "Contributors" : "Contributor"
  const authors = contributors.map((contributor: ArticlesContributors, i: number) => {
    return (
      <div className="contributor" key={i}>
        <h4>
          <Link href={`/contributor/${contributor.contributors_id.slug}`}>
            {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
          </Link>
        </h4>
        {contributor.contributors_id.bio && <div className="bio">{parse(contributor.contributors_id.bio)}</div>}
      </div>
    )
  })
  return (
    <cite>
      <footer>
        <section className="contributors">
          <h3>{heading}</h3>
          {authors}
        </section>
      </footer>
    </cite>
  )
}

export default ContributorsBox
