"use client"
import parse from "html-react-parser"

interface SectionHeadProps {
  title: string
  permalink: string
  description?: string | null
}

const SectionHead = (props: SectionHeadProps) => {
  const { title, description } = props

  return (
    <div className="px-3 tablet:px-6 sticky top-9 z-10 section-head">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <div className="flex justify-between items-center py-3 pb-1.5 tablet:pb-3 tablet:pt-6">
            <div className="space-y-1 tablet:w-2/3 desktop:w-1/2">
              <h2 className="text-2xl tablet:text-4xl font-bold">{title}</h2>
              {description && <div className="text-sm">{parse(description)}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionHead
