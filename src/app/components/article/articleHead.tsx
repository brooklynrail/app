import Link from "next/link"
import Image from "next/image"
import { Articles, ArticlesContributors, DirectusFiles, Issues, Sections } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import Kicker from "./kicker"
import { faEye } from "@fortawesome/free-solid-svg-icons"

interface FeaturedImageProps {
  image: DirectusFiles
  title: string
}
const FeaturedImage = (props: FeaturedImageProps) => {
  const { filename_disk, caption, width, height } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const desc = caption ? <figcaption>{parse(caption)}</figcaption> : null
  const alt = caption ? caption : `${stripHtml(props.title).result}`

  return (
    <div className="featured-image">
      <div>
        <Image
          priority
          src={src}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt={alt}
        />
        {desc}
      </div>
    </div>
  )
}

interface ArticleHeadProps {
  permalink: string
  thisIssueData?: Issues
  currentSection?: Sections
  articleData: Articles
}
interface AuthorsProps {
  contributors: ArticlesContributors[]
}
const Authors = (props: AuthorsProps) => {
  const { contributors } = props
  if (!contributors || contributors.length === 0) {
    return <></>
  }

  const authors = contributors.map((contributor: ArticlesContributors, i: number) => {
    if (!contributor.contributors_id) {
      return <></>
    }

    const contribPermalink = getPermalink({ type: PageType.Contributor, slug: contributor.contributors_id.slug })

    let separator
    // if there are two authors, use " and " as the separator
    if (contributors.length === 2 && i === 0) {
      separator = " and "
      // if there are more than two authors, and this is the last iteration, use ", and "
    } else if (contributors.length > 2 && i == contributors.length - 2) {
      separator = ", and "
      // if there are more than two authors, use ", " as the separator
    } else if (i < contributors.length - 1) {
      separator = ", "
    }

    // if there is only one author, don't use a separator
    const author = (
      <span key={i}>
        <Link itemProp="author" href={contribPermalink}>
          {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
        </Link>
        {separator}
      </span>
    )
    return author
  })

  return authors
}

const ArticleHead = (props: ArticleHeadProps) => {
  const { permalink, thisIssueData, currentSection, articleData } = props
  const { kicker, title, deck, featured_image, header_type, contributors, hide_bylines, byline_override } = articleData

  const kickerProps = { kicker, thisIssueData, currentSection }

  const articleMeta = (
    <div className="article-meta">
      <div className="date">MAY 2024</div>

      {!hide_bylines && contributors && contributors.length != 0 && (
        <cite className="byline">
          {byline_override ? (
            <span>{byline_override}</span>
          ) : (
            <>
              <span>By </span>
              <Authors contributors={contributors} />
            </>
          )}
        </cite>
      )}

      {thisIssueData && <div className="date">{thisIssueData.title}</div>}

      <div className="share-tools">
        <Link
          className="twitter"
          href={`https://twitter.com/share?url=${permalink}&text=${encodeURIComponent(`${stripHtml(title).result} — @thebrooklynrail`)}`}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link className="facebook" href={`https://www.facebook.com/sharer.php?u=${permalink}`}>
          <FontAwesomeIcon icon={faSquareFacebook} />
        </Link>
      </div>
    </div>
  )
  switch (header_type) {
    case "diptych":
      return (
        <header className="article-header diptych">
          <div className="grid-row grid-gap-4">
            <div className="grid-col-12 tablet:grid-col-7">
              <Kicker {...kickerProps} />
              <h1>{parse(title)}</h1>
              {deck && <h2 className="deck">{parse(deck)}</h2>}
              {articleMeta}
            </div>

            <div className="grid-col-12 tablet:grid-col-5">
              {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
            </div>
          </div>
        </header>
      )
    default:
      return (
        <header className="article-header">
          <Kicker {...kickerProps} />
          <h1>{parse(title)}</h1>
          {deck && <h2 className="deck">{parse(deck)}</h2>}
          {articleMeta}
        </header>
      )
  }
}
export default ArticleHead
