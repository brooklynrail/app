"use client"

interface SectionHeadProps {
  title: string
  permalink: string
}

const SectionHead = (props: SectionHeadProps) => {
  const { title } = props

  return (
    <div className="px-6 sticky top-0 z-10 rail-bg">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="flex justify-between items-center py-3 pt-6 pb-5">
            <h2 className="text-2xl tablet:text-4xl font-bold">{title}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionHead
