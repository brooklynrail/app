import Link from "next/link"
import { ArticlesContributors } from "../../../../lib/types"
import parse from "html-react-parser"
import { Fragment } from "react"
import style from "./contributorsBox.module.css"

interface ContributorsProps {
  contributors: ArticlesContributors[]
}

const ContributorsBox = (props: ContributorsProps) => {
  const { contributors } = props

  const authors = contributors.map((contributor: ArticlesContributors, i: number) => {
    if (!contributor.contributors_id) {
      return null
    }

    const authorName = `${contributor.contributors_id.first_name} ${contributor.contributors_id.last_name}`
    const authorLink = (
      <Link href={`/contributors/${contributor.contributors_id.slug}`}>
        <strong>{authorName}</strong>
      </Link>
    )
    const bio = contributor.contributors_id.bio
    const hasAuthorName = bio && bio.includes(authorName)

    return (
      <div rel="author" className={`text-lg max-w-[72ex] ${style.author}`} key={i}>
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

  // Track whether the first instance has been replaced
  let replaced = false

  // Parse the bio and replace only the first occurrence of the author's name
  const bioUpdated = parse(bio, {
    replace: (domNode) => {
      if (domNode.type === "text" && domNode.data.includes(authorName)) {
        const parts = domNode.data.split(authorName)

        return (
          <>
            {parts.reduce((acc: JSX.Element[], part, index) => {
              if (index === 0) {
                acc.push(<Fragment key={index}>{part}</Fragment>)
              } else if (!replaced) {
                acc.push(
                  <Fragment key={index}>
                    {authorLink}
                    {part}
                  </Fragment>,
                )
                replaced = true
              } else {
                acc.push(
                  <Fragment key={index}>
                    {authorName}
                    {part}
                  </Fragment>,
                )
              }
              return acc
            }, [])}
          </>
        )
      }
    },
  })

  return <>{bioUpdated}</>
}

export default ContributorsBox
