"use client"
import Link from "next/link"
import { Articles, ArticlesFiles } from "../../../../../lib/types"
import parse from "html-react-parser"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import styles from "./slideshow.module.scss"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"
import { NextButton, PrevButton, usePrevNextButtons } from "./arrowButtons"
import { DotButton, useDotButton } from "./dotButtons"
import { usePopup } from "../../popupProvider"

interface SlideShowProps {
  article: Articles
}

const SlideShow = (props: SlideShowProps) => {
  const { article } = props
  const { showArticleSlideShow, slideId, toggleArticleSlideShow } = usePopup()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentCaption, setCurrentCaption] = useState("")

  // Set the initial slide based on slideId
  useEffect(() => {
    if (emblaApi && slideId !== null) {
      emblaApi.scrollTo(slideId, true) // Scroll to the specific slide based on slideId
    }
  }, [emblaApi, slideId])

  // Keyboard navigation and escape functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!emblaApi) return

      if (event.key === "ArrowRight") {
        emblaApi.scrollNext()
      } else if (event.key === "ArrowLeft") {
        emblaApi.scrollPrev()
      } else if (event.key === "Escape") {
        toggleArticleSlideShow() // Close the slideshow when Escape key is pressed
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [emblaApi, toggleArticleSlideShow])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  // Update the caption based on the currently selected slide
  useEffect(() => {
    if (emblaApi) {
      const updateCaption = () => {
        const currentIndex = emblaApi.selectedScrollSnap()
        const currentImage = article.images[currentIndex]
        const caption = currentImage?.directus_files_id?.caption || article.title
        setCurrentCaption(stripHtml(caption).result)
      }

      // Update caption on initialization and when the slide changes
      emblaApi.on("select", updateCaption)
      updateCaption()
    }
  }, [emblaApi, article])

  const allImages = article.images.map((image: ArticlesFiles, i) => {
    if (!image.directus_files_id) return null
    const { filename_disk, caption, width, height, alt, modified_on } = image.directus_files_id
    const thiscaption = caption ? `${stripHtml(caption).result}` : `${stripHtml(article.title).result}`
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`

    return (
      <div key={i} className={`${styles.embla__slide} ${selectedIndex === i ? styles.embla__slide_active : ""}`}>
        <Image
          src={src}
          width={width}
          height={height}
          sizes="33vw"
          style={{
            width: "auto",
            height: "100%",
            objectFit: "contain",
          }}
          alt={thiscaption}
        />
      </div>
    )
  })

  return (
    <>
      {showArticleSlideShow && (
        <div className={styles.embla}>
          <Close />
          <div className={styles.embla__viewport} ref={emblaRef}>
            <div className={styles.embla__container}>{allImages}</div>
          </div>
          <div className={styles.embla__controls}>
            <div className="caption text-sm text-white mb-4">{currentCaption}</div>
            <div className={styles.embla__buttons}>
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Close = () => {
  const { toggleArticleSlideShow } = usePopup()
  return (
    <div className="absolute top-0 right-0 p-4 z-40">
      <button
        className="border-white border rounded-sm text-white uppercase text-xs px-1.5 py-1 bg-white bg-opacity-20"
        onClick={() => toggleArticleSlideShow()}
      >
        <span>Close</span>
      </button>
    </div>
  )
}

export default SlideShow
