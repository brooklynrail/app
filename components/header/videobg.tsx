import { VideoCovers, VideoCoversStills } from "@/lib/types"

interface VideoBGProps {
  videoRef: React.RefObject<HTMLVideoElement>
  videoCovers: VideoCovers[]
  videoCoversStills: VideoCoversStills[]
}

const VideoBG = (props: VideoBGProps) => {
  const { videoRef, videoCovers, videoCoversStills } = props
  const videoCover = videoCovers[0].directus_files_id
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${videoCovers[0].directus_files_id?.filename_disk}`
    : ""

  const videoCoverStill = videoCoversStills[0].directus_files_id
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${videoCoversStills[0].directus_files_id?.filename_disk}`
    : ""

  if (!videoCover || !videoCoverStill) {
    return null
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover transform"
      style={{
        objectPosition: "center 25%",
      }}
      poster={videoCoverStill}
    >
      <source src={videoCover} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoBG
