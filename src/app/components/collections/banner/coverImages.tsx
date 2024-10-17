import { stripHtml } from "string-strip-html"
import { Issues } from "../../../../../lib/types"
import Image from "next/image"
import { usePopup } from "../../popupProvider"
import { useEffect, useRef, useState } from "react"

interface CoverImagesProps {
  currentIssue: Issues
}

export const CoverImages = (props: CoverImagesProps) => {
  const { currentIssue } = props
  const coversRef = useRef<HTMLDivElement | null>(null)
  const [containerHeight, setContainerHeight] = useState<number | null>(null)
  const [containerWidth, setContainerWidth] = useState<number | null>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (coversRef.current) {
        setContainerHeight(coversRef.current.clientHeight)
        setContainerWidth(coversRef.current.clientWidth)
      }
    }

    updateDimensions() // Initial call to set dimensions

    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return (
    <div className="w-full h-full bg-zinc-700 bg-opacity-10 min-h-28 relative" ref={coversRef}>
      {containerHeight && containerWidth && (
        <Covers currentIssue={currentIssue} containerHeight={containerHeight} containerWidth={containerWidth} />
      )}
    </div>
  )
}

interface CoversProps {
  currentIssue: Issues
  containerHeight: number
  containerWidth: number
}
const Covers = (props: CoversProps) => {
  const { currentIssue, containerHeight, containerWidth } = props
  const { setShowPopup, setImages } = usePopup()

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    setImages(covers)
    setShowPopup(true)
  }
  const covers = [
    currentIssue.cover_1,
    currentIssue.cover_2,
    currentIssue.cover_3,
    currentIssue.cover_4,
    currentIssue.cover_5,
    currentIssue.cover_6,
  ]

  // get the average widths of all the covers
  const averageWidth = covers.reduce((acc, cover) => {
    if (!cover) {
      return acc
    }
    return acc + cover.width
  }, 0)

  const averageHeight = covers.reduce((acc, cover) => {
    if (!cover) {
      return acc
    }
    return acc + cover.height
  }, 0)

  const validCovers = covers.filter((cover) => cover !== null && cover !== undefined)
  const numCovers = validCovers.length

  return covers.map((cover, index) => {
    if (!cover) {
      return null
    }
    const zindex = covers.length * 10 - index * 10

    const height = containerHeight
    const width = (containerHeight * cover.width) / cover.height

    // in order to caculate how far to space out the stack of cover images, we need to know
    // - the average width of all the covers
    // - the available width of the container
    const diff = containerWidth - width

    const shiftleft = index === 0 ? 0 : (diff / (numCovers - 1)) * index

    return (
      <Image
        key={index}
        className={`absolute top-0 right-0 bottom-0`}
        priority
        style={{
          left: shiftleft,
          zIndex: zindex,
          height: containerHeight,
          width: width,
          boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        id={`cover-${index + 1}`}
        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`}
        width={width}
        height={height}
        alt={"alt"}
        sizes="10vw"
        onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}
      />
    )
  })
}
