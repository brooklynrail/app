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

    // If there is no Bio, show the author name with the link
    // If there is a Bio, and the name is included in the Bio, show only the Bio with the name linked.
    // If there is a Bio, and the name is not included in the Bio, show the name with the link plus the Bio.

    return (
      <div rel="author" className="text-lg" key={i}>
        {(!hasAuthorName || !bio) && <h4 className="text-lg">{authorLink}</h4>}
        {bio &&
          addAuthorLinkToBio({
            authorName: authorName,
            authorLink: authorLink,
            bio: bio,
          })}
      </div>
    )
  })
  return <section className="border-t-[1px] rail-border py-6 font-sans">{authors}</section>
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
  // Split the bio text by the authorName
  const parts = bio.split(regex)
  // Map over the parts and replace occurrences of authorName with the authorLink JSX
  const bioUpdated = parts.map((part, index) => {
    // If the part matches authorName, return the authorLink JSX component
    if (part === authorName) {
      return <Fragment key={index}>{authorLink}</Fragment>
    }
    // Otherwise, return the part as plain text
    // NOTE: this is HTML coming from the database, so we need to parse it
    return <Fragment key={index}>{parse(part)}</Fragment>
  })

  // Return the array of JSX elements, which will render as expected
  return <>{bioUpdated}</>
}

export default Contributors
