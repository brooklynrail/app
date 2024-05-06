import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { ArticlesIssues, DirectusFiles } from "../../../../lib/types"
import Image from "next/image"
import { useState } from "react"
import { PageType, getPermalink } from "../../../../lib/utils"
import Link from "next/link"

interface SlideImageProps {
  slideshow_image: DirectusFiles
  alt: string
}

const SlideImage = (props: SlideImageProps) => {
  const { slideshow_image, alt } = props
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${slideshow_image.filename_disk}?key=slideshow-image`
  return <Image priority className="bannerimg" width={664} height={282} alt={stripHtml(alt).result} src={src} />
}

interface SlideshowProps {
  currentSlides: ArticlesIssues[]
  year: number
  month: number
}

const SlideShow = (props: SlideshowProps) => {
  const { currentSlides, year, month } = props
  const slideCount = currentSlides.length
  const [slidePosition, setSlidePosition] = useState<number>(0)

  const handlePrevSlide = () => {
    setSlidePosition((prevPosition) => (prevPosition - 1 + slideCount) % slideCount)
  }

  const handleNextSlide = () => {
    setSlidePosition((prevPosition) => (prevPosition + 1) % slideCount)
  }

  const slides = currentSlides.map((articleIssue: ArticlesIssues, i: number) => {
    const article = articleIssue.articles_slug
    const { title, slideshow_image, sections, slug } = article

    if (slideshow_image === null || slideshow_image === undefined) {
      return
    }

    if (i != slidePosition) {
      return
    }

    const articlePermalink = getPermalink({
      year: year,
      month: month,
      section: sections[0].sections_id.slug,
      slug: slug,
      type: PageType.Article,
    })

    return (
      <Link key={i} className="banner" href={articlePermalink} title={`Visit ${stripHtml(title).result}`}>
        <SlideImage slideshow_image={slideshow_image} alt={title} />
        <h2>{parse(title)}</h2>
      </Link>
    )
  })

  const indicator = currentSlides.map((articleIssue: ArticlesIssues, i: number) => {
    const show = i === slidePosition ? "show" : ""
    return <div key={i} className={`bannerblock ${show}`} onClick={() => setSlidePosition(i)}></div>
  })

  return (
    <div id="bannercontainer">
      <div id="banner">
        <div id="bannerimg-container">{slides}</div>
        <div id="banner-indicator">{indicator}</div>

        <div id="banner-prev" className="bannercontrols" onClick={handlePrevSlide}>
          <Image src="/images/banner-prev.png" width={25} height={31} alt="Previous" />
        </div>

        <div id="banner-next" className="bannercontrols" onClick={handleNextSlide}>
          <Image src="/images/banner-next.png" width={25} height={31} alt="Next" />
        </div>
      </div>
    </div>
  )
}

export default SlideShow
