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
      poster="/video/loren-munk.png"
    >
      <source src="https://studio.brooklynrail.org/assets/b1a9a7a8-dda0-44c8-a683-c66a7ead83bb.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoBG
