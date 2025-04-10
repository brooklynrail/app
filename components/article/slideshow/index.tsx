"use client"
import { Articles, ArticlesFiles } from "@/lib/types"
import useEmblaCarousel from "embla-carousel-react"
import parse from "html-react-parser"
import posthog from "posthog-js"
import { useEffect, useMemo, useState } from "react"
import { usePopup } from "../../popupProvider"
import { NextButton, PrevButton, usePrevNextButtons } from "./arrowButtons"
import { useDotButton } from "./dotButtons"
import Slide from "./slide"
import styles from "./slideshow.module.scss"

interface SlideShowProps {
  article: Articles
}

const SlideShow = ({ article }: SlideShowProps) => {
  const { body_text } = article
  const { showArticleSlideShow, slideId, toggleArticleSlideShow } = usePopup()

  if (!body_text) {
    return null
  }

  // Build filteredImages array based on order in body text
  const filteredImages: ArticlesFiles[] = useMemo(() => {
    // Find all image shortcodes in order they appear in body text
    const regex = /\[img name="([^"]+)"/g
    const matches = Array.from(body_text.matchAll(regex))

    // Map through matches to create array in order of appearance
    return matches
      .map((match) => {
        const shortcodeName = match[1]
        return article.images.find((image) => {
          if (!image.directus_files_id) {
            return false
          }
          const imageName = image.directus_files_id.shortcode_key || `img${article.images.indexOf(image) + 1}`
          return imageName === shortcodeName
        })
      })
      .filter((image): image is ArticlesFiles => image !== undefined)
  }, [article.images, body_text])

  // Find the index of the clicked image in filteredImages
  const currentSlideId = useMemo(() => {
    if (!slideId) {
      return 0
    }
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

  if (!body_text) {
    return null
  }

  const { selectedIndex } = useDotButton(emblaApi)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  // Initialize caption for the initial slide when carousel is first mounted
  useEffect(() => {
    if (emblaApi !== null) {
      // Update caption for initial slide
      const currentImage = filteredImages[currentSlideId]
      const caption = currentImage && currentImage.directus_files_id ? currentImage.directus_files_id.caption : ""
      if (caption) {
        setCurrentCaption(caption)
      }
    }
  }, [emblaApi, currentSlideId, filteredImages, article.title])

  // Handle keyboard navigation (left/right arrows) and escape to close
  useEffect(() => {
    // Only add keyboard listeners if slideshow is visible
    if (!showArticleSlideShow || !emblaApi) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent event propagation to stop article navigation from triggering
      event.stopPropagation()

      const keyActions = {
        arrowRight: () => emblaApi.scrollNext(),
        arrowLeft: () => emblaApi.scrollPrev(),
        escape: toggleArticleSlideShow,
      }

      const action = keyActions[event.key.toLowerCase() as keyof typeof keyActions]
      if (action) {
        action()
      }
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
    if (!emblaApi) {
      return
    }

    const updateCaption = () => {
      const currentIndex = emblaApi.selectedScrollSnap()
      // Track this slide as viewed
      void setSlidesViewed((prev) => new Set(prev.add(currentIndex)))

      // Existing caption logic
      const currentImage = filteredImages[currentIndex]
      const caption = currentImage.directus_files_id?.caption || ""
      setCurrentCaption(caption)
      setIsCaptionExpanded(false)

      // Track slide change event
      void posthog.capture("advanced_slideshow", {
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

  useEffect(() => {
    if (showArticleSlideShow) {
      // Store last focused element
      const lastFocusedElement = document.activeElement as HTMLElement

      // Focus first interactive element in slideshow
      const firstFocusableElement = document.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as HTMLElement
      firstFocusableElement?.focus()

      return () => {
        // Restore focus when slideshow closes
        lastFocusedElement?.focus()
      }
    }
  }, [showArticleSlideShow])

  const [liveRegionText, setLiveRegionText] = useState("")

  useEffect(() => {
    if (emblaApi) {
      const currentIndex = emblaApi.selectedScrollSnap()
      const total = filteredImages.length
      setLiveRegionText(`Image ${currentIndex + 1} of ${total}`)
    }
  }, [emblaApi, selectedIndex, filteredImages.length])

  useEffect(() => {
    if (showArticleSlideShow) {
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          )
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }

      document.addEventListener("keydown", handleTabKey)
      return () => document.removeEventListener("keydown", handleTabKey)
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
    <div className={styles.embla} role="dialog" aria-label="Image slideshow" aria-modal="true">
      <Close ariaLabel="Close image slideshow" />
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div
          className={styles.embla__container}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${filteredImages.length} images from ${article.title}`}
        >
          {filteredImages.map((image, i) => (
            <Slide
              key={i}
              image={image}
              index={i}
              selectedIndex={selectedIndex}
              articleTitle={article.title}
              aria-roledescription="slide"
              aria-label={`Image ${i + 1} of ${filteredImages.length}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.embla__controls}>
        <div className="w-full max-w-screen-tablet-lg">
          <div className="flex flex-col ">
            <div
              className={`
            ${styles.embla__caption} 
            ${!isCaptionExpanded ? "line-clamp-2" : ""}
          `}
              role="complementary"
              aria-label="Image caption"
            >
              {parse(currentCaption)}
            </div>
            {isLongCaption && (
              <button
                onClick={handleCaptionClick}
                className="self-end flex items-center gap-1 text-slate-100 text-xs uppercase"
                aria-expanded={isCaptionExpanded}
                aria-controls="caption-text"
              >
                <span>{isCaptionExpanded ? "Show less" : "Show more"}</span>
              </button>
            )}
          </div>
        </div>

        {filteredImages.length > 1 && (
          <div className={styles.embla__buttons}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} aria-label="Previous image" />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} aria-label="Next image" />
          </div>
        )}
      </div>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveRegionText}
      </div>
    </div>
  )
}

const Close = ({ ariaLabel }: { ariaLabel: string }) => {
  const { toggleArticleSlideShow } = usePopup()
  return (
    <div className="absolute top-0 right-0 p-3 z-40">
      <button
        className="border border-zinc-200 text-zinc-700 text-center shadow-lg rounded-full bg-white w-8 tablet:w-9 h-8 tablet:h-9 flex items-center justify-center"
        onClick={() => toggleArticleSlideShow()}
        title="Close"
        aria-label={ariaLabel}
      >
        <span className="text-lg tablet:text-xl font-bold">&#x2715;</span>
      </button>
    </div>
  )
}

export default SlideShow
