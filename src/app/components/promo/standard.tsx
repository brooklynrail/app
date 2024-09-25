import parse from "html-react-parser"
import { Articles, DirectusFiles } from "../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import Link from "next/link"

export interface PromoProps {
  article: Articles
  showImage: boolean
  showSection: boolean
  permalink: string
  sectionPermalink: string
  order?: number | null
}

export const PromoSectionName = (props: PromoProps) => {
  const { article, sectionPermalink } = props
  const { section, kicker } = article
  const sectionName = section.name
  return (
    <p className="text-sm">
      <Link className="font-bold" href={sectionPermalink} title={`Go to the ${stripHtml(sectionName).result} section`}>
        {sectionName}
      </Link>
      {kicker && (
        <>
          <span className="mx-2 text-xs border-l-[1px] rail-border border-solid"></span>
          <span className="text-red-600 uppercase">{article.kicker}</span>
        </>
      )}
    </p>
  )
}

interface PromoBannerProps {
  image: DirectusFiles
  title: string
}
const PromoBanner = (props: PromoBannerProps) => {
  const { image, title } = props
  const { filename_disk } = image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = image.caption ? `${stripHtml(image.caption).result}` : `${stripHtml(title).result}`
  return <Image src={src} width={516} height={296} alt={alt} sizes="33vw" />
}

const PromoStandard = (props: PromoProps) => {
  const { article, showSection, showImage, permalink } = props
  const { title, excerpt, promo_banner } = article

  return (
    <>
      <div className="py-2 pb-3 flex flex-col space-y-1" itemType="http://schema.org/Article">
        {showSection && <PromoSectionName {...props} />}
        <div className="flex flex-col tablet:flex-row-reverse tablet-lg:flex-col tablet-lg:space-x-0 space-y-2">
          {showImage && promo_banner && (
            <div className={`flex-none w-full tablet:w-96 tablet-lg:w-full`}>
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <PromoBanner image={promo_banner} title={title} />
              </Link>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <h4 className="text-lg font-normal">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                {parse(title)}
              </Link>
            </h4>
            <div className="text-sm font-serif">{parse(excerpt)}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PromoStandard
