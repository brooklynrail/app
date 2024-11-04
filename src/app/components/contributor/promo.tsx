import parse from "html-react-parser"
import { Articles, ArticlesContributors, DirectusFiles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import Bylines, { BylineType } from "../collections/promos/bylines"
import Title, { TitleType } from "../collections/promos/title"
import FeaturedImage from "../featuredImage"
import Kicker from "../collections/promos/kicker"

interface PromoProps {
  article: Articles
  showImage: boolean
  showSection: boolean
  permalink: string
  sectionPermalink: string
  order?: number | null
}

const Promo = (props: PromoProps) => {
  const { article, showImage, permalink } = props
  const { title, excerpt, featured_image } = article

  return (
    <div className="py-3 pb-6 flex flex-col space-y-1" itemType="http://schema.org/Article">
      <div className="flex space-x-3 justify-between">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="space-y-1">
              <Kicker issue={article.issue} section={article.section} articleID={article.id} />
              <Title title={title} permalink={permalink} type={TitleType.SectionPromo} />
            </div>
            <Bylines article={article} type={BylineType.SectionPromo} linked={true} />
          </div>
          <div className="text-md font-serif">{parse(excerpt)}</div>
        </div>
        <div className="w-32 tablet-lg:w-card-lg flex-none">
          {showImage && featured_image && (
            <div className={`media`}>
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <FeaturedImage image={featured_image} title={title} hideCaption={true} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Promo
