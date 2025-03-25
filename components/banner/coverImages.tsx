import { Issues } from "@/lib/types"
import { getPermalink, PageType } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { stripHtml } from "string-strip-html"
import { usePopup } from "../popupProvider"
interface CoverImagesProps {
  currentIssue: Issues
  clickToIssue: boolean
  priority: boolean
}

export const CoverImages = (props: CoverImagesProps) => {
  const { currentIssue, clickToIssue, priority } = props

  // NOTE: clickToIssue is TRUE all places except for the Issue page where it is FALSE
  // This is so that the cover images dont link to itself on the Issue page

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
      <div className="w-full h-full min-h-48 relative" ref={coversRef}>
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

    // Calculate the aspect ratio of the cover
    const aspectRatio = cover.width / cover.height

    // Start with the available width and calculate height based on aspect ratio
    const width = containerWidth
    const height = width / aspectRatio

    // If calculated height is greater than container height, scale down proportionally
    const finalHeight = height > containerHeight ? containerHeight : height
    const finalWidth = finalHeight * aspectRatio

    const alt = cover.caption ? `${stripHtml(cover.caption).result}` : `Cover image for ${currentIssue.title}`

    // Calculate spacing between covers
    const diff = containerWidth - finalWidth > 0 ? containerWidth - finalWidth : 0
    const shiftleft = index === 0 ? 0 : (diff / (numCovers - 1)) * index

    return (
      <Image
        key={index}
        className={`absolute top-0 right-0 bottom-0`}
        priority={priority}
        style={{
          left: shiftleft,
          zIndex: zindex,
          height: `${finalHeight}px`,
          width: `${finalWidth}px`,
          boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        id={`cover-${index + 1}`}
        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`}
        width={finalWidth}
        height={finalHeight}
        alt={alt}
        sizes="25vw"
        onClick={handleClick}
      />
    )
  })
}
