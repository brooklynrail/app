"use client"
import Image from "next/image"
import { Exhibitions, ExhibitionsImages } from "../../../../lib/types"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"
import parse from "html-react-parser"

interface ExhibitionHeadProps {
  exhibitionData: Exhibitions
}

const ExhibitionSlideshow = (props: ExhibitionHeadProps) => {
  const { exhibition_images } = props.exhibitionData
  const [currentIndex, setCurrentIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
    watchDrag: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Update current slide index
  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", () => {
      setCurrentIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  if (!exhibition_images) {
    return null
  }

  return (
    <section className="">
      <div className="max-w-screen-desktop-lg mx-auto px-3">
        {/* Carousel wrapper */}
        <div className="relative touch-pan-y">
          {/* Previous/Next Buttons - Hidden on mobile, visible on tablet and up */}
          <button
            className="hidden tablet:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-100/80 hover:bg-slate-100 rounded-full p-2 shadow-lg"
            onClick={scrollPrev}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="stroke-zinc-900"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="hidden tablet:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
            onClick={scrollNext}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="stroke-zinc-900"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel viewport */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ml-4 select-none">
              {exhibition_images.map((image: ExhibitionsImages, index: number) => {
                if (!image.directus_files_id) return null

                const src = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.directus_files_id.filename_disk}`
                const alt = image.directus_files_id.alt || ""
                const caption = image.directus_files_id.caption

                return (
                  <div
                    className="flex-[0_0_100%] min-w-0 pl-3 transition-opacity duration-300"
                    key={index}
                    style={{
                      opacity: currentIndex === index ? 1 : 0.5,
                    }}
                  >
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1280px) 1200px, 100vw"
                        draggable="false"
                      />
                    </div>
                    {caption && <div className="mt-4 text-sm text-gray-600">{parse(caption)}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dots navigation - Made larger for touch targets on mobile */}
        <div className="flex justify-center gap-3 pt-6">
          {exhibition_images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-slate-50" : "bg-slate-400"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExhibitionSlideshow
