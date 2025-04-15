import { usePopup } from "@/components/popupProvider"

const PopupFrameCenter = ({ children }: { children: React.ReactNode }) => {
  const { setShowPopup } = usePopup()

  return (
    <div
      className="fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
      onClick={() => setShowPopup(false)}
    >
      <div
        className="bg-gradient-to-b from-[#f7b6b6] to-[#CFCFE0] dark:from-indigo-700 dark:to-zinc-800 p-6 py-12 tablet:py-6 absolute w-[86%] h-[86%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-white font-medium text-xl tablet:text-3xl rounded-full hover:bg-white hover:bg-opacity-30 px-3 py-1"
          onClick={() => setShowPopup(false)}
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  )
}

export default PopupFrameCenter
