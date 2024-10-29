import { useEffect, useRef } from "react"
import { useVideo, VideoProvider } from "@/app/context/videoProvider"
import { Covers } from "../../../../lib/types"
import CoverStage from "./coverStage"

interface CoverArtProps {
  covers?: Covers[] | null
}

const CoverArt = (props: CoverArtProps) => {
  const { covers } = props

  // Video player reference
  const videoRef = useRef<HTMLVideoElement>(null)
  const { isVideoPaused, toggleVideoState, isVideoVisible, toggleVideoVisibility } = useVideo()

  // Default fallback video path
  // let videoPath = "/video/transition-jeremyzilar2024-web.mp4"
  let videoPath = ""

  // Use first cover and media if available
  if (covers && covers.length > 0 && covers[0].media[0]?.directus_files_id) {
    videoPath = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${covers[0].media[0].directus_files_id.filename_disk}`
  }

  useEffect(() => {
    // Pause or play the video based on isVideoPaused state
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isVideoPaused])

  useEffect(() => {
    // Prevent scrolling when video is visible (full-screen mode)
    if (isVideoVisible) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isVideoVisible])

  const handleVideoVisibility = () => {
    console.log("Toggling video visibility") // Add this log
    toggleVideoVisibility() // Ensure this is being called properly
  }

  // Get the first cover data (artists, summary)
  const currentCover = covers && covers[0]
  if (!currentCover) {
    return null
  }

  const artists = currentCover.artists.map((artist) => artist.people_id.first_name).join(" ")
  const summary = currentCover.summary || "No summary available"

  // If the video is currently visible, render the CoverStage
  if (isVideoVisible) {
    return <CoverStage covers={covers} />
  }

  return (
    <>
      {/* Video container */}
      <div className={`absolute top-0 w-full h-full -z-1`} onClick={handleVideoVisibility}>
        <div className={`absolute top-0 bottom-0 left-0 w-full h-full`}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full transform object-cover`}
            poster="/video/transition.jpeg"
          >
            <source src={`${videoPath}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Summary shown when video is visible */}
        {isVideoVisible && <p className={`text-slate-100 absolute bottom-3 right-6 text-xs w-card-lg`}>{summary}</p>}
      </div>

      {/* Close button for video */}
      {isVideoVisible && (
        <button onClick={toggleVideoVisibility} className="absolute top-5 right-5 bg-white p-2 z-[9999] rounded-full">
          Close Video
        </button>
      )}

      {/* Bottom control panel */}
      <div className="absolute bottom-0 w-full z-10">
        <div className="flex justify-end">
          <div className="bg-black backdrop-blur-lg bg-opacity-30 flex items-center space-x-3 px-3 rounded-tl-xl">
            <p className="text-xs text-white">"{artists}", Jeremy Zilar, 2024</p>

            {/* Play/pause button */}
            <button
              onClick={toggleVideoState}
              className="font-sm bottom-3 right-3 bg-zinc-700 w-4 h-4 m-1 p-0.5 text-center rounded-full text-white z-10 flex justify-center items-center"
            >
              {isVideoPaused ? PlayIcon : PauseIcon}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// Play/pause icons
const PlayIcon = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
  </svg>
)
const PauseIcon = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 5H9V19H6V5Z" fill="currentColor" />
    <path d="M15 5H18V19H15V5Z" fill="currentColor" />
  </svg>
)

export default CoverArt
