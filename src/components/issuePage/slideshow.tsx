import { stripHtml } from "string-strip-html"
import { Articles, DirectusFiles } from "../../../lib/types"
import Image from "next/image"
import { useState } from "react"

interface SlideImageProps {
  slideshow_image: DirectusFiles
}

const SlideImage = (props: SlideImageProps) => {
  const { slideshow_image } = props
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${slideshow_image.filename_disk}?key=slideshow-image`
  return <Image className="bannerimg" width={664} height={282} alt={``} src={src} />
}

interface SlideshowProps {
  dateSlug: string
  currentSlides: Array<Articles>
}

const SlideShow = (props: SlideshowProps) => {
  const { dateSlug, currentSlides } = props
  const slideCount = currentSlides.length
  const [slidePosition, setSlidePosition] = useState<number>(0)

  const handlePrevSlide = () => {
    setSlidePosition((prevPosition) => (prevPosition - 1 + slideCount) % slideCount)
  }

  const handleNextSlide = () => {
    setSlidePosition((prevPosition) => (prevPosition + 1) % slideCount)
  }

  const slides = currentSlides.map((article: Articles, i: number) => {
    const { title, slug, sections } = article
    const sectionSlug = sections[0].slug
    const permalink = `/${dateSlug}/${sectionSlug}/${slug}`
    if (article.slideshow_image === null || article.slideshow_image === undefined) {
      return
    }

    if (i != slidePosition) {
      return
    }

    return (
      <a key={i} className="banner" href={permalink} title={`Visit ${stripHtml(title).result}`}>
        <SlideImage slideshow_image={article.slideshow_image} />
        <h2>{title}</h2>
      </a>
    )
  })

  const indicator = currentSlides.map((article: Articles, i: number) => {
    const show = i === slidePosition ? "show" : ""
    return <div key={i} className={`bannerblock ${show}`} onClick={() => setSlidePosition(i)}></div>
  })

  return (
    <div id="bannercontainer">
      <div id="banner">
        <div id="bannerimg-container">{slides}</div>
        <div id="banner-indicator">{indicator}</div>

        <div id="banner-prev" className="bannercontrols" onClick={handlePrevSlide}>
          <img width="25" src="/images/banner-prev.png" />
        </div>

        <div id="banner-next" className="bannercontrols" onClick={handleNextSlide}>
          <img width="25" src="/images/banner-next.png" />
        </div>
      </div>
    </div>
  )
}

export default SlideShow
