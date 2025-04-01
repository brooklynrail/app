import { VideoCovers } from "@/lib/types"
import parse from "html-react-parser"

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>
  videoCover: VideoCovers
  isPaused: boolean
  handleVideoToggle: () => void
}

const VideoControls = (props: VideoControlsProps) => {
  const { videoCover, isPaused, handleVideoToggle } = props

  const play = (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
    </svg>
  )

  const pause = (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 5H9V19H6V5Z" className="fill-zinc-800" />
      <path d="M15 5H18V19H15V5Z" className="fill-zinc-800" />
    </svg>
  )

  const videoCoverCaption = videoCover.directus_files_id ? videoCover.directus_files_id.caption : ""

  return (
    <div className="bg-zinc-900 rounded-tl-sm px-1 py-0.5 absolute bottom-0 right-0 z-10 flex justify-center items-center space-x-2">
      <button
        onClick={handleVideoToggle}
        className="font-sm bg-zinc-200 w-4 h-4 text-center text-black flex justify-center items-center rounded-sm"
      >
        {isPaused ? play : pause}
      </button>
      {videoCoverCaption && (
        <div className="text-white text-[10px]" style={{ lineHeight: "1.2" }}>
          {parse(videoCoverCaption)}
        </div>
      )}
    </div>
  )
}

export default VideoControls
