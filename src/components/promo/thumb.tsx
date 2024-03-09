import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { PromoProps, PromoSectionName } from "./standard"
import { DirectusFiles } from "../../../lib/types"
import Image from "next/image"

const Thumb = (props: DirectusFiles) => {
  const { filename_disk } = props
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}?key=promo-thumb`
  return <Image src={src} width={60} height={60} alt={"tktk"} />
}

const PromoThumb = (props: PromoProps) => {
  const { article, showImage, showSection, permalink } = props
  const { title, excerpt, sort, promo_thumb } = article
  const names = article.contributors.map((contributor: any, i: number) => {
    const { first_name, last_name } = contributor.contributors_id
    const name = `${first_name} ${last_name}`
    return <span key={`first_name-last_name-${i}`}>{name}</span>
  })

  const sortNum = (
    <span className="sort">
      <span>{sort}</span>
    </span>
  )

  return (
    <>
      <div className="promo promo-thumb" itemType="http://schema.org/Article">
        {showSection && <PromoSectionName {...props} />}
        {showImage && promo_thumb && (
          <div className={`media media-thumb`}>
            <a href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <Thumb {...promo_thumb} />
            </a>
          </div>
        )}
        <h4>
          {sortNum}
          <a href={permalink} title={`Visit ${stripHtml(title).result}`}>
            {parse(title)}
          </a>
        </h4>
        <cite className="byline">By {names} </cite>
        <p className="excerpt">{parse(excerpt)}</p>
      </div>
    </>
  )
}
export default PromoThumb
