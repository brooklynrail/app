import { stripHtml } from "string-strip-html"
import { Issues } from "../../../../lib/types"
import Image from "next/image"
import { usePopup } from "./popupProvider"

interface CoverImagesProps {
  issueData?: Issues
}

export const CoverImage = (props: CoverImagesProps) => {
  const { issueData } = props

  const { setShowPopup, setImages } = usePopup()
  if (
    !issueData ||
    !issueData.cover_1 ||
    !issueData.cover_1.width ||
    !issueData.cover_1.height ||
    !issueData.cover_1.filename_disk
  ) {
    return <div className={`issue-covers loading`}></div>
  }

  const covers = [
    issueData.cover_1,
    issueData.cover_2,
    issueData.cover_3,
    issueData.cover_4,
    issueData.cover_5,
    issueData.cover_6,
  ]

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    setImages(covers)
    setShowPopup(true)
  }

  const alt = issueData.cover_1.caption
    ? stripHtml(issueData.cover_1.caption).result
    : `${issueData.title} — The Brooklyn Rail`

  return (
    <div className={`issue-covers`}>
      <div>
        <Image
          priority
          id={`cover-1`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${issueData.cover_1.filename_disk}`}
          width={issueData.cover_1.width}
          height={issueData.cover_1.height}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt={alt}
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}
        />
      </div>
    </div>
  )
}
