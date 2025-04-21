import { usePopup } from "@/components/popupProvider"

const PopupFrameCenter = ({ children }: { children: React.ReactNode }) => {
  const { setShowPopup } = usePopup()

  return (
    <div
      className="fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center cursor-pointer"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-gradient-to-b from-[#f7b6b6] to-[#CFCFE0] dark:from-indigo-700 dark:to-zinc-800 p-6 py-12 tablet:py-6 absolute w-[86%] min-h-[50%] h-[60vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="border border-zinc-200 text-zinc-700 text-center shadow-lg absolute top-3 right-3 rounded-full bg-white w-8 tablet:w-9 h-8 tablet:h-9 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <span className="text-lg tablet:text-xl font-bold">&#x2715;</span>
        </button>
        <div className="h-full w-full flex flex-col justify-center items-center">{children}</div>
      </div>
    </div>
  )
}

export default PopupFrameCenter
