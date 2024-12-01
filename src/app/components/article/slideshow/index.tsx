"use client"
import useEmblaCarousel from "embla-carousel-react"
import parse from "html-react-parser"
import { useEffect, useMemo, useState } from "react"
import { Articles, ArticlesFiles } from "../../../../../lib/types"
import { usePopup } from "../../popupProvider"
import { NextButton, PrevButton, usePrevNextButtons } from "./arrowButtons"
import { useDotButton } from "./dotButtons"
import styles from "./slideshow.module.scss"
import Slide from "./slide"
import posthog from "posthog-js"
import Link from "next/link"

interface SlideShowProps {
  article: Articles
}

const SlideShow = ({ article }: SlideShowProps) => {
  const { body_text } = article
  const { showArticleSlideShow, slideId, toggleArticleSlideShow } = usePopup()

  if (!body_text) return null

  // Filter images that are actually used in the article body
  const filteredImages: ArticlesFiles[] = useMemo(() => {
    return article.images.filter((image) => {
      if (!image.directus_files_id) return false
      const name = image.directus_files_id.shortcode_key || `img${article.images.indexOf(image) + 1}`
      return body_text.includes(`[img name="${name}"`)
    })
  }, [article.images, body_text])

  // Find the index of the clicked image in filteredImages
  const currentSlideId = useMemo(() => {
    if (!slideId) return 0
    const index = filteredImages.findIndex((image) => image.directus_files_id?.id === slideId)
    return index >= 0 ? index : 0
  }, [slideId, filteredImages])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    startIndex: currentSlideId,
  })

  const [currentCaption, setCurrentCaption] = useState("")
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false)
  const [slidesViewed, setSlidesViewed] = useState(new Set<number>([currentSlideId]))

  if (!body_text) return null

  console.log("filteredImages", filteredImages)
  console.log("slideId", slideId)

  const { selectedIndex } = useDotButton(emblaApi)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  // Initialize caption for the initial slide when carousel is first mounted
  useEffect(() => {
    if (emblaApi !== null) {
      // Update caption for initial slide
      const currentImage = filteredImages[currentSlideId]
      const caption = currentImage && currentImage.directus_files_id ? currentImage.directus_files_id.caption : ""
      caption && setCurrentCaption(caption)
    }
  }, [emblaApi, currentSlideId, filteredImages, article.title])

  // Handle keyboard navigation (left/right arrows) and escape to close
  useEffect(() => {
    // Only add keyboard listeners if slideshow is visible
    if (!showArticleSlideShow || !emblaApi) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent event propagation to stop article navigation from triggering
      event.stopPropagation()

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
  }, [emblaApi, toggleArticleSlideShow, showArticleSlideShow])

  // Track analytics when slideshow is closed
  useEffect(() => {
    if (!showArticleSlideShow && slidesViewed.size > 0) {
      posthog.capture("close_slideshow", {
        article_slug: article.slug,
        total_unique_slides_viewed: slidesViewed.size,
        total_slides: filteredImages.length,
      })
      // Reset the slides viewed count
      setSlidesViewed(new Set([]))
    }
  }, [showArticleSlideShow, slidesViewed.size, article.slug, filteredImages.length])

  // Update caption and track analytics when slides change
  useEffect(() => {
    if (!emblaApi) return

    const updateCaption = () => {
      const currentIndex = emblaApi.selectedScrollSnap()
      // Track this slide as viewed
      setSlidesViewed((prev) => new Set(prev.add(currentIndex)))

      // Existing caption logic
      const currentImage = filteredImages[currentIndex]
      const caption = currentImage.directus_files_id?.caption || ""
      setCurrentCaption(caption)
      setIsCaptionExpanded(false)

      // Track slide change event
      posthog.capture("advanced_slideshow", {
        article_slug: article.slug,
        slide_index: currentIndex,
        total_unique_slides_viewed: slidesViewed.size,
      })
    }

    emblaApi.on("select", updateCaption)
    updateCaption()

    return () => {
      emblaApi.off("select", updateCaption)
    }
  }, [emblaApi, article, filteredImages])

  // Track analytics when slideshow is first opened
  useEffect(() => {
    if (showArticleSlideShow) {
      posthog.capture("viewed_slideshow", {
        article_slug: article.slug,
      })
    }
  }, [showArticleSlideShow, article.slug])

  // Handle body scroll locking when slideshow is open/closed
  useEffect(() => {
    if (showArticleSlideShow) {
      // Prevent scrolling on the body
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable scrolling when slideshow is closed
      document.body.style.overflow = "unset"
      setIsCaptionExpanded(false)
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showArticleSlideShow])

  if (!showArticleSlideShow) {
    return null
  }

  const captionLength = 240
  const isLongCaption = currentCaption.length > captionLength

  const handleCaptionClick = () => {
    setIsCaptionExpanded(!isCaptionExpanded)
  }

  return (
    <div className={styles.embla}>
      <Close />
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {filteredImages.map((image, i) => (
            <Slide key={i} image={image} index={i} selectedIndex={selectedIndex} articleTitle={article.title} />
          ))}
        </div>
      </div>
      <div className={styles.embla__controls}>
        <div className="max-w-screen-tablet-lg">
          <div className="flex flex-col ">
            <div
              className={`
            ${styles.embla__caption} 
            ${!isCaptionExpanded ? "line-clamp-2" : ""}
          `}
            >
              {parse(currentCaption)}
            </div>
            {isLongCaption && (
              <button
                onClick={handleCaptionClick}
                className="self-end flex items-center gap-1 text-slate-100 text-xs uppercase transition-colors"
              >
                <span>{isCaptionExpanded ? "Less" : "More"}</span>
                <svg
                  className={`w-3 h-3 mt-0.5 transform transition-transform ${isCaptionExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>

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
    <div className="absolute top-0 right-0 p-3 z-40">
      <button
        className="border border-zinc-200 text-zinc-700 text-center shadow-lg rounded-full bg-white w-8 tablet:w-9 h-8 tablet:h-9 flex items-center justify-center"
        onClick={(e) => toggleArticleSlideShow()}
        title="Close"
      >
        <span className="text-lg tablet:text-xl font-bold">&#x2715;</span>
      </button>
    </div>
  )
}

export default SlideShow
