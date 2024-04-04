import parse from "html-react-parser"
import { DirectusFiles } from "../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import { PromoProps, PromoSectionName } from "./standard"
import Link from "next/link"

const PromoImage = (props: DirectusFiles) => {
  const { filename_disk } = props
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}?key=promo-section`
  return <Image src={src} width={200} height={260} alt={"tktk"} />
}

const PromoSection = (props: PromoProps) => {
  const { article, showSection, showImage, permalink, order } = props
  const { title, excerpt, featured_image } = article

  const sortNum = (
    <span className="sort">
      <span>{order}</span>
    </span>
  )

  return (
    <>
      <div className="promo promo-section" itemType="http://schema.org/Article">
        <div className="grid-row grid-gap-4">
          <div className="grid-col-12 tablet:grid-col-8">
            {showSection && <PromoSectionName {...props} />}
            <h4>
              {sortNum}
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                {parse(title)}
              </Link>
            </h4>
            <p className="excerpt">{parse(excerpt)}</p>
          </div>
          <div className="grid-col-12 tablet:grid-col-4">
            {showImage && featured_image && (
              <div className={`media`}>
                <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                  <PromoImage {...featured_image} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default PromoSection
