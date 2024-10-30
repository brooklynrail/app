import { useEffect, useRef } from "react"
import ThemeToggle from "../themeToggle"
import { useTheme } from "../theme"
import { getCookie } from "../../../../lib/utils/homepage"
import { useVideo } from "@/app/context/VideoProvider"

const Settings = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { isVideoPaused, toggleVideoState } = useVideo()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPaused) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isVideoPaused])

  const handleVideoPlayer = () => {
    toggleVideoState() // Toggle video playback state
  }

  return (
    <div className="col-span-3 px-9 space-y-6">
      <ThemeToggle {...{ theme, setTheme }} />
      <div className="flex justify-between items-center space-x-1">
        <label className="block text-sm">Pause video</label>
        <div onClick={handleVideoPlayer} className="relative w-12 h-6 cursor-pointer">
          <input type="checkbox" className="opacity-0 w-0 h-0" checked={isVideoPaused} readOnly />
          <span
            className={`absolute block top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-300 ${
              isVideoPaused ? "bg-slate-500" : "bg-slate-700"
            }`}
          ></span>
          <span
            className={`absolute block top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isVideoPaused ? "translate-x-6" : ""
            }`}
          ></span>
        </div>
      </div>
    </div>
  )
}

export default Settings
