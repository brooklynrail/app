import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Issues } from "../../../../lib/types"
import { getPermalink, PageType } from "../../../../lib/utils"
import { usePopup } from "../popupProvider"

interface CoverImagesProps {
  currentIssue: Issues
  clickToIssue: boolean
  priority: boolean
}

export const CoverImages = (props: CoverImagesProps) => {
  const { currentIssue, clickToIssue, priority } = props
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

  const issuePermalink = getPermalink({
    issueSlug: currentIssue.slug,
    type: PageType.Issue,
  })

  if (clickToIssue) {
    return (
      <div className="w-full h-full bg-zinc-700 bg-opacity-10 min-h-28 relative" ref={coversRef}>
        {containerHeight && containerWidth && (
          <Link href={issuePermalink}>
            <Covers
              currentIssue={currentIssue}
              containerHeight={containerHeight}
              containerWidth={containerWidth}
              clickToIssue={clickToIssue}
              priority={priority}
            />
          </Link>
        )}
      </div>
    )
  }
  return (
    <div className="w-full h-full bg-zinc-700 bg-opacity-10 min-h-28 relative" ref={coversRef}>
      {containerHeight && containerWidth && (
        <Covers
          clickToIssue={clickToIssue}
          currentIssue={currentIssue}
          containerHeight={containerHeight}
          containerWidth={containerWidth}
          priority={priority}
        />
      )}
    </div>
  )
}

interface CoversProps {
  currentIssue: Issues
  containerHeight: number
  containerWidth: number
  clickToIssue: boolean
  priority: boolean
}
const Covers = (props: CoversProps) => {
  const { currentIssue, containerHeight, containerWidth, clickToIssue, priority } = props
  const { setImages, togglePopup } = usePopup()

  const covers = [
    currentIssue.cover_1,
    currentIssue.cover_2,
    currentIssue.cover_3,
    currentIssue.cover_4,
    currentIssue.cover_5,
    currentIssue.cover_6,
  ]

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    if (!clickToIssue) {
      e.preventDefault()
      setImages(covers)
      togglePopup("covers")
    }
  }

  const validCovers = covers.filter((cover) => cover !== null && cover !== undefined)
  const numCovers = validCovers.length

  return covers.map((cover, index) => {
    if (!cover) {
      return null
    }
    const zindex = covers.length * 1 - index * 1

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
        priority={priority}
        style={{
          left: shiftleft,
          zIndex: zindex,
          height: containerHeight,
          width: "auto",
          boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        id={`cover-${index + 1}`}
        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`}
        width={cover.width}
        height={cover.height}
        alt={"alt"}
        sizes="25vw"
        onClick={handleClick}
      />
    )
  })
}
