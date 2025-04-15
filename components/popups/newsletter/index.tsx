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
        <div className="space-y-3">
          <p className="hidden uppercase text-md tablet-lg:text-2xl text-center text-zinc-800 dark:text-slate-100">
            Get the latest news and updates from The Brooklyn Rail
          </p>
        </div>
        <p className="uppercase text-center text-sm tablet-lg:text-lg text-zinc-800 dark:text-slate-100">
          Receive the latest news and updates from The Brooklyn Rail
        </p>
        <NewsLetterSignUpForm />
        <div className="flex justify-center">
          <Link href="https://brooklynrail.org/donate" title="Donate to The Brooklyn Rail">
            <button className="bg-red-500 text-white px-3 tablet-lg:px-6 py-1.5 tablet-lg:py-3 rounded-sm text-nowrap text-md tablet-lg:text-lg uppercase hover:underline underline-offset-2 font-normal">
              {`Signup`}
            </button>
          </Link>
        </div>
      </div>
    </PopupFrameCenter>
  )
}

export default PopupNewsletter
