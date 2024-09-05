import parse from "html-react-parser"
import { ArticlesContributors, DirectusFiles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import { PromoProps, PromoSectionName } from "./standard"
import Link from "next/link"

interface PromoImageProps {
  image: DirectusFiles
  title: string
}
export const PromoImage = (props: PromoImageProps) => {
  const { image, title } = props
  const { filename_disk } = image
  if (!filename_disk || !image.width || !image.height) {
    return <></>
  }
  const caption = image.caption ? `${stripHtml(image.caption).result}` : `${stripHtml(title).result}`
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  return (
    <Image
      src={src}
      width={image.width}
      height={image.height}
      sizes="33vw"
      style={{
        width: "100%",
        height: "auto",
      }}
      alt={caption}
    />
  )
}

const PromoSection = (props: PromoProps) => {
  const { article, showSection, showImage, permalink, order } = props
  const { title, excerpt, featured_image, hide_bylines_downstream, contributors } = article

  const orderNum = (
    <span className="sort">
      <span>{order}</span>
    </span>
  )

  const authors = contributors.map((contributor: ArticlesContributors, i: number) => {
    if (!contributor.contributors_id) {
      return <></>
    }

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
        {contributor.contributors_id.first_name} {contributor.contributors_id.last_name}
        {separator}
      </span>
    )
    return author
  })

  return (
    <div className="promo promo-section" itemType="http://schema.org/Article">
      <div className="grid-row grid-gap-4">
        <div className="grid-col-8 tablet:grid-col-8">
          {showSection && <PromoSectionName {...props} />}
          <h4>
            {orderNum}
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {parse(title)}
            </Link>
          </h4>
          {!hide_bylines_downstream && <cite className="byline">By {authors} </cite>}
          <div className="excerpt">{parse(excerpt)}</div>
        </div>
        <div className="grid-col-4 tablet:grid-col-4">
          {showImage && featured_image && (
            <div className={`media`}>
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <PromoImage image={featured_image} title={title} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default PromoSection
