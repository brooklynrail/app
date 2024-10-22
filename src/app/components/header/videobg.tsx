const VideoBG = () => {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover transform"
      poster="/video/transition.png"
    >
      <source src="/video/transition.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoBG
