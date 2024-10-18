"use client"

interface FrameScrollableProps {
  Promos: React.ReactElement
}

const FrameScrollable = (props: FrameScrollableProps) => {
  const { Promos } = props

  if (!Promos) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="py-3">
            <div className="py-3 tablet:px-6 divide-x rail-divide flex overflow-x-auto snap-mandatory snap-x scroll-smooth">
              {Promos}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FrameScrollable
