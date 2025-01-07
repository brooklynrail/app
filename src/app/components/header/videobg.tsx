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
      style={{
        objectPosition: "center 25%",
      }}
      poster="/video/shirin-neshat-2.png"
    >
      <source src="https://studio.brooklynrail.org/assets/c2da0ae6-d635-44c2-a323-0a090a6f9569.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoBG
