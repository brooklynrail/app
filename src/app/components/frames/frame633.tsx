"use client"

interface FrameProps {
  LeadPromo: React.ReactElement
  ColB: React.ReactElement
  ColC: React.ReactElement
  alt: boolean
}

const Frame633 = (props: FrameProps) => {
  const { LeadPromo, ColB, ColC, alt } = props

  const colA = <div className="">{LeadPromo}</div>
  const colB = <div className={`divide-y rail-divide`}>{ColB}</div>
  const colC = <div className={`divide-y rail-divide`}>{ColC}</div>

  return (
    <div className="frame px-6">
      <div className="grid grid-cols-4 tablet:grid-cols-12 divide-y rail-divide tablet:divide-y-0 py-3">
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-6 tablet:col-start-1 tablet:border-r rail-border ${alt ? `alt-odd tablet:pr-3` : `alt-even tablet:pr-6`}`}
        >
          {alt ? colB : colA}
        </div>
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-3 tablet:col-start-7 tablet:border-r rail-border tablet:px-3 ${alt ? `alt2-odd` : `alt2-even`}`}
        >
          <div className="divide-y rail-divide px-3">{alt ? colA : colB}</div>
        </div>
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-3 tablet:col-start-10 tablet:pl-3 ${alt ? `alt2-odd` : `alt2-even`}`}
        >
          <div className="divide-y rail-divide px-3">{colC}</div>
        </div>
      </div>
    </div>
  )
}

export default Frame633
