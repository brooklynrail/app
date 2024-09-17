import { DirectusFiles } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import styles from "../header/header.module.scss"

interface FeaturedImageProps {
  image: DirectusFiles
  title: string
}
const FeaturedImage = (props: FeaturedImageProps) => {
  const { filename_disk, caption, width, height } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const desc = caption ? <figcaption>{parse(caption)}</figcaption> : null
  const alt = caption ? caption : `${stripHtml(props.title).result}`

  return (
    <div className="featured-image">
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
        {desc}
      </div>
    </div>
  )
}

export default FeaturedImage
