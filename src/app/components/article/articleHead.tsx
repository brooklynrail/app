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

const ArticleHead = (props: ArticleHeadProps) => {
  const { permalink, thisIssueData, currentSection, articleData } = props

  const { kicker, title, deck, featured_image, header_type } = articleData

  const kickerProps = { kicker, thisIssueData, currentSection }

  const articleMeta = (
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
  )

  const new_header_type = articleData.tribute ? "tribute" : header_type

  switch (new_header_type) {
    case "diptych":
      return (
        <header className="py-6">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-8 desktop-lg:grid-cols-9 gap-3">
            <div className="col-span-4 tablet-lg:col-span-5 desktop-lg:col-span-5">
              <div className="space-y-16">
                <div className="space-y-6">
                  <Kicker centered={true} {...kickerProps} />
                  <div className="space-y-3">
                    <Title title={title} type={TitleType.ArticleHeadDiptych} />
                    {deck && <h2 className="text-center text-4xl font-light">{parse(deck)}</h2>}
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <Bylines article={articleData} type={BylineType.ArticleHeadDiptych} linked={true} />
                  {articleMeta}
                </div>
              </div>
            </div>

            <div className="col-span-4 tablet-lg:col-span-3 desktop-lg:col-span-4">
              {featured_image ? <FeaturedImage image={featured_image} title={title} /> : null}
            </div>
          </div>
        </header>
      )
    case "tribute":
      return (
        <div className="py-3 pb-12 space-y-1">
          {!articleData.hide_title && <Title title={articleData.title} type={TitleType.TributeArticle} />}
          <Bylines article={articleData} type={BylineType.TributeArticle} asTitle={true} linked={true} hideBy={true} />
        </div>
      )
    default:
      return (
        <header className="py-6">
          <div className="grid grid-cols-4 tablet-lg:grid-cols-8 desktop-lg:grid-cols-9 gap-3">
            <div className="col-span-4 tablet-lg:col-span-8 desktop-lg:col-span-9">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Kicker centered={false} {...kickerProps} />
                  <Title title={title} type={TitleType.ArticleHead} />
                  {deck && <h2 className="text-4xl font-light">{parse(deck)}</h2>}
                </div>
                <div className="flex flex-col items-start space-y-3">
                  <Bylines article={articleData} type={BylineType.ArticleHead} linked={true} />
                  {articleMeta}
                </div>
              </div>
            </div>
          </div>
        </header>
      )
  }
}
export default ArticleHead
