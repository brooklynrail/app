import parse from "html-react-parser"
import Image from "next/image"
import { Articles, DirectusFiles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Link from "next/link"
import { getPermalink, PageType } from "../../../../../lib/utils"
import { PromoImage } from "../../promo/section"
import styles from "./promos.module.scss"

interface FeaturedImageProps {
  image: DirectusFiles
  title: string
  size: ImageSize
}

export enum ImageSize {
  Small = "120px",
  Medium = "medium",
  Large = "large",
  Auto = "100%",
}

const FeaturedImage = (props: FeaturedImageProps) => {
  const { image, title, size } = props
  const { filename_disk } = image
  if (!filename_disk || !image.width || !image.height) {
    return <></>
  }
  const caption = image.caption ? `${stripHtml(image.caption).result}` : `${stripHtml(title).result}`
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`
  return (
    <Image
      src={src}
      width={image.width}
      height={image.height}
      sizes="33vw"
      style={{
        width: size,
        height: "auto",
      }}
      alt={caption}
    />
  )
}
export default FeaturedImage
