import { DirectusFiles } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"

interface PortraitImageProps {
  image: DirectusFiles
  title: string
}
const PortraitImage = (props: PortraitImageProps) => {
  const { filename_disk, caption, width, height, alt, modified_on } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}?fit=cover&width=400&height=400&quality=85&modified_on=${modified_on}`
  const alt_text = alt
    ? alt
    : `A photo of ${stripHtml(props.title).result} on The Brooklyn Rail's New Social Environment`

  return (
    <div
      data-title={stripHtml(props.title).result}
      className="float-right w-28 tablet:w-32 desktop:w-40 m-3 mr-0 tablet-lg:m-0 tablet-lg:float-none tablet-lg:flex-none space-y-1"
    >
      <Image
        data-image={src}
        className="object-cover rounded-full"
        src={src}
        sizes="25vw"
        width={width}
        height={height}
        alt={alt_text}
      />
      {caption && <figcaption className="text-center text-xs">{parse(caption)}</figcaption>}
    </div>
  )
}

export default PortraitImage
