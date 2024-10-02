"use client"
import Footer from "../footer"
import Header, { HeaderType } from "../header"
import { PopupProvider } from "../issueRail/popupProvider"
import Paper from "../paper"

const TypopgraphyStyles = () => {
  const sizes = [
    "text-2xs",
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
  ]

  const examplesSans = sizes.map((size) => {
    return (
      <div className="flex items-center py-3 space-x-3">
        <code className="flex-none font-normal text-xs text-red-700 bg-gray-100 py-1 px-1 w-24 block">{size}</code>
        <p className={`font-normal ${size}`}>There is a reality beyond the ordinary </p>
      </div>
    )
  })
  const examplesSerif = sizes.map((size) => {
    return (
      <div className="flex items-center py-3 space-x-3">
        <code className="flex-none font-normal text-xs text-red-700 bg-gray-100 py-1 px-1 w-24 block">{size}</code>
        <p className={`font-normal font-serif ${size}`}>There is a reality beyond the ordinary </p>
      </div>
    )
  })

  return (
    <>
      <PopupProvider>
        <Paper pageClass={`type`}>
          <div className="">
            <Header type={HeaderType.Default} />

            <section id="main" className="">
              <div className="border-b-2 border-black dark:border-white border-dotted py-3">
                <div className="px-9 grid grid-cols-4 tablet:grid-cols-12 gap-3">
                  <div className="col-span-4 tablet:col-span-12 ">
                    <h1 className="font-bold text-3xl">Typography</h1>
                    <p className="font-light text-3xl">All the things</p>
                  </div>
                </div>
              </div>
              <div className="border-b-2 border-black dark:border-white border-dotted py-3">
                <div className="px-9 grid grid-cols-4 tablet:grid-cols-12 gap-3">
                  <div className="col-span-4 tablet:col-span-6 ">
                    <h2 className="font-bold text-2xl mb-9">Sans-Serif</h2>
                    {examplesSans}
                  </div>
                  <div className="col-span-4 tablet:col-span-6 ">
                    <h2 className="font-bold text-2xl mb-9">Serif</h2>
                    {examplesSerif}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Paper>
      </PopupProvider>
    </>
  )
}

export default TypopgraphyStyles
