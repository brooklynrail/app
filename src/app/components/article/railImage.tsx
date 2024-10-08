import parse from "html-react-parser"
import Image from "next/image"
import { ArticlesFiles } from "../../../../lib/types"

enum ImageSize {
  SM = 240,
  MD = 440,
  LG = 800,
  XL = 1020,
}

interface RailImageProps {
  name: string
  type: string
  images: Array<ArticlesFiles>
  preview?: boolean
}

const RailImage = (props: RailImageProps) => {
  const { name, type, images, preview } = props

  let image = images.find(
    (image: ArticlesFiles) => image.directus_files_id && image.directus_files_id.shortcode_key === name,
  )
  if (!image) {
    const sort = parseInt(name.replace("img", ""), 10)
    image = images[sort - 1]
  }

  if (!image || !image.directus_files_id) {
    return <></>
  }

  const nowDate = new Date()
  const previewNow = nowDate.toISOString()
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${image.directus_files_id.id}${preview ? `?preview=${previewNow}` : ""}`

  if (!image.directus_files_id.width || !image.directus_files_id.height) {
    return <></>
  }

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

  return (
    <div className={`media ${mediaType}`}>
      <div className={`frame ${mediaType}`}>
        <Image
          src={src}
          style={{
            width: "100%",
            height: "auto",
          }}
          data-src={src}
          width={width}
          height={height}
          alt={name}
          object-fit="contain"
        />
      </div>
      {caption}
    </div>
  )
}

export default RailImage
