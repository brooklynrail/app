import { useEffect, useRef } from "react"
import { useVideo } from "@/app/context/videoProvider"
import { Covers } from "../../../../lib/types"
import parse from "html-react-parser"

interface CoverArtProps {
  covers: Covers[] | null
}

const CoverStage = (props: CoverArtProps) => {
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
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isVideoPaused])

  // Handle play/pause from external control
  const handleVideoPlayer = () => {
    toggleVideoState() // Toggle video state using context
  }

  const handleVideoVisibility = () => {
    console.log("Toggling video visibility") // Add this log
    toggleVideoVisibility() // Ensure this is being called properly
  }

  // Get the first cover data (artists, summary)
  const currentCover = covers && covers[0]
  if (!currentCover) {
    return null
  }

  console.log("currentCover", currentCover)
  const artists = currentCover.artists.map((artist) => artist.people_id.display_name)

  let formattedArtists
  if (artists.length === 1) {
    formattedArtists = artists[0]
  } else if (artists.length === 2) {
    formattedArtists = artists.join(" and ")
  } else {
    formattedArtists = `${artists.slice(0, -1).join(", ")}, and ${artists[artists.length - 1]}`
  }

  const summary = currentCover.summary || "No summary available"

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full z-[100] bg-black bg-opacity-85 p-6`}
        onClick={handleVideoVisibility}
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
      </div>

      <button onClick={handleVideoVisibility} className="absolute top-5 right-5 bg-white p-2 z-[9999] rounded-full">
        Close Video
      </button>
    </>
  )
}

export default CoverStage
