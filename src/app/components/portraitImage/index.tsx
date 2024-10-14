import { DirectusFiles } from "../../../../lib/types"
import Image from "next/image"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"

interface PortraitImageProps {
  image: DirectusFiles
  title: string
}
const PortraitImage = (props: PortraitImageProps) => {
  const { filename_disk, caption, width, height } = props.image
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}?key=portrait`
  const desc = caption ? <figcaption>{parse(caption)}</figcaption> : null
  const alt = caption ? caption : `A photo of ${stripHtml(props.title).result}`

  return (
    <div className={`media`}>
      <div>
        <Image
          className="grayscale rounded-full w-28 h-28 tablet:w-32 tablet:h-32 desktop:w-40 desktop:h-40"
          src={src}
          sizes="25vw"
          width={width}
          height={height}
          alt={alt}
        />
      </div>
    </div>
  )
}

export default PortraitImage
