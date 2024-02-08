import parse from "html-react-parser"
import Image from "next/image"

const RailImage = (props: any) => {
  const { name, type, images } = props

  // Find the `name` in the `images` array
  const image = images.find((image: any) => image.directus_files_id.shortcode_key === name)
  if (!image) {
    return <></>
  }
  const src = `http://localhost:8055/assets/${image.directus_files_id.id}`

  const mediaType = `width-${type}`
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
          width={image.directus_files_id.width}
          height={image.directus_files_id.height}
          alt={name}
          object-fit={`contain`}
        />
      </div>
      {caption}
    </div>
  )
}

export default RailImage
