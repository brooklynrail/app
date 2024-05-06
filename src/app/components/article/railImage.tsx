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
}
const RailImage = (props: RailImageProps) => {
  const { name, type, images } = props

  // images == these are ALL of the images in the article
  // Find the `name` in the `images` array
  // this assumes that the `name` is unique
  const image = images.find(
    (image: ArticlesFiles) => image.directus_files_id && image.directus_files_id.shortcode_key === name,
  )
  if (!image || !image.directus_files_id) {
    return <></>
  }
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${image.directus_files_id.id}`

  if (!image.directus_files_id.width || !image.directus_files_id.height) {
    return <></>
  }

  let width
  let mediaType
  let legacy = false
  const height = image.directus_files_id.height

  if (type === "legacy") {
    legacy = true
    if (image.directus_files_id.width < ImageSize.SM) {
      width = ImageSize.SM
      mediaType = `width-sm`
    } else if (image.directus_files_id.width < ImageSize.MD) {
      width = ImageSize.MD
      mediaType = `width-md`
    } else if (image.directus_files_id.width < ImageSize.LG) {
      width = ImageSize.LG
      mediaType = `width-lg`
    } else {
      width = ImageSize.XL
      mediaType = `width-xl`
    }
  } else {
    width = image.directus_files_id.width
    mediaType = `width-${type}`
  }
  const legacyClass = legacy ? "legacy" : ""

  const caption = image.directus_files_id.caption ? (
    <figcaption className={`${mediaType} ${legacyClass}`}>{parse(image.directus_files_id.caption)}</figcaption>
  ) : null

  return (
    <div className={`media ${mediaType} ${legacyClass}`}>
      <div className={`frame ${mediaType} ${legacyClass}`}>
        <Image
          src={src}
          style={{
            width: "100%",
            height: "auto",
          }}
          width={width}
          height={height}
          alt={name}
          object-fit={`contain`}
        />
      </div>
      {caption}
    </div>
  )
}

export default RailImage
