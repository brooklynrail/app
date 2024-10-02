import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { PromoProps, PromoSectionName } from "./standard"
import { DirectusFiles } from "../../../../lib/types"
import Image from "next/image"
import Link from "next/link"

interface ThumbProps {
  image: DirectusFiles
  title: string
}
const Thumb = (props: ThumbProps) => {
  const { image, title } = props
  const { filename_disk } = image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = image.caption ? `${stripHtml(image.caption).result}` : `${stripHtml(title).result}`
  return <Image src={src} width={60} height={60} alt={alt} sizes="15vw" />
}

const PromoThumb = (props: PromoProps) => {
  const { article, showImage, showSection, permalink, order } = props
  const { title, excerpt, promo_thumb } = article
  const names = article.contributors.map((contributor: any, i: number) => {
    const { first_name, last_name } = contributor.contributors_id
    const name = `${first_name} ${last_name}`
    return <span key={`first_name-last_name-${i}`}>{name}</span>
  })

  return (
    <>
      <div className="py-1 pb-2 flex flex-col space-y-1" itemType="http://schema.org/Article">
        {showSection && <PromoSectionName {...props} />}
        <div className="">
          {showImage && promo_thumb && (
            <div className={`float-right`}>
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <Thumb image={promo_thumb} title={title} />
              </Link>
            </div>
          )}

          <h4 className="text-2xl tablet-lg:text-lg font-light">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {parse(title)}
            </Link>
          </h4>

          <cite className="not-italic text-sm py-2 block font-sans text-zinc-600 dark:text-slate-100">By {names} </cite>
          <div className="text-md font-serif">{parse(excerpt)}</div>
        </div>
      </div>
    </>
  )
}
export default PromoThumb
