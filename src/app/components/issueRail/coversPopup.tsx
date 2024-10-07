import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { usePopup } from "../popupProvider"
import Image from "next/image"

const CoversPopup = () => {
  const { showPopup, images, popupType, setShowPopup } = usePopup() // Include popupType from context

  if (!showPopup || popupType !== "coverImage") {
    return null // Only show the popup if showPopup is true and popupType is "coverImage"
  }

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    setShowPopup(false) // Hide the popup
  }

  const allCovers = images
    .filter((cover: any) => cover !== null)
    .map((cover: any, i: number) => {
      if (cover === null) {
        return null
      }

      const width = (cover.width * 500) / cover.height
      const height = (cover.height * width) / cover.width
      const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`
      const alt = cover.caption ? `${stripHtml(cover.caption).result}` : "The Brooklyn Rail"

      const key = `cover-${i}`
      return (
        <div key={`cover-${i}`} className="m-0 py-2 w-card-lg tablet-lg:w-card-lg flex-none">
          <Image src={src} width={width} height={height} alt={alt} sizes="35vw" />
          <figcaption className="pt-2 text-white text-xs">
            <span className="uppercase font-medium">{`Cover ${i + 1}`}</span>: {parse(cover.caption)}
          </figcaption>
        </div>
      )
    })

  return (
    <div
      className="z-[1000] fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-95 flex flex-col justify-center py-9"
      onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}
    >
      <div className="flex items-start overflow-x-auto space-x-9 px-20">{allCovers}</div>
    </div>
  )
}

export default CoversPopup
