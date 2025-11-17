interface PopupFrameBottomProps {
  children: React.ReactNode
  onClose: () => void
}

const PopupFrameBottom = ({ children, onClose }: PopupFrameBottomProps) => {
  return (
    <div
      className="fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-[#EF4444] to-[#CFCFE0] dark:from-indigo-700 dark:to-zinc-800 p-6 py-12 tablet:py-6 w-screen h-mobile-lg bottom-0 absolute"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-white font-medium text-xl tablet:text-3xl rounded-full hover:bg-white hover:bg-opacity-30 px-3 py-1"
          onClick={onClose}
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  )
}

export default PopupFrameBottom
