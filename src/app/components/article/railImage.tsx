import parse from "html-react-parser"
import Image from "next/image"
import { ArticlesFiles } from "../../../../lib/types"
import { usePopup } from "../popupProvider"

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
  const { showArticleSlideShow, toggleArticleSlideShow } = usePopup()

  // First, try to find the image by its shortcode key (name) in the images array
  // The shortcode key is a unique identifier for each image, stored in directus_files_id
  let image = images.find(
    (image: ArticlesFiles) => image.directus_files_id && image.directus_files_id.shortcode_key === name,
  )

  // If no image is found by shortcode key, fall back to using the numeric index
  // Example: for "img1", extract "1" and use it as a 0-based index into images array
  if (!image) {
    const sort = parseInt(name.replace("img", ""), 10)
    image = images[sort - 1] // Subtract 1 since array is 0-based
  }

  // If we still don't have a valid image with directus_files_id, render nothing
  if (!image || !image.directus_files_id) {
    return <></>
  }

  const nowDate = new Date()
  const previewNow = nowDate.toISOString()
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${image.directus_files_id.id}${preview ? `?preview=${previewNow}` : ""}`

  if (!image.directus_files_id.width || !image.directus_files_id.height) {
    return <></>
  }

  // get the index # of the image in the images array
  // the order of the images in the array is based on the order of the images field in the article, not the order of the images in the body_text
  const index = images.findIndex(
    (i) => image.directus_files_id && i.directus_files_id && i.directus_files_id.id === image.directus_files_id.id,
  )

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
          className="cursor-pointer"
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
          onClick={() => toggleArticleSlideShow(index)}
        />
      </div>
      {caption}
    </div>
  )
}

export default RailImage
