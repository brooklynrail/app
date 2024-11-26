"use client"
import { Articles, ArticlesFiles } from "../../../../../lib/types"
import { stripHtml } from "string-strip-html"
import Image from "next/image"
import styles from "./slideshow.module.scss"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState, useMemo } from "react"
import { NextButton, PrevButton, usePrevNextButtons } from "./arrowButtons"
import { useDotButton } from "./dotButtons"
import { usePopup } from "../../popupProvider"

interface SlideShowProps {
  article: Articles
}

const SlideShow = ({ article }: SlideShowProps) => {
  const { body_text, images } = article
  const { showArticleSlideShow, slideId, toggleArticleSlideShow } = usePopup()
  const currentSlideId = slideId ? slideId - 1 : 0
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: currentSlideId })
  const [currentCaption, setCurrentCaption] = useState("")

  if (!body_text) return null

  // Filter images that are actually used in the article body
  const filteredImages: ArticlesFiles[] = useMemo(() => {
    return article.images.filter((image) => {
      if (!image.directus_files_id) return false
      const name = image.directus_files_id.shortcode_key || `img${article.images.indexOf(image) + 1}`
      return body_text.includes(`[img name="${name}"`)
    })
  }, [article.images, body_text])

  const { selectedIndex } = useDotButton(emblaApi)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  // Initialize slide position based on clicked image
  useEffect(() => {
    if (emblaApi !== null) {
      // Update caption for initial slide
      const currentImage = filteredImages[currentSlideId]
      const caption = currentImage && currentImage.directus_files_id ? currentImage.directus_files_id.caption : ""
      caption && setCurrentCaption(stripHtml(caption).result)
    }
  }, [emblaApi, currentSlideId, filteredImages, article.title])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!emblaApi) return

      const keyActions = {
        ArrowRight: () => emblaApi.scrollNext(),
        ArrowLeft: () => emblaApi.scrollPrev(),
        Escape: toggleArticleSlideShow,
      }

      const action = keyActions[event.key as keyof typeof keyActions]
      if (action) action()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [emblaApi, toggleArticleSlideShow])

  // Caption management
  useEffect(() => {
    if (!emblaApi) return

    const updateCaption = () => {
      const currentIndex = emblaApi.selectedScrollSnap()
      const currentImage = filteredImages[currentIndex]
      const caption = currentImage?.directus_files_id?.caption || article.title
      setCurrentCaption(stripHtml(caption).result)
    }

    emblaApi.on("select", updateCaption)
    updateCaption()

    return () => {
      emblaApi.off("select", updateCaption)
    }
  }, [emblaApi, article, filteredImages])

  const renderSlide = (image: ArticlesFiles, index: number) => {
    if (!image.directus_files_id) return null

    // Extract image metadata from the Directus file
    const { filename_disk, caption, width, height } = image.directus_files_id
    const slideCaption = caption ? stripHtml(caption).result : stripHtml(article.title).result
    const src = `${process.env.NEXT_PUBLIC_IMAGE_PATH}${filename_disk}`

    return (
      <div
        key={index}
        className={`${styles.embla__slide} ${selectedIndex === index ? styles.embla__slide_active : ""}`}
      >
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
          alt={slideCaption}
        />
      </div>
    )
  }

  if (!showArticleSlideShow) {
    return null
  }

  return (
    <div className={styles.embla}>
      <Close />
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>{filteredImages.map((image, i) => renderSlide(image, i))}</div>
      </div>
      <div className={styles.embla__controls}>
        <div className={styles.embla__caption}>{currentCaption}</div>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

const Close = () => {
  const { toggleArticleSlideShow } = usePopup()
  return (
    <div className="absolute top-0 right-0 p-4 z-40">
      <button
        className="border-white border rounded-sm text-white uppercase text-xs px-1.5 py-1 bg-white bg-opacity-20"
        onClick={(e) => toggleArticleSlideShow()}
      >
        <span>Close</span>
      </button>
    </div>
  )
}

export default SlideShow