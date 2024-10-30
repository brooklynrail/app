interface VideoBGProps {
  videoRef: React.RefObject<HTMLVideoElement>
}

const VideoBG = (props: VideoBGProps) => {
  const { videoRef } = props
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover transform"
      poster="/video/lorne-munk.png"
    >
      <source src="https://studio.brooklynrail.org/assets/e633e239-aa05-40d5-9eac-b5aaa339fe6a.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoBG
