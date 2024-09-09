import parse from "html-react-parser"
import { Articles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../../lib/utils"
import styles from "./promos.module.scss"
import FeaturedImage, { ImageSize } from "./featuredImage"
import Bylines from "./bylines"

export interface PromoProps {
  article: Articles
}

const PromoFeatured = (props: PromoProps) => {
  const { article } = props
  const { title, featured_image, issue, section, contributors } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <>
      <div className={`${styles.promo} flex flex-col space-y-4`} itemType="http://schema.org/Article">
        {featured_image && (
          <div className={styles.media}>
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <FeaturedImage image={featured_image} title={title} size={ImageSize.Auto} />
            </Link>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <h3 className="text-2xl font-thin hover:underline">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {parse(title)}
            </Link>
          </h3>
          <Bylines article={article} />
        </div>
      </div>
    </>
  )
}
export default PromoFeatured
