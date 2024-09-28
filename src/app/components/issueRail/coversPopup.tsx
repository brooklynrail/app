import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { usePopup } from "./popupProvider"
import Image from "next/image"

const CoversPopup = () => {
  const { showPopup, images } = usePopup()

  const { setShowPopup } = usePopup()

  if (!showPopup) {
    return null
  }

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    setShowPopup(false)
  }

  const allCovers = images
    .filter((cover: any) => cover !== null)
    .map((cover: any, i: number) => {
      if (cover === null) {
        return <></>
      }

      const width = (cover.width * 500) / cover.height
      const height = (cover.height * width) / cover.width
      const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`
      const alt = cover.caption ? `${stripHtml(cover.caption).result}` : "The Brooklyn Rail"
      const caption = parse(cover.caption)
      const key = `cover-${i}`
      return (
        <div key={`cover-${i}`} className="cover">
          <Image src={src} width={width} height={height} alt={alt} sizes="35vw" />
          <figcaption className="text-sm">{caption}</figcaption>
        </div>
      )
    })

  return (
    <div className="covers" onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}>
      {allCovers}
    </div>
  )
}
export default CoversPopup
