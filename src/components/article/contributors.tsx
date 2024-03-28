import Link from "next/link"
import { ArticlesContributors, Contributors } from "../../../lib/types"

interface ContributorsProps {
  contributors: Contributors[] | ArticlesContributors[]
}

const ContributorsBox = (props: ContributorsProps) => {
  const { contributors } = props
  return (
    <cite>
      {contributors.map((contributor: any, i: number) => {
        return (
          <footer key={i}>
            <section className="contributors">
              <h3>Contributor</h3>
              <h4>
                <Link href={`/contributor/${contributor.contributors_id.slug}`}>
                  {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
                </Link>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: contributor.contributors_id.bio }} />
            </section>
          </footer>
        )
      })}
    </cite>
  )
}

export default ContributorsBox
