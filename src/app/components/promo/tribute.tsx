import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import Image from "next/image"
import { DirectusFiles, Tributes } from "../../../../lib/types"
import TributeWritersList from "../tributePage/writersList"

interface PromoTributeProps {
  tribute: Tributes
  permalink: string
}

const PromoTribute = (props: PromoTributeProps) => {
  const { tribute, permalink } = props
  const { title, excerpt, featured_image, editors } = tribute

  return (
    <div className="py-1 pb-2 flex flex-col space-y-1" itemType="http://schema.org/Article">
      <p className="text-sm font-bold float-right">In Memoriam</p>

      <div>
        <h4 className="text-2xl tablet-lg:text-lg font-normal">
          <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
            {parse(title)}
          </Link>
        </h4>

        {featured_image && (
          <div className="float-right pl-3 pt-5 pb-3">
            <Link href={permalink} title={`Visit ${stripHtml(title).result}`}>
              <Thumb image={featured_image} title={title} />
            </Link>
          </div>
        )}

        <div className="py-3 text-md font-serif">{parse(excerpt)}</div>
        <TributeWritersList articles={tribute.articles} tributeSlug={tribute.slug} />
      </div>
    </div>
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
