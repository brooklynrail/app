"use client"

interface FrameProps {
  LeadPromo: React.ReactElement
  Promos: React.ReactElement
  alt: boolean
}

const Frame = (props: FrameProps) => {
  const { LeadPromo, Promos, alt } = props

  const colA = <div className="py-3">{LeadPromo}</div>
  const colB = <div className={`divide-y rail-divide`}>{Promos}</div>

  return (
    <div className="frame px-3 tablet:px-6">
      <div className="grid grid-cols-4 tablet:grid-cols-12 divide-y rail-divide tablet:divide-y-0 py-3">
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-6 tablet:col-start-1 tablet:border-r rail-border ${alt ? `alt-odd tablet:pr-3` : `alt-even tablet:pr-6`}`}
        >
          {alt ? colB : colA}
        </div>
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-6 tablet:col-start-7 tablet:pl-3 ${alt ? `alt2-odd` : `alt2-even`}`}
        >
          {alt ? colA : colB}
        </div>
      </div>
    </div>
  )
}

export default Frame
