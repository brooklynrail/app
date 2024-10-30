"use client"

interface FrameProps {
  colA: React.ReactElement
  colB: React.ReactElement
  colC: React.ReactElement
  alt: boolean
}

const Frame333 = (props: FrameProps) => {
  const { colA, colB, colC, alt } = props

  return (
    <div className="frame px-6">
      <div className="grid grid-cols-4 tablet:grid-cols-12 divide-y rail-divide tablet:divide-y-0 py-3">
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-4 tablet:col-start-1 tablet:border-r rail-border ${alt ? `alt-odd tablet:pr-3` : `alt-even tablet:pr-6`}`}
        >
          <div className="divide-y rail-divide">{colA}</div>
        </div>
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-4 tablet:col-start-5 tablet:border-r rail-border tablet:px-3 ${alt ? `alt2-odd` : `alt2-even`}`}
        >
          <div className="divide-y rail-divide">{colB}</div>
        </div>
        <div
          className={`col-span-4 grid-cols-4 tablet:col-span-4 tablet:col-start-9 tablet:pl-3 ${alt ? `alt2-odd` : `alt2-even`}`}
        >
          <div className="divide-y rail-divide">{colC}</div>
        </div>
      </div>
    </div>
  )
}

export default Frame333
