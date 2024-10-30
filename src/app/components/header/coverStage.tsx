import { useEffect, useRef, useState } from "react"
import { Covers } from "../../../../lib/types"
import parse from "html-react-parser"
import { useVideo } from "@/app/context/VideoProvider"

interface CoverArtProps {
  covers: Covers[] | null
}

const CoverStage = (props: CoverArtProps) => {
  const { covers } = props
  const { isVideoPaused, toggleVideoState, isVideoVisible, toggleVideoVisibility } = useVideo()

  // Video player reference
  const videoRef = useRef<HTMLVideoElement>(null)

  // State to track the current video index
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isVideoPaused])

  // Handle navigating to the next media in the array
  const handleNextVideo = () => {
    if (covers && covers[0].videos && currentMediaIndex < covers[0].videos.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1)
    }
  }

  // Handle navigating to the previous media in the array
  const handlePreviousVideo = () => {
    if (covers && covers[0].videos && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1)
    }
  }

  // Get the current media file path with safety checks
  const currentCover = covers && covers[0]
  let videoPath = ""
  if (currentCover && currentCover.videos && currentCover.videos[currentMediaIndex]?.directus_files_id) {
    videoPath = `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${currentCover.videos[currentMediaIndex].directus_files_id.filename_disk}`
  }

  const artists = currentCover?.artists.map((artist) => artist.people_id.display_name)

  let formattedArtists
  if (artists?.length === 1) {
    formattedArtists = artists[0]
  } else if (artists?.length === 2) {
    formattedArtists = artists.join(" and ")
  } else {
    formattedArtists = `${artists?.slice(0, -1).join(", ")}, and ${artists?.[artists.length - 1]}`
  }

  const summary = currentCover?.summary || "No summary available"

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full z-[100] bg-black bg-opacity-85 p-6`}
        onClick={toggleVideoVisibility}
      >
        <div className={`absolute top-0 bottom-0 left-0 w-full h-full p-6`}>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            controls
            playsInline
            className={`w-full h-full transform`}
            poster="/video/transition.jpeg"
          >
            <source src={`${videoPath}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute bottom-3 right-6 w-card-lg text-slate-100 text-xs">
          <p className={`font-medium`}>{formattedArtists}</p>
          <p className={``}>{parse(summary)}</p>
        </div>

        {/* Navigation Controls */}
        {currentCover?.videos && currentCover.videos.length > 1 && (
          <div className="absolute top-10 left-10 flex space-x-4 z-100 bg-pink-300">
            <button
              onClick={handlePreviousVideo}
              className={`bg-white p-2 rounded-full ${currentMediaIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={currentMediaIndex === 0}
            >
              Previous
            </button>

            <button
              onClick={handleNextVideo}
              className={`bg-white p-2 rounded-full ${
                currentMediaIndex === currentCover.videos.length - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentMediaIndex === currentCover.videos.length - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <button onClick={toggleVideoVisibility} className="absolute top-5 right-5 bg-white p-2 z-[9999] rounded-full">
        Close Video
      </button>
    </>
  )
}

export default CoverStage
