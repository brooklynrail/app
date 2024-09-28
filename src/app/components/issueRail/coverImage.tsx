import { stripHtml } from "string-strip-html"
import { Issues } from "../../../../lib/types"
import Image from "next/image"
import { usePopup } from "./popupProvider"

interface CoverImagesProps {
  thisIssueData: Issues
}

export const CoverImage = (props: CoverImagesProps) => {
  const { thisIssueData } = props

  const { setShowPopup, setImages } = usePopup()
  if (
    !thisIssueData.cover_1 ||
    !thisIssueData.cover_1.width ||
    !thisIssueData.cover_1.height ||
    !thisIssueData.cover_1.filename_disk
  ) {
    return <div className={`issue-covers loading`}></div>
  }

  const covers = [
    thisIssueData.cover_1,
    thisIssueData.cover_2,
    thisIssueData.cover_3,
    thisIssueData.cover_4,
    thisIssueData.cover_5,
    thisIssueData.cover_6,
  ]

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    console.log("clicked")
    setImages(covers)
    setShowPopup(true)
  }

  const alt = thisIssueData.cover_1.caption
    ? stripHtml(thisIssueData.cover_1.caption).result
    : `${thisIssueData.title} — The Brooklyn Rail`

  return (
    <div className={`issue-covers`}>
      <div>
        <Image
          priority
          id={`cover-1`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${thisIssueData.cover_1.filename_disk}`}
          width={thisIssueData.cover_1.width}
          height={thisIssueData.cover_1.height}
          style={{
            width: "100%",
            height: "auto",
          }}
          alt={alt}
          sizes="25vw"
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleClick(e)}
        />
      </div>
    </div>
  )
}
