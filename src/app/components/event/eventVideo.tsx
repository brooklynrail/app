"use client"

interface EventVideoProps {
  youtube_id: string
  title: string
}
const EventVideo = (props: EventVideoProps) => {
  const { youtube_id, title } = props
  return (
    <div className="col-span-4 desktop:col-span-10 desktop:col-start-2">
      <div className="relative w-full pb-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/scHun3qBUV0?si=${youtube_id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default EventVideo
