import React, { useState } from "react"
import Banner from "../header/banner"
import { usePopup } from "../popupProvider"
import NewsLetterSignUpForm from "../newsletterForm"

const DonatePopup = () => {
  const { showPopup, popupType, setShowPopup } = usePopup()
  const [email, setEmail] = useState("") // State to capture email
  const [formStatus, setFormStatus] = useState<string | null>(null) // Status for the form submission

  if (!showPopup || popupType !== "donate") {
    return null
  }

  return (
    <div
      className="fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center"
      onClick={() => setShowPopup(false)}
    >
      <div className="rail-header p-6 py-6 w-screen h-mobile-lg bottom-0 absolute" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-3 right-3 text-white font-medium text-4xl rounded-full hover:bg-white hover:bg-opacity-30 px-3 py-1"
          onClick={() => setShowPopup(false)}
        >
          &#x2715;
        </button>
        <div className="space-y-6">
          {/* <Banner /> */}
          <h2 className="text-4xl tablet-lg:text-6xl text-center font-light uppercase">Celebrating 24 Years</h2>
          <div className="space-y-3">
            <p className="uppercase text-md tablet-lg:text-2xl text-center">Help us raise $200,000 by December 31</p>
            <div className="bg-gray-200 h-9 w-auto max-w-screen-tablet-lg mx-auto flex justify-start items-center">
              <div
                className="bg-lime-400 h-9 flex justify-end items-center"
                style={{ width: `${(20000 / 200000) * 100}%` }} // Replace 200000 with the actual amount raised
              >
                <span className="hidden tablet-lg:block pr-3">$20,000</span>
              </div>
              <span className="tablet-lg:hidden pl-3">$20,000</span>
            </div>
          </div>
          <p className="uppercase text-center text-sm tablet-lg:text-lg">
            DONATE to insure that the rail remains
            <br /> FREE and accessible to all, forever
          </p>
          <div className="flex justify-center space-x-3 tablet-lg:space-x-9">
            <DonateButton amt="25" />
            <DonateButton amt="100" />
            <DonateButton amt="250" />
          </div>

          <div className="pt-3 flex flex-row justify-center items-center relative">
            <div className="flex justify-center">
              <p className="text-sm tablet-lg:text-lg text-center font-medium text-blue-700 hover:underline">
                Get notified when our 🎉new website 🎉 launches later this month »
              </p>
            </div>
            {/* Add Mailchimp Email Subscription Form */}
            <div className="space-y-1 hidden">
              <NewsLetterSignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface DonateButtonProps {
  amt: string
}

const DonateButton = (props: DonateButtonProps) => {
  const { amt } = props
  // const donateURL = `${process.env.NEXT_PUBLIC_BASE_URL}/donate?amt=${amt}`
  const donateURL = `https://brooklynrail.org/donate?amt=${amt}`
  return (
    <button
      className="bg-red-500 text-white px-3 tablet-lg:px-6 py-1.5 tablet-lg:py-3 rounded-sm text-nowrap text-md tablet-lg:text-lg uppercase hover:underline underline-offset-2 font-normal"
      onClick={() => (window.location.href = `${donateURL}`)}
    >
      {`$${amt}`}
    </button>
  )
}

export default DonatePopup
