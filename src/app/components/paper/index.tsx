"use client"

export interface PaperProps {
  pageClass: string
  children: React.ReactNode
}

const Paper = (props: PaperProps) => {
  const { pageClass, children } = props

  return (
    <>
      <div className={`paper ${pageClass}`}>{children}</div>
    </>
  )
}

export default Paper
