import parse from "html-react-parser"
import { Articles, DirectusFiles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../../lib/utils"
import { PromoImage } from "../../promo/section"
import styles from "./promos.module.scss"

export interface PromoProps {
  article: Articles
}

const PromoSectionName = (props: PromoProps) => {
  const { article } = props
  const { section, kicker, issue, slug } = article

  const sectionPermalink = getPermalink({
    issueSlug: issue.slug,
    section: section.slug,
    type: PageType.Section,
  })

  const sectionName = section.name
  return (
    <p className="article_type">
      <Link className="section" href={sectionPermalink} title={`Go to the ${stripHtml(sectionName).result} section`}>
        {sectionName}
      </Link>
      {kicker && (
        <>
          <span className="divider"></span>
          <span className="type">{article.kicker}</span>
        </>
      )}
    </p>
  )
}

const PromoBasic = (props: PromoProps) => {
  const { article } = props
  const { title, excerpt, featured_image, issue, section } = article

  const permalink = getPermalink({
    year: issue.year,
    month: issue.month,
    section: section.slug,
    slug: article.slug,
    type: PageType.Article,
  })

  return (
    <>
      <div className={`${styles.promo} ${styles.promoBasic}`} itemType="http://schema.org/Article">
        {featured_image && (
          <div className={styles.media}>
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <PromoImage image={featured_image} title={title} />
            </Link>
          </div>
        )}
        <h3>
          <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
            {parse(title)}
          </Link>
        </h3>
        <div className={styles.excerpt}>{parse(excerpt)}</div>
      </div>
    </>
  )
}
export default PromoBasic
