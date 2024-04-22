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

  const allCovers = images.map((cover: any, i: number) => {
    if (cover === null) {
      return <></>
    }

    const width = (cover.width * 500) / cover.height
    const height = (cover.height * width) / cover.width
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${cover.filename_disk}`
    const alt = cover.description ? cover.description.replace(/(<([^>]+)>)/gi, "") : "The Brooklyn Rail"
    const desc = cover.description ? (
      <figcaption dangerouslySetInnerHTML={{ __html: `<strong>Cover ${i + 1}:</strong> ${cover.description}` }} />
    ) : null

    return (
      <div className="cover" key={i}>
        <Image src={src} width={width} height={height} alt={alt} />
        {desc}
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
