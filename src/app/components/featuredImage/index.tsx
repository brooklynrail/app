import { DirectusFiles } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import styles from "./featuredImage.module.scss"

interface FeaturedImageProps {
  image: DirectusFiles
  title: string
  hideCaption?: boolean
  permalink?: string
  sizes?: string
  containerWidth?: number
}

const FeaturedImage = (props: FeaturedImageProps) => {
  const { containerWidth } = props
  const { filename_disk, caption, width, height } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = caption ? caption : `${stripHtml(props.title).result}`
  const isPortrait = containerWidth && height > width
  const sizes = props.sizes ? props.sizes : `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`

  const image = (
    <>
      <Image
        priority
        src={src}
        sizes={sizes}
        width={width}
        height={height}
        style={{
          width: isPortrait ? "auto" : "100%", // Adjust width for portrait images
          height: isPortrait ? `${props.containerWidth}px` : "auto", // Adjust height for portrait images
        }}
        alt={alt}
      />
      {!props.hideCaption && caption && (
        <figcaption className="pt-1 text-xs text-gray-500">{parse(caption)}</figcaption>
      )}
    </>
  )

  if (props.permalink) {
    return (
      <div>
        <Link className={styles.media} title={`Visit ${stripHtml(props.title).result}`} href={props.permalink}>
          {image}
        </Link>
      </div>
    )
  }
  return <div className={styles.media}>{image}</div>
}

export default FeaturedImage
