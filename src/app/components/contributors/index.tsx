import Link from "next/link"
import { ArticlesContributors } from "../../../../lib/types"
import parse from "html-react-parser"
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints"
import { Fragment } from "react"

interface ContributorsProps {
  contributors: ArticlesContributors[]
}

const Contributors = (props: ContributorsProps) => {
  const { contributors } = props

  const authors = contributors.map((contributor: ArticlesContributors, i: number) => {
    if (!contributor.contributors_id) {
      return <></>
    }

    // check if authorName exists as a string within the bio
    if (!contributor.contributors_id.bio) {
      return <></>
    }
    const authorName = `${contributor.contributors_id.first_name} ${contributor.contributors_id.last_name}`
    const authorLink = (
      <Link href={`/contributors/${contributor.contributors_id.slug}`}>
        <strong>{authorName}</strong>
      </Link>
    )
    const hasAuthorName = contributor.contributors_id.bio.includes(authorName)
    const bio = contributor.contributors_id.bio

    const modifiedBio = addAuthorLinkToBio({
      authorName: authorName,
      authorLink: authorLink,
      bio: bio,
    })

    // If there is no Bio, show the author name with the link
    // If there is a Bio, and the name is included in the Bio, show only the Bio with the name linked.
    // If there is a Bio, and the name is not included in the Bio, show the name with the link plus the Bio.

    return (
      <div rel="author" className="text-lg max-w-[72ex]" key={i}>
        {(!hasAuthorName || !bio) && <h4 className="text-lg">{authorLink}</h4>}
        {bio && modifiedBio}
      </div>
    )
  })
  return (
    <section className="border-t-[1px] rail-border pt-3 pb-6 font-sans space-y-6">
      <h2 className="text-sm font-medium uppercase">Contributors</h2>
      {authors}
    </section>
  )
}

interface AuthorLinkProps {
  authorName: string
  authorLink: any
  bio: string
}

const addAuthorLinkToBio = (props: AuthorLinkProps) => {
  const { authorName, authorLink, bio } = props

  // Define a regex to find all occurrences of the authorName
  const regex = new RegExp(`(${authorName})`, "g")
  // Parse the bio HTML and manipulate the resulting React elements
  // Parse the bio HTML and manipulate the resulting React elements
  const bioUpdated = parse(bio, {
    replace: (domNode) => {
      if (domNode.type === "tag" && domNode.name === "strong") {
        const child = domNode.children && domNode.children[0]
        if (child && child.type === "text" && child.data === authorName) {
          return <strong>{authorLink}</strong>
        }
      }
      if (domNode.type === "text" && domNode.data.includes(authorName)) {
        const parts = domNode.data.split(regex)
        return (
          <>
            {parts.map((part, index) =>
              part === authorName ? (
                <Fragment key={index}>{authorLink}</Fragment>
              ) : (
                <Fragment key={index}>{part}</Fragment>
              ),
            )}
          </>
        )
      }
    },
  })

  // Return the array of JSX elements, which will render as expected
  return <>{bioUpdated}</>
}

export default Contributors
