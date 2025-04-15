import { usePopup } from "@/components/popupProvider"
import Link from "next/link"
import PopupFrameCenter from "../center"
import NewsLetterSignUpForm from "@/components/newsletterForm"

const PopupNewsletter = () => {
  const { showPopup, popupType, setShowPopup } = usePopup()

  if (!showPopup || popupType !== "newsletter") {
    return null
  }

  return (
    <PopupFrameCenter>
      <div className="space-y-3 tablet:space-y-6 py-20">
        <h2 className="text-4xl tablet-lg:text-6xl text-center font-light text-zinc-800 dark:text-slate-100">
          Subscribe to our newsletter
        </h2>
        <p className="text-center text-sm tablet-lg:text-lg text-zinc-800 dark:text-slate-100">
          Receive the latest news and updates from The Brooklyn Rail
        </p>
        <NewsLetterSignUpForm />
      </div>
    </PopupFrameCenter>
  )
}

export default PopupNewsletter
