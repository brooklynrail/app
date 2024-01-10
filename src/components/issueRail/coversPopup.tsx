import { usePopup } from "./popupProvider"
import Image from "next/image"

const CoversPopup = () => {
  const { showPopup, images } = usePopup()

  if (!showPopup) return null

  const { setShowPopup, setImages } = usePopup()

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
    const src = `http://localhost:8055/assets/${cover.filename_disk}`
    const alt = cover.description ? cover.description.replace(/(<([^>]+)>)/gi, "") : "The Brooklyn Rail"
    const desc = cover.description ? (
      <figcaption dangerouslySetInnerHTML={{ __html: `<strong>Cover ${i + 1}:</strong> ${cover.description}` }} />
    ) : null

    return (
      <div className="cover">
        <Image key={i} src={src} width={width} height={height} alt={alt} />
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
