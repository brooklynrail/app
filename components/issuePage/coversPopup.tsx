import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import { PopupType, usePopup } from "../popupProvider"

const CoversPopup = () => {
  const { showPopup, popupType, images } = usePopup()

  const { setImages, togglePopup } = usePopup()

  const handleClick = () => {
    setImages(images)
    togglePopup(PopupType.Covers)
  }

  if (!showPopup || popupType !== PopupType.Covers) {
    return null
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
      const caption = (
        <>
          <span className="uppercase font-medium">{`Cover ${i + 1}`}</span>: {parse(cover.caption)}
        </>
      )
      const key = `cover-${i}`
      return (
        <div key={`cover-${i}`} className="m-0 py-2 w-card-lg tablet-lg:w-card-lg flex-none">
          <Image src={src} width={width} height={height} alt={alt} sizes="35vw" />
          <figcaption className="pt-2 text-white text-xs">{caption}</figcaption>
        </div>
      )
    })

  return (
    <div
      className="z-[999] fixed w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-95 flex flex-col justify-center py-9"
      onClick={handleClick}
    >
      <div className="flex items-start overflow-x-auto space-x-9 px-20 py-9">{allCovers}</div>
    </div>
  )
}
export default CoversPopup
