import { stripHtml } from "string-strip-html"
import { Issues } from "../../../../lib/types"
import Image from "next/image"
import { usePopup } from "./popupProvider"

interface CoverImagesProps {
  issueBasics: Issues
}

export const CoverImage = (props: CoverImagesProps) => {
  const { issueBasics } = props

  const { setShowPopup, setImages } = usePopup()
  if (
    !issueBasics.cover_1 ||
    !issueBasics.cover_1.width ||
    !issueBasics.cover_1.height ||
    !issueBasics.cover_1.filename_disk
  ) {
    return <div className={`issue-covers loading`}></div>
  }

  const covers = [
    issueBasics.cover_1,
    issueBasics.cover_2,
    issueBasics.cover_3,
    issueBasics.cover_4,
    issueBasics.cover_5,
    issueBasics.cover_6,
  ]

  const handleClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    setImages(covers)
    setShowPopup(true)
  }

  const alt = issueBasics.cover_1.caption
    ? stripHtml(issueBasics.cover_1.caption).result
    : `${issueBasics.title} — The Brooklyn Rail`

  return (
    <div className={`issue-covers`}>
      <div>
        <Image
          priority
          id={`cover-1`}
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}${issueBasics.cover_1.filename_disk}`}
          width={issueBasics.cover_1.width}
          height={issueBasics.cover_1.height}
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
