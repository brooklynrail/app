import { VideoCovers, VideoCoversStills } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import VideoControls from "./videoControls"
import { useEffect, useState } from "react"

interface VideoBGProps {
  videoRef: React.RefObject<HTMLVideoElement>
  videoCovers: VideoCovers[]
  videoCoversStills: VideoCoversStills[]
  videoCoversVerticalPosition: number
}

const VideoBG = (props: VideoBGProps) => {
  const { videoRef, videoCovers, videoCoversStills, videoCoversVerticalPosition } = props
  const [isPaused, setIsPaused] = useState(false)
  const searchParams = useSearchParams()

  // Get initial index from URL params or default to 0
  const getInitialIndex = () => {
    const paramIndex = searchParams.get("videobg")
    if (paramIndex) {
      const index = parseInt(paramIndex, 10)
      if (index >= 0 && index < videoCovers.length) {
        return index
      }
    }
    return 0
  }

  console.log("videoCovers", videoCovers)

  // Get position from URL params, prop value, or default to 50
  const getVerticalPosition = () => {
    // First check URL parameter
    const paramPosition = searchParams.get("position")
    if (paramPosition) {
      const position = parseInt(paramPosition, 10)
      if (!isNaN(position) && position >= 0 && position <= 100) {
        return position
      }
    }

    // Then use prop value if provided, otherwise default to 50
    return videoCoversVerticalPosition ?? 50
  }

  const [selectedIndex, setSelectedIndex] = useState(getInitialIndex())
  const [verticalPosition, setVerticalPosition] = useState(getVerticalPosition())

  // Update index and position if URL params change
  useEffect(() => {
    const newIndex = getInitialIndex()
    const newPosition = getVerticalPosition()

    if (newIndex !== selectedIndex) {
      setSelectedIndex(newIndex)
    }
    if (newPosition !== verticalPosition) {
      setVerticalPosition(newPosition)
    }
  }, [searchParams, videoCovers.length, selectedIndex, verticalPosition])

  // Get the current video cover object
  const currentCover = videoCovers[selectedIndex]

  // Get video source URL from current cover
  const videoSrc = currentCover?.directus_files_id
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${currentCover.directus_files_id.filename_disk}`
    : ""

  const videoCoverStill = videoCoversStills[0].directus_files_id
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${videoCoversStills[0].directus_files_id?.filename_disk}`
    : ""

  if (!videoSrc || !videoCoverStill) {
    return null
  }

  useEffect(() => {
    const isVideoPaused = localStorage.getItem("homepageVideoPaused")
    if (isVideoPaused === "true" && videoRef.current) {
      videoRef.current.pause()
      setIsPaused(true)
    }
  }, [])

  const handleVideoToggle = async () => {
    if (videoRef.current) {
      if (isPaused) {
        try {
          await videoRef.current.play()
          localStorage.removeItem("homepageVideoPaused")
        } catch (error) {
          console.error("Error playing video:", error)
        }
      } else {
        videoRef.current.pause()
        localStorage.setItem("homepageVideoPaused", "true")
      }
      setIsPaused(!isPaused)
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover transform"
        style={{
          objectPosition: `center ${verticalPosition}%`,
        }}
        poster={videoCoverStill}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <VideoControls
        videoRef={videoRef}
        videoCover={currentCover}
        isPaused={isPaused}
        handleVideoToggle={handleVideoToggle}
      />
    </>
  )
}

export default VideoBG
