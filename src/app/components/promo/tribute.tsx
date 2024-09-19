import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { PromoSectionName } from "./standard"
import Link from "next/link"
import { Thumb } from "./thumb"
import { Tributes } from "../../../../lib/types"

interface PromoTributeProps {
  tribute: Tributes
  permalink: string
}

const PromoTribute = (props: PromoTributeProps) => {
  const { tribute, permalink } = props
  const { title, excerpt, featured_image, curators } = tribute
  const names = curators.map((contributor: any, i: number) => {
    const { first_name, last_name } = contributor.contributors_id
    const name = `${first_name} ${last_name}`
    return <span key={`first_name-last_name-${i}`}>{name}</span>
  })

  return (
    <>
      <div className="promo promo-thumb" itemType="http://schema.org/Article">
        <p className="article_type">
          <a className="section" title="Go to the Tribute" href={permalink}>
            In Memoriam
          </a>
        </p>

        {featured_image && (
          <div className={`media media-thumb`}>
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`} key={featured_image.id}>
              <Thumb image={featured_image} title={title} />
            </Link>
          </div>
        )}

        <h4>
          <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
            {parse(title)}
          </Link>
        </h4>
        <cite className="byline">By {names} </cite>
        <div className="excerpt">{parse(excerpt)}</div>
      </div>
    </>
  )
}
export default PromoTribute
