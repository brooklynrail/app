import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import Image from "next/image"
import { DirectusFiles, Tributes } from "../../../../lib/types"

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
      <div className="py-1 pb-2 flex flex-col space-y-1" itemType="http://schema.org/Article">
        <p className="text-sm font-bold float-right">In Memoriam</p>

        <div>
          {featured_image && (
            <div className="float-right pl-2">
              <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
                <Thumb image={featured_image} title={title} />
              </Link>
            </div>
          )}

          <h4 className="text-lg font-normal">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              {parse(title)}
            </Link>
          </h4>
          <div className="pt-3 text-sm font-serif">{parse(excerpt)}</div>
        </div>
      </div>
    </>
  )
}

interface ThumbProps {
  image: DirectusFiles
  title: string
}
const Thumb = (props: ThumbProps) => {
  const { image, title } = props
  const { filename_disk, width, height, id } = image

  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = image.caption ? `${stripHtml(image.caption).result}` : `${stripHtml(title).result}`
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        width: "100px",
        height: "auto",
      }}
      sizes="15vw"
    />
  )
}

export default PromoTribute
