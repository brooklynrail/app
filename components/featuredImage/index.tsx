import { DirectusFiles } from "@/lib/types"
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
  priority?: boolean
  containerWidth?: number
  isFramed?: boolean
}

const FeaturedImage = (props: FeaturedImageProps) => {
  const { containerWidth, priority, isFramed } = props
  const { filename_disk, caption, width, height } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  const alt = props.image.alt
    ? props.image.alt
    : caption
      ? `${stripHtml(caption).result}`
      : `${stripHtml(props.title).result}`
  const isPortrait = containerWidth && height > width
  const sizes = props.sizes ? props.sizes : `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`

  const image = (
    <>
      <Image
        priority={priority ? priority : false}
        data-image={src}
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
      <Link
        className={`${styles.media} ${isFramed ? `aspect-square flex flex-col justify-center items-center` : ``}`}
        title={`Visit ${stripHtml(props.title).result}`}
        href={props.permalink}
      >
        {image}
      </Link>
    )
  }
  return <div className={styles.media}>{image}</div>
}

export default FeaturedImage
