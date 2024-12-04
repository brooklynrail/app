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
      <source src="https://studio.brooklynrail.org/assets/3c4a0e44-6512-4997-84dd-76c1d9f35b0d.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoBG
