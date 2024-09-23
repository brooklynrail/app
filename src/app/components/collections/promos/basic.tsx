import parse from "html-react-parser"
import { Articles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../../lib/utils"
import styles from "./promos.module.scss"
import FeaturedImage, { ImageSize } from "./featuredImage"
import Bylines, { BylineType } from "./bylines"

export interface PromoProps {
  article: Articles
}

const PromoBasic = (props: PromoProps) => {
  const { article } = props
  const { title, featured_image, issue, section } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <>
      <div
        className={`${styles.promo} py-4 first:pt-0 last:pb-0 flex flex-row space-x-4`}
        itemType="http://schema.org/Article"
      >
        {featured_image && (
          <div className={styles.media}>
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <FeaturedImage image={featured_image} title={title} size={ImageSize.Small} />
            </Link>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-thin hover:underline">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {parse(title)}
            </Link>
          </h3>
          <Bylines article={article} type={BylineType.Default} />
        </div>
        {/* <div className={styles.excerpt}>{parse(excerpt)}</div> */}
      </div>
    </>
  )
}
export default PromoBasic
