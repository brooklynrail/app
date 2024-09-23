import { DirectusFiles } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"

interface FeaturedImageProps {
  image: DirectusFiles
  title: string
  hideCaption?: boolean
}
const FeaturedImage = (props: FeaturedImageProps) => {
  const { filename_disk, caption, width, height } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = caption ? caption : `${stripHtml(props.title).result}`

  return (
    <div className="">
      <div>
        <Image
          priority
          src={src}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          width={width}
          height={height}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt={alt}
        />
        {!props.hideCaption && caption && (
          <figcaption className="pt-1 text-xs text-gray-500">{parse(caption)}</figcaption>
        )}
      </div>
    </div>
  )
}

export default FeaturedImage
