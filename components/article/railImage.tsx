import parse from "html-react-parser"
import Image from "next/image"
import { ArticlesFiles } from "@/lib/types"
import { usePopup } from "../popupProvider"
import styles from "./article.module.scss"

enum ImageSize {
  SM = 240,
  MD = 550,
  LG = 1056,
  XL = 2000,
}

interface RailImageProps {
  name: string
  type: string
  images: Array<ArticlesFiles>
  preview?: boolean
  priority: boolean
}

const RailImage = (props: RailImageProps) => {
  const { name, type, images, preview, priority } = props
  const { toggleArticleSlideShow } = usePopup()

  // Find image and validate all required properties in one place
  let image = images.find((image) => image.directus_files_id?.shortcode_key === name)

  if (!image) {
    const sort = parseInt(name.replace("img", ""), 10)
    image = images[sort - 1]
  }

  // Check all required properties
  if (!image?.directus_files_id?.id || !image.directus_files_id?.width || !image.directus_files_id?.height) {
    return null
  }

  const nowDate = new Date()
  const previewNow = nowDate.toISOString()
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${image.directus_files_id.id}${preview ? `?preview=${previewNow}` : ""}`

  const checkWidth = (ogwidth: number, type: string) => {
    const sizeMap = {
      sm: ImageSize.SM,
      md: ImageSize.MD,
      lg: ImageSize.LG,
      xl: ImageSize.XL,
    }

    const targetWidth = sizeMap[type as keyof typeof sizeMap] || ImageSize.XL

    let width = ogwidth
    let mediaType = `width-${type}`

    if (ogwidth < targetWidth) {
      if (ogwidth < ImageSize.SM) {
        width = ImageSize.SM
        mediaType = `width-sm`
      } else if (ogwidth < ImageSize.MD) {
        width = ImageSize.SM
        mediaType = `width-sm`
      } else if (ogwidth < ImageSize.LG) {
        width = ImageSize.MD
        mediaType = `width-md`
      } else {
        width = ImageSize.LG
        mediaType = `width-lg`
      }
    } else {
      width = targetWidth
    }

    return { width, mediaType }
  }

  const height = image.directus_files_id.height
  const { width, mediaType } = checkWidth(image.directus_files_id.width, type)

  const caption = image.directus_files_id.caption ? (
    <figcaption className={`${mediaType}`}>{parse(image.directus_files_id.caption)}</figcaption>
  ) : null

  const imageId = image.directus_files_id.id

  return (
    <div className={`media ${mediaType}`}>
      <div className={`frame ${mediaType} ${styles.railImage}`} style={{ position: "relative" }}>
        <Image
          data-width={image.directus_files_id.width}
          data-height={image.directus_files_id.height}
          src={src}
          style={{
            width: "100%",
            height: "auto",
          }}
          priority={priority}
          data-src={src}
          width={width}
          height={height}
          alt={name}
          object-fit="contain"
          onClick={() => toggleArticleSlideShow(imageId)}
        />
        <svg
          className={`${styles.zoomIcon}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => toggleArticleSlideShow(imageId)}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
      {caption}
    </div>
  )
}

export default RailImage
