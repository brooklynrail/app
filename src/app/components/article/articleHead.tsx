import Link from "next/link"
import { Articles, ArticlesContributors, DirectusFiles, Issues, Sections } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import parse from "html-react-parser"
import { getPermalink, PageType } from "../../../../lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import Kicker from "./kicker"
import FeaturedImage from "../featuredImage"
import Title, { TitleType } from "../collections/promos/title"
import Bylines, { BylineType } from "../collections/promos/bylines"

interface ArticleHeadProps {
  permalink: string
  thisIssueData?: Issues
  currentSection: Sections
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
    <div className="flex flex-col items-center space-y-3">
      <Bylines article={articleData} type={BylineType.ArticleHeadDiptych} linked={true} />
      {thisIssueData && <div className="uppercase text-sm">{thisIssueData.title}</div>}

      <div className="flex border-2 rail-border p-1 divide-x-2 rail-divide">
        <Link
          className="px-4 pr-5"
          href={`https://twitter.com/share?url=${permalink}&text=${encodeURIComponent(`${stripHtml(title).result} — @thebrooklynrail`)}`}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link className="px-4 pl-5" href={`https://www.facebook.com/sharer.php?u=${permalink}`}>
          <FontAwesomeIcon icon={faSquareFacebook} />
        </Link>
      </div>
    </div>
  )
  switch (header_type) {
    case "diptych":
      return (
        <header className="article-header diptych">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-9 gap-3">
            <div className="col-span-4 tablet-lg:col-span-5">
              <div className="space-y-16">
                <div className="space-y-6">
                  <Kicker {...kickerProps} />
                  <div className="space-y-3">
                    <Title title={title} type={TitleType.ArticleHeadDiptych} />
                    {deck && <h2 className="text-center text-4xl font-light">{parse(deck)}</h2>}
                  </div>
                </div>
                {articleMeta}
              </div>
            </div>

            <div className="col-span-4 tablet-lg:col-span-4">
              {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
            </div>
          </div>
        </header>
      )
    default:
      return (
        <header className="">
          <Kicker {...kickerProps} />
          <div>
            <h1>{parse(title)}</h1>
            {deck && <h2 className="deck">{parse(deck)}</h2>}
          </div>
          {articleMeta}
        </header>
      )
  }
}
export default ArticleHead
