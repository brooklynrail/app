import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import { Articles, DirectusFiles } from "../../../../lib/types"
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
  const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${slideshow_image.filename_disk}`
  return (
    <Image
      priority
      className="relative top-0 left-0"
      width={1680}
      height={1282}
      alt={stripHtml(alt).result}
      src={src}
      sizes={"60vw"}
    />
  )
}

interface SlideshowProps {
  currentSlides: Articles[]
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

  const slides = currentSlides.map((article: Articles, i: number) => {
    const { title, slideshow_image, section, slug } = article

    if (slideshow_image === null || slideshow_image === undefined) {
      return
    }

    if (i != slidePosition) {
      return
    }

    const articlePermalink = getPermalink({
      year: year,
      month: month,
      section: section.slug,
      slug: slug,
      type: PageType.Article,
    })

    return (
      <>
        <div className="relative tablet:max-h-[288px]">
          <Link key={i} className="block" href={articlePermalink} title={`Visit ${stripHtml(title).result}`}>
            <SlideImage slideshow_image={slideshow_image} alt={title} />
          </Link>
          <div
            id="banner-prev"
            className="left-0 h-full z-10 px-3 top-0 absolute cursor-pointer flex flex-col justify-center"
            onClick={handlePrevSlide}
          >
            <Image src="/images/banner-prev.png" width={25} height={31} alt="Previous" />
          </div>

          <div
            id=""
            className="right-0 h-full z-10 px-3 top-0 absolute cursor-pointer flex flex-col justify-center"
            onClick={handleNextSlide}
          >
            <Image src="/images/banner-next.png" width={25} height={31} alt="Next" />
          </div>
        </div>
        <Link key={i} className="block" href={articlePermalink} title={`Visit ${stripHtml(title).result}`}>
          <h2 className="py-1 font-normal text-xl">{parse(title)}</h2>
        </Link>
      </>
    )
  })

  const indicator = currentSlides.map((article: Articles, i: number) => {
    const show = i === slidePosition ? "bg-red-500" : "bg-gray-300"
    return <div key={i} className={`w-2.5 h-2.5 px-1 rounded-full ${show}`} onClick={() => setSlidePosition(i)}></div>
  })

  return (
    <div className="pb-2">
      <div className="relative">
        <div className="relative">{slides}</div>
        <div className="flex items-center py-2 justify-center space-x-2">{indicator}</div>
      </div>
    </div>
  )
}

export default SlideShow
